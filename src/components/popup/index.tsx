import { Button, Modal, ModalProps } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";
import { capitalize } from "../../util";
import { useTranslation } from "react-i18next";

interface PopUpExtra {
    title?: string,
    handleConfirm?: () => void,
    confirmText?: string,
    confirmButtonVariant?: ButtonVariant,
    confirmButtonIsDisabled?: boolean,
    actionLoading?: boolean,
    children?: React.ReactNode,
}

const PopUp = (props: ModalProps & PopUpExtra) => {

  const {t} = useTranslation();

  return (
        <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        {...props}
      >
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={props.onHide}>{t('close')}</Button>
          <Button variant={props.confirmButtonVariant} 
                  onClick={props.handleConfirm} 
                  style={{textTransform: 'capitalize'}}
                  className="btn btn-falcon-primary"
                  disabled={props.confirmButtonIsDisabled}>
            {props.confirmText ? capitalize(props.confirmText) : t('ok')}
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default PopUp
