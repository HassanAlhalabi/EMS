import { object, string } from "yup";

export const bookCategoryValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    image: string(),
    superCategoryId: string().nullable()
})