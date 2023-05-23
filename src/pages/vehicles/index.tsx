import { useMemo, useState, useEffect, ChangeEvent } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

import PopUp from "../../components/popup";
import Table from "../../components/table"
import { ACTION_TYPES } from "../../constants";
import { capitalize, getAxiosError } from "../../util";
import { useScreenLoader } from "../../hooks/useScreenLoader";
import { Vehicle, NewVehicle } from "../../types/vehicles";
import { vehicleValidation } from "../../schema/vehicle";
import VehicleForm from "./vehicle-form";
import SwitchInput from "../../components/switch-input/index.";
import { useDelete, useGet, usePost, usePostFormData, usePut, usePutFormData } from "../../hooks";
import { useGetTableData } from "../../hooks/useGetTableData";
import { useGetDataById } from '../../hooks/useGetDataById';

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
    const [action, setAction] = useState<string | null>(null);
    const [vehicleId, setVehicleId] = useState<string | null>(null);
    const { toggleScreenLoader } = useScreenLoader();
    const get = useGet();

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
        () => {
            if(data && data.data.vehicles) {
                return  data.data.vehicles
            }
            return [];
        },
        [data, isFetching, isLoading, page]
    );

    const { mutateAsync , 
            isLoading: postLoading, 
            isError, error } = action === ACTION_TYPES.add ? usePost('/Vehicle', 
                                        formik.values) :
                                                        action === ACTION_TYPES.update ? 
                                                        usePut('/Vehicle', 
                                        {
                                            id: vehicleId,
                                            ...formik.values
                                        }) : action === ACTION_TYPES.delete ? 
                                                useDelete('/Vehicle',vehicleId as string) :
                                                usePut(`/Vehicle/ToggleActivation/${vehicleId}`);

    
    const handleToggleVehicle = async (e: ChangeEvent<HTMLInputElement>) => {
        setAction(ACTION_TYPES.toggle);
        setVehicleId(e.target.value);
    }

      const handleVehicleAction = async () => {

        // Not Valid ... Do Nothing
        if((!formik.isValid) && action !== ACTION_TYPES.delete) {
            formik.validateForm();
            return;
        };
        
        // If All Is Ok ... Do It
        if(formik.isValid) {
          try {
            toggleScreenLoader();
            await mutateAsync();
            refetch();
            toast.success(`${capitalize(action as string)} Vehicle Done Successfully`)
            setAction(null);
			setVehicleId(null);
            formik.resetForm();
          } catch(error) {
            toast.error(getAxiosError(error))
          }
          toggleScreenLoader();
        }
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
                                <button 	className="btn btn-falcon-success btn-sm" 
                                                        type="button" 
                                                        onClick={() => setAction(ACTION_TYPES.add)}>        
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
                                                    setAction(ACTION_TYPES.update)
                                                    setVehicleId(data.vehicleId);
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                    setAction(ACTION_TYPES.delete);
                                                    setVehicleId(data.vehicleId);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    {/* <SwitchInput 
                                        checked={data?.isActive} 
                                        value={data?.id} 
                                        onChange={handleToggleVehicle} /> */}
                                </div>
                    }}
                />

                <PopUp  title={`${action && capitalize(action as string)} Vehicle`}
								show={action !== null && action !== ACTION_TYPES.toggle}
								onHide={() => { setAction(null), formik.resetForm(), setVehicleId(null) } }
								confirmText={`${action} Vehicle`}
								confirmButtonVariant={
									action === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleVehicleAction}
								actionLoading={postLoading}
                                confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && action !== ACTION_TYPES.delete}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <VehicleForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Vehicle</>
                        }
                </PopUp>

            </>

}

export default VehiclesPage
