import { array, object, string } from "yup";

export const roleValidation = object({
    name: string().required('Role Name Is Required'),
    roleClaims: array().min(1,'At Leat 1 Claim Is Required')
})