import { number, object } from "yup";


export const getCodeValidation = object({
    userName: number().required('User Name Is Required').typeError('User Name Contains Only Numbers')
})