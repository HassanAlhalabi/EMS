export interface FacultySubject {
    facultyId: string
    superSubjectId: string | null
    facultyName?: string
    superSubjectName?: string
}

export interface NewSubject {
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    subjectTypeId: string,
    facultySubjects: FacultySubject[]
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

export interface SubjectType {
    id: string,
    name: string,
    description: string,
    maxHours: number
}

export interface NewSubjectType {
    nameAr: string,
    nameEn: string,
    descriptionAr?: string,
    descriptionEn?: string,
    maxHours: number
}