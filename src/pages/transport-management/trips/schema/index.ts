
import { array, object, string } from "yup";

export const tripValidation = object({
    departureHoure: string().required('Departure Time Is Required'),
    routeId: string().required('Route Is Required'),
    vehicleId: string().required('Vehicle Is Required'),
    busStops: array().of(object()).required().min(1,'Bus Stops Is Required')
})