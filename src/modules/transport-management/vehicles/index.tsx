import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { capitalize} from "../../../util";
import { Vehicle, NewVehicle } from "./types";
import { vehicleValidation } from "./schema";
import VehicleForm from "./vehicle-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';
import Button from '../../../components/button';

const INITIAL_VALUES = {
    vehicleBrand: "",
    vehiclePlate: "",
    vehicleCapacity: 0,
    endClassChairCount: 0
}

const VehiclesPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const [vehicleId, setVehicleId] = useState<string | null>(null);
    const { setAction } = useActions()

    const formik = useFormik<NewVehicle>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleVehicleAction(),
		validationSchema: vehicleValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData('/Vehicle/GetVehicles', page, pageSize, searchKey)

    useGetDataById<Vehicle>('/Vehicle/GetVehicle',
                                vehicleId,
                                {onSuccess: data => formik.setValues(data.data)});
    
    const columns = useMemo(
        () => [
            {
                Header: 'Vehicle Brand',
                accessor: 'vehicleBrand',
            },
            {
                Header: 'Plate Number',
                accessor: 'vehiclePlate',
            },
            {
                Header: 'Capacity',
                accessor: 'vehicleCapacity',
            },
            {
                Header: 'End Chair Count',
                accessor: 'endClassChairCount',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

    const vehicles = useMemo(
        () => (data && data.data.vehicles) ? data.data.vehicles : [],
        [data, isFetching, isLoading, page]
    );

    const handleSuccess = (message: string) => {
        toast.success(message)
        reset();
    }

    const actionsMap = {
        [ACTION_TYPES.add]: {
          type: currentAction,
          path: '/Vehicle',
          payload: formik.values,
          onSuccess: () => handleSuccess('Vehicle Added Successfully')
        },
        [ACTION_TYPES.update]: {
          type:  currentAction,
          path: '/Vehicle',
          payload: formik.values,
          onSuccess: () => handleSuccess('Vehicle Updated Successfully')
        },
        [ACTION_TYPES.delete]: {
          type: currentAction,
          path: `/Vehicle`,
          payload: vehicleId,
          onSuccess: () => handleSuccess('Vehicle Deleted Successfully')
        }
      }

    const handleVehicleAction = () => {
        if(formik.isValid && currentAction) {
        setAction(actionsMap[currentAction])
    }}

    const reset = () => {
        refetch();
        setCurrentAction(null); formik.resetForm(); setVehicleId(null);
    }

    return  <>
                <Table<Vehicle>  
                    columns={columns} 
                    hasSearch
                    data={vehicles} 
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
                                            scope="Vehicle.Insert">        
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
                                                setVehicleId(data.vehicleId);
                                                setCurrentAction(ACTION_TYPES.update as Action)
                                            }}
                                            scope="Vehicle.Edit">        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </Button>
                                    <Button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setVehicleId(data.vehicleId);
                                                setCurrentAction(ACTION_TYPES.delete as Action);
                                            }}
                                            scope="Vehicle.Delete">        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </Button>
                                </div>
                    }}
                />

                <PopUp  title={`${currentAction && capitalize(currentAction as string)} Vehicle`}
								show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
								onHide={() => reset()}
								confirmText={`${currentAction} Vehicle`}
								confirmButtonVariant={
									currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleVehicleAction}
                                confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && currentAction !== ACTION_TYPES.delete}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <VehicleForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Vehicle</>
                        }
                </PopUp>

            </>

}

export default VehiclesPage
