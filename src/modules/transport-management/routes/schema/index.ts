
import { number, object } from "yup";

export const routeValidation = object({
    toId: number().required('Departure Location Is Required').min(1,'Departure Lcation Is Required'),
    fromId: number().required('Destination Location Is Required').min(1,'Destination Location Is Required')
})