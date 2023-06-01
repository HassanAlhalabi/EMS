import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { capitalize } from "../../../util";
import { Route, NewRoute } from "./types";
import { routeValidation } from "./schema";
import RouteForm from "./route-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';

const INITIAL_VALUES = {
    fromId: 0,
    toId: 0
}

const RoutesPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const [routeId, setRouteId] = useState<string | null>(null);
    const { setAction } = useActions()

    const formik = useFormik<NewRoute>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleRouteAction(),
		validationSchema: routeValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData('/Route/GetRoutes', page, pageSize, searchKey)

    useGetDataById<Route>(    '/Route/GetRoute',
                                routeId,
                                {onSuccess: data => formik.setValues(data.data)});
            
    const columns = useMemo(
        () => [
            {
                Header: 'Departure Location',
                accessor: 'fromName',
            },
            {
                Header: 'Destination Location',
                accessor: 'toName',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

    const routes = useMemo(
        () => (data && data.data.routes) ? data.data.routes : [],
        [data, isFetching, isLoading, page]
    );

    const handleSuccess = (message: string) => {
        toast.success(message)
        reset();
        refetch();
    }

    const actionsMap = {
        [ACTION_TYPES.add]: {
          type: currentAction,
          path: '/Route',
          payload: formik.values,
          onSuccess: () => handleSuccess('Route Added Successfully')
        },
        [ACTION_TYPES.update]: {
          type:  currentAction,
          path: '/Route',
          payload: formik.values,
          onSuccess: () => handleSuccess('Route Updated Successfully')
        },
        [ACTION_TYPES.delete]: {
          type: currentAction,
          path: `/Route`,
          payload: routeId,
          onSuccess: () => handleSuccess('Route Deleted Successfully')
        }
      }

    const handleRouteAction = () => {
        if(formik.isValid && currentAction) {
        setAction(actionsMap[currentAction])
    }}

    const reset = () => {
        setCurrentAction(null); formik.resetForm(); setRouteId(null);
    }

    return  <>
                <Table<Route>  
                    columns={columns} 
                    hasSearch
                    data={routes} 
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
                                                setRouteId(data.routeId);
                                                setCurrentAction(ACTION_TYPES.update as Action)
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setRouteId(data.routeId);
                                                setCurrentAction(ACTION_TYPES.delete as Action);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </div>
                    }}
                />

                <PopUp  title={`${currentAction && capitalize(currentAction as string)} Route`}
								show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
								onHide={() => reset()}
								confirmText={`${currentAction} Route`}
								confirmButtonVariant={
									currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleRouteAction}
                                confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && currentAction !== ACTION_TYPES.delete}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <RouteForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Route</>
                        }
                </PopUp>

            </>

}

export default RoutesPage
