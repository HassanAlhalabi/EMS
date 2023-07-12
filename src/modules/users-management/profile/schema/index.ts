import { object, string } from "yup";

export const newPasswordValidation = object({
    newPassword: string().required('Password Is Required'),
    confirmPassword: string().required('Confirmed Password Is Required')
})