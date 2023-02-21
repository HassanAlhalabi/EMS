import { Role } from "../roles";



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