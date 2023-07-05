import { ChangeEvent, Dispatch, SetStateAction, ReactNode } from 'react';
import { Column } from "react-table";
import { PaginationInfo } from "../../types";
import { Role } from '../../modules/users-management/roles/types';

export interface ITable<T> {
	columns: readonly Column<{}>[],
	data:  any,
	isBulk?: boolean,
	hasSort?: boolean,
	hasSearch?: boolean,
	loading?: boolean,
	pageNumber?: number,
	pageSize?: number, 
	setPage?: Dispatch<SetStateAction<number>>,
	setPageSize?: Dispatch<SetStateAction<number>>,
	pagination?: PaginationInfo,
	searchKey?: string,
	setSearchKey?: Dispatch<SetStateAction<string>>,
	getBulkData?: (data: T[]) => void
	renderTableOptions?: () => ReactNode,
	renderRowActions?: (data: T) => ReactNode,
	renderBulkOptions?: (data?: T) => ReactNode,
	fetchData?: () => void,
}

export interface IndeterminateCheckboxProps {
	indeterminate?: boolean;
	name: string;
}

export interface ITablePagination {
	loading: boolean,
	pageNumber?: number,
	pageSize: number, 
	pagination: PaginationInfo,
    handlePrevPage: () => void,
    handleNextPage: () => void,
    handleGoToPage: (e: ChangeEvent<HTMLInputElement>) => void,
    handlePageSize: (e: ChangeEvent<HTMLSelectElement>) => void
}