import { ChangeEvent, Dispatch, SetStateAction, ReactNode } from 'react';
import { Column } from "react-table";
import { PaginationInfo } from "../../types";

export interface ITable {
	columns: readonly Column<{}>[],
	data:  any,
	isBulk?: boolean,
	loading?: boolean,
	pageNumber?: number,
	pageSize: number, 
	setPage: Dispatch<SetStateAction<number>>,
	setPageSize: Dispatch<SetStateAction<number>>,
	pagination: PaginationInfo,
	getBulkIds?: () => string[]
	renderTableOptions?: () => ReactNode,
	renderRowActions?: () => ReactNode
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