export interface SpecialitySubject {
    facultyId: string;
    facultyName: string;
    specialtyId: string;
    specialtyName: string;
    superSubjectId: string;
    superSubjectName: string;
}
export interface NewSubject {
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    hasLabratory: boolean,
    subjectTypeId: string,
    specialtySubjects: SpecialitySubject[]
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

export interface FullSubject {
    id: string,
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    hasLabratory: boolean,
    specialtySubjects: 
        {
            faculty: {
                id: string;
                name: string;
            }
            specialty: {
                id: string,
                name: string,
            },
            superSubject: {
                id: string,
                name: string,
            } | null
        }[];
    subjectType: FullSubjectType
}

export interface SubjectType {
    id: string,
    name: string,
    description: string,
    maxHours: number
}

export interface FullSubjectType{
    id: string;
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    maxHours: number
}

export interface NewSubjectType {
    nameAr: string,
    nameEn: string,
    descriptionAr?: string,
    descriptionEn?: string,
    maxHours: number
}