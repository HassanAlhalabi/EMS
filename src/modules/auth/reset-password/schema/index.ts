import { number, object } from "yup";

export const resetPasswordValidation = object({
    userName: number().required('User Name Is Required').typeError('User Name Contains Only 8 Numbers')
                        .test('len','User Name Consists Of 8 Numbers Only', val => (""+val).length === 8),
    code: number().required('Code Is Required').typeError('User Name Contains Only 5 Numbers')
    .test('len','Code Consists Of 5 Numbers Only', val => (""+val).length === 5)
})