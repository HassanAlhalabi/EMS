export interface NewRole {
    name: string,
    roleClaims: string[]
}

export interface RoleClaims {
    claimValue: string
}

export interface Role {
    id: string,
    name: string,
    roleClaims: RoleClaims[] | string[],
    isDefault: boolean
}