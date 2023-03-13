import { Role } from "../roles";

export interface NewUser {
    roleId: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    type: string,
    contract: {
        startAt: Date | string,
        endAt: Date | string,
        salary: number,
        workDays: number[]
    }
}

export interface User {
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    type: string,
    role: Role,
    isActive: boolean
}