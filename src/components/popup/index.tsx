import { Button, Modal, ModalProps, Spinner } from "react-bootstrap";
import { capitalize } from "../../util";
import Loader from "../loader";

interface PopUpExtra {
    title?: string,
    handleConfirm?: () => void,
    confirmText?: string,
    actionLoading?: boolean,
    children?: React.ReactNode,
}

const PopUp = (props: ModalProps & PopUpExtra) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...props}
    >
      {props.actionLoading && <Loader />}
      <Modal.Header className="bg-light" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={props.onHide}>Close</Button>
        <Button onClick={props.handleConfirm} style={{textTransform: 'capitalize'}}>
          {props.confirmText ? capitalize(props.confirmText) : 'Ok'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUp
