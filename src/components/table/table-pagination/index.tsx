import { Form } from "react-bootstrap";
import { ITablePagination } from "../types";
import useTranslate from "../../../hooks/useTranslate";

const TablePagination = ({
	loading,
    pagination,
    pageNumber,
    pageSize,
    handlePrevPage,
    handleNextPage,
    handleGoToPage,
    handlePageSize
}: ITablePagination) => {
	
	const t = useTranslate();

  return (
    <div className="d-flex justify-content-between flex-wrap" data-list>

		<div className="d-flex justify-content-between align-items-center  flex-wrap">
			<button className="btn btn-sm btn-falcon-default me-1"
					type="button" 
					title="Previous"
					onClick={handlePrevPage} disabled={!pagination?.hasPrevious || loading}>
				<span className="fas fa-chevron-left"></span>
			</button>
			<button className="btn btn-sm btn-falcon-default me-1" 
					type="button" 
					title="Previous"
					onClick={handleNextPage} disabled={!pagination?.hasNext || loading}>
				<span className="fas fa-chevron-right"></span>
			</button>
		</div>



		<div className="d-flex align-items-center m-1">
			<strong>
				{t('page')} {pagination?.pageNo} {t('of')} {pagination?.totalPages}
			</strong>
		</div>

		<div className="d-flex align-items-center justify-content-between">
			<span>
				<span className="m-1">| {t('go_to_page')}:</span>
				<Form.Control
					type="number"
					min={1}
					max={pagination?.totalPages}
					defaultValue={pageNumber}
					onChange={handleGoToPage}
					style={{ width: '100px', display: 'inline-block' }}
					className="m-1"
				/>
			</span>
			<Form.Select
				style={{ width: '140px' }}
				value={pageSize}
				onChange={handlePageSize}
			>
				{[5,10,15,20,30,40,50].map(pageSize => (
					<option key={pageSize} value={pageSize}>
						{t('show')} {pageSize}
					</option>
				))}
			</Form.Select>
		</div>

	</div>
  )
}

export default TablePagination
