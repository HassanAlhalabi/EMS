import { array, object, string } from "yup";

export const subjectValidation = object({
    titleAr: string().required('Arabic Name Is Required'),
    titleEn: string().required('English Name Is Required'),
    image: string().nullable(),
    superSubjectId: string().nullable(),
    facultySubjects: array().of(string()).nullable()
})