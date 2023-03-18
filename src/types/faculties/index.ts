

export interface NewFaculty {
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    minCountToSubject: number,
    maxStudCountInGroup: number,
    workingDaysNum: number,
    workStartAt: string,
    workEndAt: string
}

export interface NewSpec {
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

export interface NewHall {
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    maxCount: number | string
}