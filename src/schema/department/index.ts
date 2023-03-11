

import { object, string } from "yup";

export const addDepartmentValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    descriptionAr: string(),
    descriptionEn: string(),
})