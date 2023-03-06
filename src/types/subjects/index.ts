export interface NewSubject {
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    image: string,
    subjectTypeId: string,
    superSubjectId: string | null,
    facultySubjects: string[]
}

export interface SuperSubject {
    id: string
    name: string
    superSubject: SuperSubject | null
}

export interface Subject {
    id: string
    nameAr: string
    nameEn: string
    descriptionAr: string
    descriptionEn: string
    superSubject: SuperSubject
}