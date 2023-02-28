

export interface NewFaculty {
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    minCountToSubject: number | null,
    maxStudCountInGroup: number | null,
}

export interface NewSpecs {
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string
}

export interface Faculty {
    id:	string
    nameAr:	string
    nameEn: string
    description: string
    isActive: boolean
    minCountToSubject:	number
    maxStudCountInGroup:	number
}