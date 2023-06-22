import { Button, Modal, ModalProps } from "react-bootstrap";
import { ButtonVariant } from "react-bootstrap/esm/types";
import { capitalize } from "../../util";
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useEffect, useRef, useState } from "react";

interface PopUpExtra {
    title?: string,
    handleConfirm?: () => void,
    confirmText?: string,
    confirmButtonVariant?: ButtonVariant,
    confirmButtonIsDisabled?: boolean,
    actionLoading?: boolean,
    children?: React.ReactNode,
    loadingData?: boolean
}

const PopUp = (props: ModalProps & PopUpExtra) => {

  const [showLoading, setShowLoading] = useState(false);
  const loadingBarRef = useRef<LoadingBarRef>(null);
  useEffect(() => {
    if(props.loadingData) { 
      loadingBarRef?.current?.continuousStart();
      setShowLoading(true); 
      return;
    }
    loadingBarRef.current?.complete();
  },[props.loadingData]);


  return (
    <>
        { 
  
          <LoadingBar color={'#00d27a'} 
                      ref={loadingBarRef}
                      style={showLoading ? {opacity: 1} : {opacity: 0}}
                      onLoaderFinished={() => {setShowLoading(false)} }/> }
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
          <Button variant="default" onClick={props.onHide}>Close</Button>
          <Button variant={props.confirmButtonVariant} 
                  onClick={props.handleConfirm} 
                  style={{textTransform: 'capitalize'}}
                  className="btn btn-falcon-primary"
                  disabled={props.confirmButtonIsDisabled}>
            {props.confirmText ? capitalize(props.confirmText) : 'Ok'}
          </Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default PopUp
