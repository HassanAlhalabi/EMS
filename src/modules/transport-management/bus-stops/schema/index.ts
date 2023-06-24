import { number, object, string } from "yup";

export const busStopValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    cityId: number().required('City Is Required').min(0,'City Is Required'),
    stateId: number().required('State Is Required').min(0,'State Is Required')
})