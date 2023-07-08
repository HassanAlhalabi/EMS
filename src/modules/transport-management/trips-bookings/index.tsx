import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { capitalize } from "../../../util";
import { TripBooking, NewTripBooking, UserBooking } from "./types";
import { tripBookingValidation } from "./schema";
import TripBookingForm from './booking-form';
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';
import dayjs from 'dayjs';

const INITIAL_VALUES = {
    tripId: '',
    chairNumber: 1
}

const TripsBookingsPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const [bookingId, setTripBookingId] = useState<string | null>(null);
    const { setAction } = useActions()

    const formik = useFormik<NewTripBooking>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleTripBookingAction(),
		validationSchema: tripBookingValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData('/Booking/GetAllBookings', page, pageSize, searchKey)

    useGetDataById<TripBooking>(    '/Booking/GetAllBookings',
                                    bookingId,
                                    {onSuccess: data => {}});

    const columns = useMemo(
        () => [
            {
                Header: 'Full Name',
                accessor: 'userFullName'
            },
            {
                Header: 'User Name',
                accessor: 'userName'
            },
            {
                Header: 'Booking Date',
                accessor: 'bookingDate',
            },
            {
                Header: 'Chairs Number',
                accessor: 'chairNumber',
            },
            {
                Header: 'Route',
                accessor: 'route',
            },
            // {
            //     Header: 'Busstops',
            //     accessor: 'busStops',
            // },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

  const tripBookings = useMemo(
    () => (data && data.data.bookings) ? 
        data.data.bookings.map((booking: UserBooking)=> ({
            ...booking,
            bookingDate: dayjs(booking.bookingDate).format('DD/MM/YYYY HH:mm'),
            route: `From ${booking.trip.route.from ? booking.trip.route.from.cityName : 'University'} 
                    to ${booking.trip.route.to ? booking.trip.route.to.cityName : 'University'}`
        })) : 
        [],
    [data, isFetching, isLoading, page])

    const handleSuccess = (message: string) => {
        toast.success(message)
        reset();
        refetch();
    }

    const actionsMap = {
        [ACTION_TYPES.add]: {
          type: currentAction,
          path: '/Booking',
          payload: formik.values,
          onSuccess: () => handleSuccess('Trip Booking Added Successfully')
        },
        [ACTION_TYPES.update]: {
          type:  currentAction,
          path: '/Booking',
          payload: formik.values,
          onSuccess: () => handleSuccess('Trip Booking Updated Successfully')
        },
        [ACTION_TYPES.delete]: {
          type: currentAction,
          path: `/Booking`,
          payload: bookingId,
          onSuccess: () => handleSuccess('Trip Booking Canceled Successfully')
        }
      }

    const handleTripBookingAction = () => {
        if(formik.isValid && currentAction) {
        setAction(actionsMap[currentAction])
    }}

    const reset = () => {
        setCurrentAction(null); formik.resetForm(); setTripBookingId(null);
    }

    return  <>
                <Table<TripBooking>  
                    columns={columns} 
                    hasSearch
                    data={tripBookings} 
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
                                {/* <button 	className="btn btn-falcon-success btn-sm" 
                                                        type="button" 
                                                        onClick={() => setCurrentAction(ACTION_TYPES.add as Action)}>        
                                    <span className="fas fa-plus"></span>
                                    <span className="ms-1">New</span>
                                </button> */}
                            </>
                    }} 
                    renderRowActions={(data) => {
                        return  <div className="d-flex justify-content-center align-items-center">
                                    {/* <button className="btn btn-falcon-info btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setTripBookingId(data.tripBookingId);
                                                setCurrentAction(ACTION_TYPES.update as Action)
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button> */}
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                setTripBookingId(data.bookingId);
                                                setCurrentAction(ACTION_TYPES.delete as Action);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </div>
                    }}
                />

                <PopUp  title={`${currentAction && capitalize(currentAction as string)} TripBooking`}
								show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
								onHide={() => reset()}
								confirmText={`${currentAction} TripBooking`}
								confirmButtonVariant={
									currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleTripBookingAction}
                                confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && currentAction !== ACTION_TYPES.delete}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <TripBookingForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This TripBooking</>
                        }
                </PopUp>

            </>

}

export default TripsBookingsPage
