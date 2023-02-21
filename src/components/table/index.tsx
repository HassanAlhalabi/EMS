import { ChangeEvent, forwardRef, useEffect, useMemo, useRef } from "react";
import { Form } from "react-bootstrap";
import { Column,
		 useRowSelect, 
		 useTable, 
		 usePagination, 
		 useSortBy } from "react-table";
import { NULL } from "sass";
import { PaginationInfo } from "../../types";
import Loader from "../loader";
import TableOptions from "./table-options"
import TablePagination from "./table-pagination"

interface ITable {
	columns: readonly Column<{}>[],
	data:  any,
	isBulk?: boolean,
	loading?: boolean,
	setPage: (page: number) => void,
	setPageSize: (pageSize: number) => void,
	pagination?: PaginationInfo 
}

const IndeterminateCheckbox = forwardRef(
	({ indeterminate, ...rest }, ref) => {

	  	const defaultRef = useRef()
	  	const resolvedRef = ref || defaultRef
 
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

const Table = ({ isBulk, 
				 columns, 
				 data, 
				 loading, 
				 pagination,
				 setPageSize, 
				 setPage }: ITable) => {

	const {

		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,

		// Naviagation Functions
		nextPage,
		previousPage,
		gotoPage,
	
		state: { selectedRowIds, pageIndex } 

	} = useTable({
		columns,
		data,
		// useControlledState: state => {
		// 	return useMemo(
		// 	  () => ({
		// 		...state,
		// 		data
		// 		pageIndex: pagination?.pageNo - 1,
		// 	  }),
		// 	  [state, pagination?.pageNo]
		// 	)
		// },
		initialState: { 
			pageIndex: pagination?.pageNo - 1, 
			pageSize: pagination?.pageSize,
		}
	},

	useSortBy,
	usePagination,
	useRowSelect,

	hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div className="form-check mb-0">
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div className="form-check mb-0">
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    });

	const handlePrevPage = () =>  { 
		setPage(prev => prev - 1);
		previousPage();
	}
	const handleNextPage = () => { 
		setPage(prev => prev + 1);
		nextPage();
	}
	const handlePageSize = (e: ChangeEvent<HTMLSelectElement>) => { 
		const newPageSize = Number(e.target.value);
		if(newPageSize > (pagination?.totalItems / newPageSize)) {
			setPage(1);
		}
		setPageSize(newPageSize);
	}
	const handleGoToPage = (e: ChangeEvent<HTMLInputElement>) => {
		const newPageNumber = Number(e.target.value);
		if(	newPageNumber > pagination?.totalPages || 
			newPageNumber <= 0 ) {
				return;
		}
		setPage(newPageNumber);
	}

	

	return (
		<>
			{loading && <Loader />}
			<div className="d-flex align-items-center justify-content-between mb-2">
					
				<div className="d-flex justify-content-between mt-3" data-list>

					<div className="d-flex justify-content-between align-items-center">
						<button className="btn btn-sm btn-falcon-default me-1"
								type="button" 
								title="Previous"
								onClick={handlePrevPage} disabled={!pagination?.hasPrevious}>
							<span className="fas fa-chevron-left"></span>
						</button>
						<button className="btn btn-sm btn-falcon-default me-1" 
								type="button" 
								title="Previous"
								onClick={handleNextPage} disabled={!pagination?.hasNext}>
							<span className="fas fa-chevron-right"></span>
						</button>
					</div>



					<div className="d-flex align-items-center m-1">
						<strong>
							Page {pagination?.pageNo} of {pagination?.totalPages}
						</strong>
					</div>

					<div className="d-flex align-items-center justify-content-between">
						<span>
							<span className="m-1">| Go to page:</span>
							<Form.Control
								type="number"
								min={1}
								max={pagination?.totalPages}
								defaultValue={pageIndex + 1}
								onChange={handleGoToPage}
								style={{ width: '100px', display: 'inline-block' }}
								className="m-1"
							/>
						</span>
						<Form.Select
							style={{ width: '140px' }}
							defaultValue={pagination?.pageSize}
							onChange={handlePageSize}
						>
							{[1,5, 10,15,20,30,40,50].map(pageSize => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</Form.Select>
					</div>

				</div>
				
				<TableOptions />
			
			</div>

			<div className="table-responsive scrollbar">
					<table className="table mb-0" {...getTableProps()}>
						<thead className="text-black bg-200">
						{headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th className="align-middle" {...column.getHeaderProps(column.getSortByToggleProps())}>
										{column.render('Header')}
										<span className="sort-arrow">
											{column.isSorted
											? column.isSortedDesc
												? ' ⬇'
												: ' ⬆'
											: ''}
										</span>
									</th>
								))}
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