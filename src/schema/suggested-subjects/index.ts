import { array, boolean, object, string } from "yup";

export const addStudentSuggestedSubjectValidation = object({
    subjectIds: array(string()).min(1,'Subjects Are Required'),
    isSeniorStudent: boolean()
})