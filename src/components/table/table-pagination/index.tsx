
const TablePagination = () => {
  return (
    <div className="d-flex justify-content-center mt-3" data-list>

        <button className="btn btn-sm btn-falcon-default me-1" type="button" title="Previous">
            <span className="fas fa-chevron-left"></span>
        </button>

        <ul className="pagination mb-0">
            <li className="active">
                <button className="page" type="button" data-i="1" data-page="5">1</button>
            </li>
            <li>
                <button className="page" type="button" data-i="2" data-page="5">2</button>
            </li>
            <li>
                <button className="page" type="button" data-i="3" data-page="5">3</button>
            </li>
        </ul>
        
        <button className="btn btn-sm btn-falcon-default ms-1" type="button" title="Next">
            <span className="fas fa-chevron-right"> </span>
        </button>

    </div>
  )
}

export default TablePagination
