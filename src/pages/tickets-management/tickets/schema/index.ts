import { object, string } from "yup";


export const ticketsValidation = object({
    ticketTypeId: string().required('Ticket Type Required'),
    note: string().required('Ticket Note Required')
})