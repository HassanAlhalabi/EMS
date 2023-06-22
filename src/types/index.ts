export interface PaginationInfo {
    hasNext: boolean,
    hasPrevious: boolean, 
    pageNo: number,
    pageSize: number,
    totalItems: number
    totalPages: number
}

export interface SelectedItem {
    id?: string,
    name?: string,
    label: string
}

export type SelectedOption = string | Record<string, any>;

export type Action = 'ADD' | 'FORM_Data_ADD' | 'UPDATE' | 'FORM_Data_UPDATE' | 'DELETE' | 'TOGGLE';