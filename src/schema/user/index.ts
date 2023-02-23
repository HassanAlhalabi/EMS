import { object, string } from "yup";

export const addUserValidation = object({
    roleId: string().nullable(),
    userName: string().required('User Name Is Required'),
    firstName: string().required('First Name Is Required'),
    lastName: string().required('Last Name Is Required'),
    email: string().required('Email Is Required'),
    password: string().required('Password Is Required'),
    phoneNumber: string().required('Phone Number Is Required'),
    type: string().required('User Type Is Required')
})