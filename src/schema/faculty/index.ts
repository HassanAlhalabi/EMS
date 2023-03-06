import { object, string, number } from "yup";

export const facultyValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string().required('Arabic Description Is Required'),
    descriptionEn: string().required('English Description Is Required'),
    minCountToSubject: number().required('Minimum Students Nummber For Subject Is Required').min(1),
    maxStudCountInGroup: number().required('Maximum Students In Class Is Required').min(1),
})

export const specValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string().required('Arabic Description Is Required'),
    descriptionEn: string().required('English Description Is Required'),
})

export const hallValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string().required('Arabic Description Is Required'),
    descriptionEn: string().required('English Description Is Required'),
    maxCount: number().required('Max Student In Hall Is Required').min(1)
})