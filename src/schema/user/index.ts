import { object, string } from "yup";

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

export const addUserValidation = object({
    roleId: string().nullable(),
    firstName: string().required('First Name Is Required'),
    lastName: string().required('Last Name Is Required'),
    email: string().required('Email Is Required').email('Invalid Email'),
    phoneNumber: string().required('Phone Number Is Required').length(13),
    type: string().required('User Type Is Required')
})