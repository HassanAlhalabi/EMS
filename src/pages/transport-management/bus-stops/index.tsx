import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { capitalize} from "../../../util";
import { BusStop, NewBusStop } from "../../../types/busstop";
import { busstopValidation } from "../../../schema/busstop";
import BusStopForm from "./busstop-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';

const INITIAL_VALUES = {
    nameAr: '',
    nameEn: '',
    cityId: 0,
    stateId: 0
}

const BusStopsPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const [busStopId, setBusStopId] = useState<string | null>(null);
    const { setAction } = useActions()

    const formik = useFormik<NewBusStop>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleBusStopAction(),
		validationSchema: busstopValidation
	})

    const { data, 
            isLoading, 
            isFetching } = useGetTableData('/BusStop/GetBusStops', page, pageSize, searchKey)

    useGetDataById<BusStop>(    '/BusStop/GetFullBusStop',
                                busStopId,
                                {onSuccess: data => formik.setValues({
                                    ...data.data,
                                    nameAr: data.data.busStopNameAr,
                                    nameEn: data.data.busStopNameEn,
                                    cityId: data.data.cityId,
                                    stateId: data.data.stateId
                                })});
            
    const columns = useMemo(
        () => [
            {
                Header: 'BusStop Name',
                accessor: 'busStopName',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

    const busStops = useMemo(
        () => (data && data.data.busStops) ? data.data.busStops : [],
        [data, isFetching, isLoading, page]
    );

    const handleSuccess = (message: string) => {
        toast.success(message)
        reset();
    }

    const actionsMap = {
        [ACTION_TYPES.add]: {
          type: currentAction,
          path: '/BusStop',
          payload: formik.values,
          onSuccess: () => handleSuccess('BusStop Added Successfully')
        },
        [ACTION_TYPES.update]: {
          type:  currentAction,
          path: '/BusStop',
          payload: formik.values,
          onSuccess: () => handleSuccess('BusStop Updated Successfully')
        },
        [ACTION_TYPES.delete]: {
          type: currentAction,
          path: `/BusStop`,
          payload: busStopId,
          onSuccess: () => handleSuccess('BusStop Deleted Successfully')
        }
      }

    const handleBusStopAction = () => {
        if(formik.isValid && currentAction) {
        setAction(actionsMap[currentAction])
    }}

    const reset = () => {
        setCurrentAction(null); formik.resetForm(); setBusStopId(null);
    }

    return  <>
                <Table<BusStop>  
                    columns={columns} 
                    hasSearch
                    data={busStops} 
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
                                                setBusStopId(data.busStopId);
                                                setCurrentAction(ACTION_TYPES.update as Action)
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setBusStopId(data.busStopId);
                                                setCurrentAction(ACTION_TYPES.delete as Action);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </div>
                    }}
                />

                <PopUp  title={`${currentAction && capitalize(currentAction as string)} BusStop`}
								show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
								onHide={() => reset()}
								confirmText={`${currentAction} BusStop`}
								confirmButtonVariant={
									currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleBusStopAction}
                                confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && currentAction !== ACTION_TYPES.delete}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <BusStopForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This BusStop</>
                        }
                </PopUp>

            </>

}

export default BusStopsPage
