
export interface StudyPlan {
    id: string,
    name: string,
    description: string
  }

export interface NewStudyPlan {
    titleAr: string,
    titleEn: string,
    image: string,
    superStudyPlanId: string,
    facultyStudyPlans: string[]
}