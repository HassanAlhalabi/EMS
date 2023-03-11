

export interface NewSemester {
    nameAr: string,
    nameEn: string,
    collectingSuggestionsStartAt: Date | string,
    collectingSuggestionsEndAt: Date | string,
    reviewSuggestionsStartAt: Date | string,
    reviewSuggestionsEndAt: Date | string,
    subjectsRegistrationStartAt: Date | string,
    subjectsRegistrationEndAt: Date | string,
    semesterStartAt: Date | string,
    semesterEndAt: Date | string
}

export interface Semester {
    id: string,
    name: string,
    collectingSuggestionsStartAt: Date | string,
    collectingSuggestionsEndAt: Date | string,
    reviewSuggestionsStartAt: Date | string,
    reviewSuggestionsEndAt: Date | string,
    subjectsRegistrationStartAt: Date | string,
    subjectsRegistrationEndAt: Date | string,
    semesterStartAt: Date | string,
    semesterEndAt: Date | string
}