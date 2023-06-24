
import { number, object, string } from "yup";

export const tripBookingValidation = object({
    tripId: string().required('Trip Is Required'),
    chairNumber: number().required('Chairs Number Is Required').min(0,'One Chair At Least Is Required For Booking'),
})