import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { TripBooking, NewTripBooking, UserBooking } from "./types";
import { tripBookingValidation } from "./schema";
import TripBookingForm from './booking-form';
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';
import dayjs from 'dayjs';
import useTranslate, { TranslateKey } from '../../../hooks/useTranslate';

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
    const { setAction } = useActions();
    const t = useTranslate();

    const formik = useFormik<NewTripBooking>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleTripBookingAction(),
		validationSchema: tripBookingValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData<{bookings: UserBooking[]}>('/Booking/GetMyBookings', page, pageSize, searchKey)

    useGetDataById<TripBooking>(    '/Booking/GetMyBookings',
                                    bookingId,
                                    {onSuccess: data => {}});
            
    const columns = useMemo(
        () => [
            {
                Header: t('full_name'),
                accessor: 'userFullName'
            },
            {
                Header: t('user_name'),
                accessor: 'userName'
            },
            {
                Header: t('booking_date'),
                accessor: 'bookingDate',
            },
            {
                Header: t('chairs_number'),
                accessor: 'chairNumber',
            },
            {
                Header: t('route'),
                accessor: 'route',
            },
            {
                Header: t('bus_stops'),
                accessor: 'busStops',
            },
            {
                Header: t('options'),
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
                route: `${t('from')} ${booking.trip.route.from ? booking.trip.route.from.cityName : t('university')} 
                        ${t('to')} ${booking.trip.route.to ? booking.trip.route.to.cityName : t('university')}`
            })) : 
            [],
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
          path: '/Booking',
          payload: formik.values,
          onSuccess: () => handleSuccess(t('add_success'))
        },
        [ACTION_TYPES.update]: {
          type:  currentAction,
          path: '/Booking',
          payload: formik.values,
          onSuccess: () => handleSuccess(t('update_success'))
        },
        [ACTION_TYPES.delete]: {
          type: currentAction,
          path: `/Booking`,
          payload: bookingId,
          onSuccess: () => handleSuccess(t('delete_success'))
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
                <Table<UserBooking>  
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
                                <button 	className="btn btn-falcon-success btn-sm" 
                                                        type="button" 
                                                        onClick={() => setCurrentAction(ACTION_TYPES.add as Action)}>        
                                    <span className="fas fa-plus"></span>
                                    <span className="ms-1">{t('ADD')}</span>
                                </button>
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

                <PopUp  title={`${t(currentAction as TranslateKey)} ${t('booking')}`}
								show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
								onHide={() => reset()}
								confirmText={`${t(currentAction as TranslateKey)} ${t('booking')}`}
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
                                    <>{t('delete_confirmation')}</>
                        }
                </PopUp>

            </>

}

export default TripsBookingsPage
