
export interface StudyPlan {
    id: string,
    name: string,
    description: string
  }

export interface FullStudyPlan {
  descriptionAr: string | null;
  descriptionEn: string | null;
  id: string;
  nameAr: string; 
  nameEn: string 
}

export interface NewStudyPlan {
    nameAr: string,
    nameEn: string,
    facultyId?: string,
    specialtyId: string,
    studyPlanSubjects: string[]
}