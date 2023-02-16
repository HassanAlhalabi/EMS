import { object, string } from "yup";

export const signInValidation = object({
    name: string().required('User Name Is Required'),
    password: string().required('Password Is Required')
})