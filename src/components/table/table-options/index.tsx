
const TableOptions = () => {
  return (
    <div className="d-flex align-items-center justify-content-end my-3">
        <div id="bulk-select-replace-element">
          <button className="btn btn-falcon-success btn-sm" type="button">
            <span className="fas fa-plus" data-fa-transform="shrink-3 down-2"></span>
            <span className="ms-1">New</span>
          </button>
        </div>
        <div className="d-none ms-3" id="bulk-select-actions">
            <div className="d-flex">
              <select className="form-select form-select-sm" aria-label="Bulk actions">
                  <option selected={true}>Bulk actions</option>
                  <option value="Delete">Delete</option>
                  <option value="Archive">Archive</option>
              </select>
              <button className="btn btn-falcon-danger btn-sm ms-2" type="button">Apply</button>
            </div>
        </div>
    </div>
  )
}

export default TableOptions
