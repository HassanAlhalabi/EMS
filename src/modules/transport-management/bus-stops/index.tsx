import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { capitalize} from "../../../util";
import { BusStop, FullBusStop, NewBusStop } from "./types";
import { busStopValidation } from "./schema";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';
import BusStopForm from './busStop-form';
import Button from '../../../components/button';

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
		validationSchema: busStopValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData('/BusStop/GetBusStops', page, pageSize, searchKey)

    useGetDataById<FullBusStop>(    '/BusStop/GetFullBusStop',
                                busStopId,
                                {
                                    onRefetch: data => {
                                        data &&
                                        formik.setValues({
                                        cityId: data.data.cityId,
                                        nameAr: data.data.nameAr,
                                        nameEn: data.data.nameEn,
                                        stateId: data.data.stateId
                                    })}
                                });
            
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
        () => (data?.data.busStops) ? data.data.busStops : [],
        [data, isFetching, isLoading, page]
    );

    const handleSuccess = async (message: string) => {
        toast.success(message)
        reset();
        await refetch();
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
          payload: {busStopId , ...formik.values},
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
                                <Button 	className="btn btn-falcon-success btn-sm" 
                                            type="button" 
                                            onClick={() => setCurrentAction(ACTION_TYPES.add as Action)}
                                            scope="BusStop.Insert">        
                                    <span className="fas fa-plus"></span>
                                    <span className="ms-1">New</span>
                                </Button>
                            </>
                    }} 
                    renderRowActions={(data) => {
                        return  <div className="d-flex justify-content-center align-items-center">
                                    <Button className="btn btn-falcon-info btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setBusStopId(data.busStopId);
                                                setCurrentAction(ACTION_TYPES.update as Action)
                                            }}
                                            scope="BusStop.Edit">        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </Button>
                                    <Button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setBusStopId(data.busStopId);
                                                setCurrentAction(ACTION_TYPES.delete as Action);
                                            }}
                                            scope="BusStop.Delete">        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </Button>
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
