import {ChangeEvent,
		forwardRef, 
		MutableRefObject, 
		Ref, 
		useEffect, 
		useRef } from "react";
import { useRowSelect, 
		 useTable, 
		 usePagination, 
		 useSortBy } from "react-table";
import { Role } from "../../types/roles";
import TableOptions from "./table-options"
import TablePagination from "./table-pagination"
import { IndeterminateCheckboxProps, ITable } from "./types";

const useCombinedRefs = (...refs: (Ref<HTMLInputElement> | MutableRefObject<undefined>)[]): 
									MutableRefObject<any> => {
	const targetRef = useRef(null);
	useEffect(() => {
	  refs.forEach(ref => {
		if (!ref) return;
		if (typeof ref === 'function') {
		  ref(targetRef.current);
		} else { 
			// @ts-ignore
		  	ref.current = targetRef.current;
		}
	  });
	}, [refs]);
	return targetRef;
  };

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
	({ indeterminate, ...rest }, ref: Ref<HTMLInputElement>) => {

	  	const defaultRef = useRef()
	  	const resolvedRef = useCombinedRefs(ref, defaultRef)
 
		useEffect(() => {
			resolvedRef.current.indeterminate = indeterminate
		}, [resolvedRef, indeterminate])
 
	  	return (
			<>
				<input className="form-check-input" type="checkbox" ref={resolvedRef} {...rest} />
			</>
	  	)
	}
)

const Table = ({ 	isBulk, 
					hasSort,
				 	columns, 
				 	data, 
				 	loading, 
				 	pagination,
				 	pageNumber,
				 	pageSize,
				 	setPageSize, 
				 	setPage,
					renderTableOptions,
					renderRowActions,
					fetchData,
				} : ITable) => {
	
	
	let  plugins = [useSortBy, usePagination, useRowSelect];
	if(!isBulk) {
		plugins = plugins.filter(plugin => plugin !== useRowSelect)
	}
	if(!hasSort) {
		plugins = plugins.filter(plugin => plugin !== useSortBy)
	}

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		// @ts-ignore
		selectedFlatRows,	

	} = useTable({
		columns,
		data
	},

	...plugins,

	hooks => {
		if(isBulk) {
			hooks.visibleColumns.push(columns => [
				// Let's make a column for selection
				{
				  id: 'selection',
				  // The header can use the table's getToggleAllRowsSelectedProps method
				  // to render a checkbox
				  // @ts-ignore
				  Header: ({ getToggleAllRowsSelectedProps }) => (
					<div className="form-check mb-0">
					  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
					</div>
				  ),
				  // The cell can use the individual row's getToggleRowSelectedProps method
				  // to the render a checkbox
				  Cell: ({ row }) => (
					<div className="form-check mb-0">
					  <IndeterminateCheckbox {
						// @ts-ignore
						...row.getToggleRowSelectedProps()
						} />
					</div>
				  ),
				},
				...columns,
			])
		}
    });

	// Pagination Actions
	const handlePrevPage = () => setPage((prev: number) => prev - 1);
	const handleNextPage = () => setPage((prev: number) => prev + 1)
	const handlePageSize = (e: ChangeEvent<HTMLSelectElement>) => { 
		const newPageSize = Number(e.target.value);
		if(newPageSize > (pagination.totalItems / newPageSize)) {
			setPage(1);
		}
		setPageSize(newPageSize);
	}
	const handleGoToPage = (e: ChangeEvent<HTMLInputElement>) => {
		const newPageNumber = Number(e.target.value);
		if(	newPageNumber > pagination.totalPages || 
			newPageNumber <= 0 ) {
				return;
		}
		setPage(newPageNumber);
	}

	return (
		<>

			<div className="d-flex align-items-center justify-content-between mb-2">
					
				<TablePagination
					loading={loading as boolean}
				    pagination={pagination}
					pageNumber={pageNumber}
					pageSize={pageSize}
					handlePrevPage={handlePrevPage}
					handleNextPage={handleNextPage}
					handleGoToPage={handleGoToPage}
					handlePageSize={handlePageSize}
				/>
				
				<TableOptions>
					{ renderTableOptions && renderTableOptions() }
				</TableOptions>
			
			</div>

			<div className="table-responsive scrollbar">
				<table className="table mb-0" {...getTableProps()}>
					<thead className="text-black bg-200">
						{headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => {
									// If Options Column Show No Sort
									if(column.id === 'options') {
										return (
											<th className="align-middle" {
												// @ts-ignore
												...column.getHeaderProps()}>
												{column.render('Header')}
											</th>
										)
									} 
									return (
										<th className="align-middle" {
											// @ts-ignore
											...column.getHeaderProps(hasSort && column.getSortByToggleProps())}>
											{column.render('Header')}
											<span className="sort-arrow">
												{
													// @ts-ignore
													column.isSorted ? column.isSortedDesc
														? ' ⬇'
														: ' ⬆'
													: ''
												}
											</span>
										</th>
									)
									}
									)}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
							{
								data ?
								rows.map((row, i) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()}>
											{row.cells.map(cell => {
												if(cell.column.id === 'options') {
													return <td className="align-middle" {...cell.getCellProps()}>
														{renderRowActions && renderRowActions((cell.row.original as Role).id) }
													</td>
												}
												return <td className="align-middle" {...cell.getCellProps()}>{cell.render('Cell')}</td>
											})}
										</tr>
									)
								}) : 'Loading'
							}
					</tbody>
				</table>
			</div>
		</>
   	)
}

export default Table