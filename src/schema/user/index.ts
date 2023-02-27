import { object, string } from "yup";

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

export const addUserValidation = object({
    roleId: string().nullable(),
    userName: string().required('User Name Is Required'),
    firstName: string().required('First Name Is Required'),
    lastName: string().required('Last Name Is Required'),
    email: string().required('Email Is Required').email('Invalid Email'),
    password: string().required('Password Is Required').min(5, 'Min Password Length Is 5 Characters'),
    phoneNumber: string().required('Phone Number Is Required').matches(phoneRegExp, 'Phone Number Is Not Valid'),
    type: string().required('User Type Is Required')
})