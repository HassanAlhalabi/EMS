export interface Department {
    id: string,
    name: string,
    description: string
}
export interface FullDepartment {
    id:	string,
    nameAr:	string,
    nameEn:	string,
    descriptionAr: string,
    descriptionEn: string,
    faculties?: {id: string, name: string}[]
}

export interface NewDepartment {
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    usersIds?: string[],
    facultiesIds?: {id: string, label: string}[]
}