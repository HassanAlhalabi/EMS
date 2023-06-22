
export interface TicketType {
        ticketTypeId: string,
        title: string,
        description: string,
        isDoctor: true,
        isStudent: true,
        isEmployee: true,
        assignToDepartment: {
            id: string,
            name: string,
            description: string,
            faculties: {
              id: string,
              name: string
            }[]
        }
}

export interface FullTicketType {
    ticketTypeId: string,
    title: string,
    description: string,
    isDoctor: true,
    isStudent: true,
    isEmployee: true,
    assignToDepartment: {
        id: string,
        name: string,
        description: string,
        faculties: {
          id: string,
          name: string
        }[]
    }
}

export interface NewTicketType {
    title: string,
    description: string,
    assignToDepartmentId: string,
    isDoctor: boolean,
    isStudent: boolean,
    isEmployee: boolean
}