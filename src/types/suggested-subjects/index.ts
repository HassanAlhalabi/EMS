

export interface NewSubjectSuggestion {
    subjectIds: string[],
    isSeniorStudent: boolean
}

export interface SuggestedSubject {
    subjectId: string,
    studentId: string,
    isSeniorStudent: boolean
}