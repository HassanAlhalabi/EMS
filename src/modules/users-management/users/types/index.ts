import { Role } from "../../roles/types";

export interface NewUser {
    roleId: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    type: string,
    specialtyId: string,
    facultyId: string,
    contract: {
        startAt: Date | string,
        endAt: Date | string,
        salary: number | string,
        workDays: {
            value: number,
            label: string
        }[]
    } | null
}

export interface User {
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    phoneNumber: string,
    type: string,
    role: Role,
    isActive: boolean
    contract: {
        startAt: Date | string,
        endAt: Date | string,
        salary: number,
        workDays: number[]
    } | null
}

export interface NewPassword {
    userName?: string;
    newPassword: string;
    confirmPassword: string;
}