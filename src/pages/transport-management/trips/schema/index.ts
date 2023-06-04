
import { number, object } from "yup";

export const tripValidation = object({
    toId: number().required('Departure Location Is Required').min(1,'Departure Lcation Is Required'),
    fromId: number().required('Destination Location Is Required').min(1,'Destination Location Is Required')
})