import { Spinner } from "react-bootstrap"

const Loader = () => {
  return (
    <div className="table-loader position-absolute d-flex w-100 h-100">
        <Spinner animation="border" role="status" className="m-auto">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
  )
}

export default Loader
