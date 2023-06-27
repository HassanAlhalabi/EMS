

export interface NewSemester {
    nameAr: string,
    nameEn: string,
    collectingSuggestionsStartAt: string,
    collectingSuggestionsEndAt: string,
    reviewSuggestionsStartAt: string,
    reviewSuggestionsEndAt: string,
    subjectsRegistrationStartAt: string,
    subjectsRegistrationEndAt: string,
    semesterStartAt: string,
    semesterEndAt: string
}

export interface Semester {
    id: string,
    name: string,
    collectingSuggestionsStartAt: string,
    collectingSuggestionsEndAt: string,
    reviewSuggestionsStartAt: string,
    reviewSuggestionsEndAt: string,
    subjectsRegistrationStartAt: string,
    subjectsRegistrationEndAt: string,
    semesterStartAt: string,
    semesterEndAt: string
}

export interface FullSemester {
    id: string,
    nameEn: string,
    nameAr: string,
    collectingSuggestionsStartAt: string,
    collectingSuggestionsEndAt: string,
    reviewSuggestionsStartAt: string,
    reviewSuggestionsEndAt: string,
    subjectsRegistrationStartAt: string,
    subjectsRegistrationEndAt: string,
    semesterStartAt: string,
    semesterEndAt: string
}