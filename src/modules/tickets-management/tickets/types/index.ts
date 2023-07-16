
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
    attachments: string[],
    ticketResults: TicketResult[]
}

export interface TicketResult {
    ticketResultId: string,
    description: string,
    createdByFullName: string,
    createdAt: string,
    attachments: string[]
}

export interface NewTicket {
    note: string;
    ticketTypeId: string;
    attachments: File[] | string[]
}

export interface NewTicketResult {
    description: string;
    attachments: File[] | string[]
}