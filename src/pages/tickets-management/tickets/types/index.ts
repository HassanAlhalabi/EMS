
export interface Ticket {
    ticketId: string,
    serial: string,
    note: string,
    ticketTypeId: string,
    createdById: string,
    createdByFullName: string,
    ticketStatus: string,
    attachments: string[]
} 

export interface FullTicket {
    ticketId: string,
    serial: string,
    note: string,
    ticketTypeId: string,
    createdById: string,
    createdByFullName: string,
    ticketStatus: string,
    attachments: string[]
} 

export interface NewTicket {
    note: string;
    ticketTypeId: string;
    attachments: File[] | string[]
}