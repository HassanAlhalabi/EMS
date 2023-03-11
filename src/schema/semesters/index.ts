import { object, string, date } from "yup";

export const addSemesterValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    collectingSuggestionsStartAt: date().required(),
    collectingSuggestionsEndAt: date().required(),
    reviewSuggestionsStartAt: date().required(),
    reviewSuggestionsEndAt: date().required(),
    subjectsRegistrationStartAt: date().required(),
    subjectsRegistrationEndAt: date().required(),
    semesterStartAt: date().required(),
    semesterEndAt: date().required()
})