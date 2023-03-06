import { array, number, object, string } from "yup";

export const subjectValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string().nullable(),
    descriptionEn: string().nullable(),
    subjectTypeId: string().required('Subject Type Name Is Required'),
    superSubjectId: string().nullable(),
    facultiesIds: array().of(string()).required('Faculties Are Required')
})

export const subjectTypeValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string().nullable(),
    descriptionEn: string().nullable(),
    maxHours: number().required('Max Hours Is Required')
})