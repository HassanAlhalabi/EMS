import { ToastContainer, Toast } from "react-bootstrap";

type TOAST_VARIANT = 'success' | 'error' | 'warning' | 'info';

const variantStyles = {
    success: {

    },
    error: {

    },
    warning: {

    },
    info: {

    }
}

const ToastNote  = ({title, message, variant}: 
                    {title: string, message: string, variant: TOAST_VARIANT}) => {
    return (
        <ToastContainer className="p-3" position="top-start">
            <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">{title}</strong>
                    {/* <small>11 mins ago</small> */}
                </Toast.Header>
                <Toast.Body className="text-white">
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastNote
