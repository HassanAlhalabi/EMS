import { number, object, string } from "yup";

export const vehicleValidation = object({
    vehicleBrand: string().required('Vehicle Brand Is Required'),
    vehiclePlate: string().required('Vehicle Plate Number Is Required'),
    vehicleCapacity: number().required('Vehicle Capacity'),
    endClassChairCount: number().required('End Chair Count Is Required')
})