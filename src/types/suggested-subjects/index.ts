

export interface NewSubjectSuggestion {
    subjectIds: string[],
    isSeniorStudent: boolean
}

export interface SuggestedSubject {
    isSeniorStudent: boolean;
    specialtySubjectId: string;
    subjectName: string;
}