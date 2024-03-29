import { array, mixed, object, string,  } from "yup";

export const bookValidation = object({
    nameAr: string().required('Arabic Name Is Required'),
    nameEn: string().required('English Name Is Required'),
    authorNameAr: string().required('Arabic Author Name Is Required'),
    authorNameEn: string().required('English Author Name Is Required'),
    descriptionEn: string().nullable(),
    descriptionAr: string().nullable(),
    cover: mixed().nullable(),
    categoryId: array().nullable(),
    attachment: mixed().required('File Attachment Is Required')
})