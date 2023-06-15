import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { capitalize } from "../../../util";
import { Trip, NewTrip } from "./types";
import { tripValidation } from "./schema";
import TripForm from './trip-form';
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';

const INITIAL_VALUES = {
    departureHoure: '',
    routeId: '',
    vehicleId: '',
    busStops: []
}

const TripsPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const [tripId, setTripId] = useState<string | null>(null);
    const { setAction } = useActions()

    const formik = useFormik<NewTrip>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleTripAction(),
		validationSchema: tripValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData('/Trip/GetTrips', page, pageSize, searchKey)

    useGetDataById<Trip>(    '/Trip/GetTrip',
                                tripId,
                                {onSuccess: data => formik.setValues({
                                    busStops: data.data.busStops.map(busStop => busStop.busStopId),
                                    departureHoure: data.data.departureHoure,
                                    routeId: data.data.route.routeId,
                                    vehicleId: data.data.vehicle.vehicleId
                                })});
            
    const columns = useMemo(
        () => [
            {
                Header: 'Departure Time',
                accessor: 'departureHoure',
            },
            {
                Header: 'Vehicle',
                accessor: 'vehicle',
            },
            {
                Header: 'Route',
                accessor: 'route',
            },
            {
                Header: 'Busstops',
                accessor: 'busStops',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

    const trips = useMemo(
        () => (data && data.data.trips) ? 
            data.data.trips.map((trip: Trip)=> ({
                ...trip,
                vehicle: trip.vehicle.vehicleBrand,
                route: `From ${trip.route.from ? trip.route.from.cityName : 'University'} to 
                        ${trip.route.to ? trip.route.to.cityName : 'University'}`,
                busStops: trip.busStops.map(busStop => busStop.busStopName).join(', ')
            })) : 
            [],
        [data, isFetching, isLoading, page]
    );

    console.log(trips)

    const handleSuccess = (message: string) => {
        toast.success(message)
        reset();
        refetch();
    }

    const actionsMap = {
        [ACTION_TYPES.add]: {
          type: currentAction,
          path: '/Trip',
          payload: formik.values,
          onSuccess: () => handleSuccess('Trip Added Successfully')
        },
        [ACTION_TYPES.update]: {
          type:  currentAction,
          path: '/Trip',
          payload: formik.values,
          onSuccess: () => handleSuccess('Trip Updated Successfully')
        },
        [ACTION_TYPES.delete]: {
          type: currentAction,
          path: `/Trip`,
          payload: tripId,
          onSuccess: () => handleSuccess('Trip Deleted Successfully')
        }
      }

    const handleTripAction = () => {
        if(formik.isValid && currentAction) {
        setAction(actionsMap[currentAction])
    }}

    const reset = () => {
        setCurrentAction(null); formik.resetForm(); setTripId(null);
    }

    return  <>
                <Table<Trip>  
                    columns={columns} 
                    hasSearch
                    data={trips} 
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
                                                setTripId(data.tripId);
                                                setCurrentAction(ACTION_TYPES.update as Action)
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setTripId(data.tripId);
                                                setCurrentAction(ACTION_TYPES.delete as Action);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </div>
                    }}
                />

                <PopUp  title={`${currentAction && capitalize(currentAction as string)} Trip`}
								show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
								onHide={() => reset()}
								confirmText={`${currentAction} Trip`}
								confirmButtonVariant={
									currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleTripAction}
                                confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && currentAction !== ACTION_TYPES.delete}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <TripForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Trip</>
                        }
                </PopUp>

            </>

}

export default TripsPage
