export interface RoleClaims {
    claimValue: string
}

export interface Role {
    id: string,
    name: string,
    roleClaims: RoleClaims[],
    isDefault: boolean
}