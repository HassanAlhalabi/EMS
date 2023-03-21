

export interface NewSubjectSuggestion {
    subjecstIds: string[],
    isSeniorStudent: boolean
}

export interface SuggestedSubject {
    subjectId: string,
    studentId: string,
    isSeniorStudent: boolean
}