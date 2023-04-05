
export interface StudyPlan {
    id: string,
    name: string,
    description: string
  }

export interface NewStudyPlan {
    nameAr: string,
    nameEn: string,
    specialtyId: string,
    studyPlanSubjects: string[]
}