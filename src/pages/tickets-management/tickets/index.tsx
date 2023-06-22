import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { capitalize} from "../../../util";
import { Ticket, FullTicket, NewTicket } from "./types";
import { ticketsValidation } from "./schema";
import TicketForm from "./ticket-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';

const INITIAL_VALUES = {
    note: '',
    ticketTypeId: '',
    Attachments: []
}

const TicketsPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const [ticketId, setTicketId] = useState<string | null>(null);
    const { setAction } = useActions()

    const formik = useFormik<NewTicket>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleTicketAction(),
		validationSchema: ticketsValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData('/Ticket/GetAllTickets', page, pageSize, searchKey)

    useGetDataById<FullTicket>( '/Ticket/GetFullTicket',
                                ticketId,
                                {
                                    onSuccess: data =>formik.setValues(data.data)
                                });
            
    const columns = useMemo(
        () => [
            {
                Header: 'Ticket Serial Number',
                accessor: 'serial',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

    const tickets = useMemo(
        () => (data?.data.tickets) ? data.data.tickets : [],
        [data, isFetching, isLoading, page]
    );

    const handleSuccess = async (message: string) => {
        toast.success(message)
        reset();
        await refetch();
    }

    const actionsMap = {
        [ACTION_TYPES.formDataAdd]: {
          type: currentAction,
          path: '/Ticket',
          payload: formik.values,
          onSuccess: () => handleSuccess('Ticket Added Successfully')
        },
        [ACTION_TYPES.formDataUpdate]: {
          type:  currentAction,
          path: '/Ticket',
          payload: {ticketId , ...formik.values},
          onSuccess: () => handleSuccess('Ticket Updated Successfully')
        },
        [ACTION_TYPES.delete]: {
          type: currentAction,
          path: `/Ticket`,
          payload: ticketId,
          onSuccess: () => handleSuccess('Ticket Deleted Successfully')
        }
      }

    const handleTicketAction = () => {
        if(formik.isValid && currentAction) {
        setAction(actionsMap[currentAction])
    }}

    const reset = () => {
        setCurrentAction(null); formik.resetForm(); setTicketId(null);
    }

    return  <>
                <Table<Ticket>  
                    columns={columns} 
                    hasSearch
                    data={tickets} 
                    loading={isLoading || isFetching}
                    isBulk={false}
                    hasSort={false}
                    pageNumber={page}
                    pageSize={pageSize}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    pagination={data?.data.paginationInfo}
                    renderTableOptions={() => {
                        return  <>
                                    <button className="btn btn-falcon-success btn-sm" 
                                            type="button" 
                                            onClick={() => setCurrentAction(ACTION_TYPES.add as Action)}>        
                                        <span className="fas fa-plus"></span>
                                        <span className="ms-1">New</span>
                                    </button>
                                </>
                    }} 
                    renderRowActions={(data) => {
                        return  <div className="d-flex justify-content-center align-items-center">
                                    <button className="btn btn-falcon-info btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setTicketId(data.ticketId);
                                                setCurrentAction(ACTION_TYPES.update as Action)
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setTicketId(data.ticketId);
                                                setCurrentAction(ACTION_TYPES.delete as Action);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </div>
                    }}
                />

                <PopUp  title={`${currentAction && capitalize(currentAction as string)} Ticket`}
								show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
								onHide={() => reset()}
								confirmText={`${currentAction} Ticket`}
								confirmButtonVariant={
									currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleTicketAction}
                                confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && currentAction !== ACTION_TYPES.delete}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <TicketForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Ticket</>
                        }
                </PopUp>

            </>

}

export default TicketsPage
