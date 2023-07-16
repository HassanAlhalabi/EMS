import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

import PopUp from "../../../../../components/popup";
import Table from "../../../../../components/table"
import { ACTION_TYPES } from "../../../../../constants";
import { Ticket, NewTicket } from "../../types";
import { ticketsValidation } from "../../schema";
import TicketForm from "../../ticket-form";
import { useGetTableData } from "../../../../../hooks/useGetTableData";
import { Action } from '../../../../../types';
import { useActions } from '../../../../../hooks/useActions';
import useTranslate from '../../../../../hooks/useTranslate';

const INITIAL_VALUES = {
    note: '',
    ticketTypeId: '',
    attachments: []
}

const TicketsPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const { setAction } = useActions();
    const t = useTranslate();

    const formik = useFormik<NewTicket>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleTicketAction(),
		validationSchema: ticketsValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData('/Ticket/GetAllTickets', page, pageSize, searchKey)
            
    const columns = useMemo(
        () => [
            {
                Header: t('task_serial_number'),
                accessor: 'serial',
            },
            {
                Header: t('task_note'),
                accessor: 'note',
            },
            {
                Header: t('created_by'),
                accessor: 'createdByFullName',
            },
            {
                Header: t('task_type'),
                accessor: 'ticketTypeTitle',
            },
            {
                Header: t('status'),
                accessor: 'ticketStatus',
            },
            {
                Header: t('options'),
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
          onSuccess: () => handleSuccess(t('add_success'))
        }
      }

    const handleTicketAction = () => {
        if(formik.isValid && currentAction) {
        setAction(actionsMap[currentAction])
    }}

    const reset = () => {
        setCurrentAction(null); formik.resetForm();
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
                                            onClick={() => setCurrentAction(ACTION_TYPES.formDataAdd as Action)}>        
                                        <span className="fas fa-plus"></span>
                                        <span className="ms-1">{`${t('create')} ${t('task')}`}</span>
                                    </button>
                                </>
                    }} 
                    renderRowActions={(data) => {
                        return  <div className="d-flex justify-content-center align-items-center">
                                    <Link to={`/tickets/${data.ticketId}`} className="btn btn-falcon-info btn-sm m-1"> 
                                        <span className="fas fa-eye" data-fa-transform="shrink-3 down-2"></span>
                                    </Link>
                                </div>
                    }}
                />

                <PopUp  title={`${t('create')} ${t('task')}`}
                        show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
                        onHide={() => reset()}
                        confirmText={`${t('create')} ${t('task')}`}
                        confirmButtonVariant={
                            currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
                        }
                        handleConfirm={handleTicketAction}
                        confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && currentAction !== ACTION_TYPES.delete}
                    >
                        {(  currentAction === ACTION_TYPES.formDataAdd || 
                            currentAction === ACTION_TYPES.formDataUpdate)
                                && <TicketForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>{t('delete_confirmation')}</>
                        }
                </PopUp>

            </>

}

export default TicketsPage
