import { array, boolean, number, object, string } from "yup";

export const subjectValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string().nullable(),
    descriptionEn: string().nullable(),
    hasLibrary: boolean().nullable(),
    subjectTypeId: string().required('Subject Type Name Is Required'),
    specialtySubjects: array().of(object({
        specialtyId: string().required('Speciality Is Required'),
        superSubjectId: string().nullable()
    })).required('Specialities Are Required').min(1,'Specialities Are Required')
})

export const subjectTypeValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string().nullable(),
    descriptionEn: string().nullable(),
    maxHours: number().required('Max Hours Is Required')
})