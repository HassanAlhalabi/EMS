import { Button, Modal, ModalProps } from "react-bootstrap";

interface PopUpExtra {
    title?: string,
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
      <Modal.Header className="bg-light" closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onEnter}>Do It</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PopUp
