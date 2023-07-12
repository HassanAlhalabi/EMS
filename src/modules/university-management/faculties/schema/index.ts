import { object, string, number, date, boolean } from "yup";

export const facultyValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string(),
    descriptionEn: string(),
    studingYearsCount: number().required('Study Years Number Is Required'),
    isManySpeciality: boolean(),
    specialtyYearNum: number().when(['isManySpeciality'],{
        is: true,
        then: number().required('Specialization Starting Year Is Required')
      }) ,
    minCountToSubject: number().required('Minimum Students Nummber For Subject Is Required').min(1),
    maxStudCountInGroup: number().required('Maximum Students In Class Is Required').min(1),
})

export const dayValidation = object({
    name: string().required('Day Name Is Required'),
    workStartAt: string().required('Work Day Starting Hour Is Required'),
    workEndAt: string().required('Work Day End Hour Is Required')
})

export const specValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string(),
    descriptionEn: string(),
    isDefault: boolean()
})

export const hallValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string(),
    descriptionEn: string(),
    maxCount: number().required('Max Student In Hall Is Required').min(1)
})