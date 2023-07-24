import { useEffect, useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { capitalize} from "../../../util";
import { TicketType, FullTicketType, NewTicketType } from "./types";
import { ticketTypeValidation } from "./schema";
import TicketTypeForm from "./ticket-type-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';
import useGetTicketTypesTableColumns from './hooks/useGetTicketTypesTableColumns';
import { Ticket } from '../tickets/types';

const INITIAL_VALUES = {
    title: '',
    description: '',
    assignToDepartmentId: '',
    isDoctor: false,
    isStudent: false,
    isEmployee: true
}

const TicketsTypesPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const [ticketTypeId, setTicketTypeId] = useState<string | null>(null);
    const { setAction } = useActions()

    const formik = useFormik<NewTicketType>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleTicketTypeAction(),
		validationSchema: ticketTypeValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData<{ticketTypes: TicketType[]}>('/TicketType/GetAllTicketTypes', page, pageSize, searchKey)

    useGetDataById<FullTicketType>('/TicketType/GetTicketType',ticketTypeId, {
                onRefetch: data => {
                    data &&
                    formik.setValues({
                        assignToDepartmentId: data.data.assignToDepartment.id,
                        description: data.data.description,
                        isDoctor: data.data.isDoctor,
                        isEmployee: data.data.isEmployee,
                        isStudent: data.data.isStudent,
                        title: data.data.title
                    })
                }
            }); 
                                                  

    const ticketTypes = useMemo(
        () => (data?.data.ticketTypes) ? data.data.ticketTypes : [],
        [data, isFetching, isLoading, page]
    );

    const ticketTypesTableColumns = useGetTicketTypesTableColumns();

    const handleSuccess = async (message: string) => {
        toast.success(message)
        reset();
        await refetch();
    }

    const actionsMap = {
        [ACTION_TYPES.add]: {
          type: currentAction,
          path: '/TicketType',
          payload: formik.values,
          onSuccess: () => handleSuccess('TicketType Added Successfully')
        },
        [ACTION_TYPES.update]: {
          type:  currentAction,
          path: '/TicketType',
          payload: {ticketTypeId , ...formik.values},
          onSuccess: () => handleSuccess('TicketType Updated Successfully')
        },
        [ACTION_TYPES.delete]: {
          type: currentAction,
          path: `/TicketType`,
          payload: ticketTypeId,
          onSuccess: () => handleSuccess('TicketType Deleted Successfully')
        }
      }

    const handleTicketTypeAction = () => {
        if(formik.isValid && currentAction) {
        setAction(actionsMap[currentAction])
    }}

    const reset = () => {
        setCurrentAction(null); 
        formik.resetForm(); 
        setTicketTypeId(null);
    }

    return  <>
                <Table<TicketType>  
                    columns={ticketTypesTableColumns} 
                    hasSearch
                    data={ticketTypes} 
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
                                <button 	className="btn btn-falcon-success btn-sm" 
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
                                                setTicketTypeId(data.ticketTypeId);
                                                setCurrentAction(ACTION_TYPES.update as Action)
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setTicketTypeId(data.ticketTypeId);
                                                setCurrentAction(ACTION_TYPES.delete as Action);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </div>
                    }}
                />

                <PopUp  title={`${currentAction && capitalize(currentAction as string)} TicketType`}
                        show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
                        onHide={() => reset()}
                        confirmText={`${currentAction} TicketType`}
                        confirmButtonVariant={
                            currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
                        }
                        handleConfirm={handleTicketTypeAction}
                        confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && currentAction !== ACTION_TYPES.delete}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <TicketTypeForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This TicketType</>
                        }
                </PopUp>

            </>

}

export default TicketsTypesPage
