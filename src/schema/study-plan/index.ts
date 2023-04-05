import { array,object, string } from "yup";

export const addStudyPlanValidation =  object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    specialtyId: string().required('Speciality Is Required'),
    studyPlanSubjects : array(string()).required('Subjects are Required').min(1,'Subjects are Required')
})