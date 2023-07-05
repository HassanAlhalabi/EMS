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

export type Action = 'ADD' | 'FORM DATA ADD' | 'UPDATE' | 'BULK UPDATE' | 'FORM DATA UPDATE' | 'DELETE' | 'BULK DELETE' | 'TOGGLE' | 'VIEW';

export interface IRoute {
    id: string,
    name: string,
    path: string,
    isIndex: boolean,
    childRoutes: IRoute[] | null,
    element: JSX.Element,
    hasPermission: boolean
  }