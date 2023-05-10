import { Option } from "react-bootstrap-typeahead/types/types"


export interface PaginationInfo {
    hasNext: boolean,
    hasPrevious: boolean, 
    pageNo: number,
    pageSize: number,
    totalItems: number
    totalPages: number
}

export interface SelectedItem {
    id: string,
    name: string,
    label: string
}

export type SelectedOption = Exclude<Option, string> | SelectedItem