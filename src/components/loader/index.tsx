import { Spinner } from "react-bootstrap"

const Loader = () => {
  return (
    <div className="screen-loader position-fixed d-flex w-100 h-100 top-0 start-0" style={{zIndex: 99999}}>
        <Spinner animation="border" role="status" className="m-auto">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
  )
}

export default Loader
