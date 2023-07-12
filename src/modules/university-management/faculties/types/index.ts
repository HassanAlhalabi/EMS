export interface WorkDay {
    dayNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7
    workStartAt: number
    workEndAt: number
}

export interface SemesterRegReq {
    maxHours: number,
    minHours: number,
    minGradePointAverage: number,
    maxCount: number
}
export interface NewFaculty {
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    studingYearsCount: number,
    isManySpecialty: boolean,
    specialtyYearNum: number,
    minCountToSubject: number,
    maxStudCountInGroup: number,
    semesterRegistrationRequirement: {
        maxHours: number,
        minHours: number,
        minGradePointAverage: number,
    }
}

export interface NewDay {
    name: string,
    dayNumber: number,
    workStartAt: string,
    workEndAt: string
}

export interface NewSpec {
    nameAr: string,
    nameEn: string,
    descriptionAr: string,
    descriptionEn: string,
    isDefault: boolean
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
    isLabratory: boolean
}

export interface FullFaculty {
    id: string,
    nameEn: string,
    nameAr: string,
    descriptionEn: string,
    descriptionAr: string,
    minCountToSubject: number,
    maxStudCountInGroup: number,
    studingYearsCount: number,
    isManySpecialty: boolean,
    specialtyYearNum: number,
    isActive: true,
    workDay: {
        id: string,
        dayNumber: number,
        workStartAt: string,
        workEndAt: string
    }[],
    halls: {
        id: string,
        nameEn: string,
        nameAr: string,
        descriptionEn: string,
        descriptionAr: string,
        maxCount: number,
        isLabratory: boolean
      }[],
    specialties: {
        id: string,
        nameEn: string,
        nameAr: string,
        descriptionEn: string,
        descriptionAr: string,
        isDefault: boolean
      }[],
    semesterRegistrationRequirement: {
      id: string,
      maxHours: number,
      minHours: number,
      minGradePointAverage: number
    }
  }