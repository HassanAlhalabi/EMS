export interface SemesterSubject {
    subjectName: string,
    semesterSubjectId: string,
    groupNumber: number,
    groupId: string,
    marks:       {
        id: string,
        markValue: number
      }[]
}