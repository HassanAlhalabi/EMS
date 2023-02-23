

export interface IDecodedToken {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string,
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string,
    jti: string,
    Claims: string[],
    exp: number,
    iss: string,
    aud: string
}