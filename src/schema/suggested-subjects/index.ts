import { array, boolean, object, string } from "yup";

export const addStudentSuggestedSubjectValidation = object({
    subjecstIds: array().of(string()),
    isSeniorStudent: boolean()
})