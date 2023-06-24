import { boolean, object, string } from "yup";

export const ticketTypeValidation = object({
    title: string().required('Title Is Required'),
    description: string().nullable(),
    assignToDepartmentId: string().required('Department Is Required'),
    isDoctor: boolean(),
    isStudent:  boolean(),
    isEmployee: boolean(),
})