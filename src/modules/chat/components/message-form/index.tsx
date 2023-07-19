import { FormEventHandler, useRef } from "react";

import { Button, Form } from "react-bootstrap";
import useTranslate from "../../../../hooks/useTranslate";


const MessageForm = ({handleSendMessage}:{handleSendMessage: (msg: string) => void}) => {

    const messageInput = useRef<HTMLInputElement | null>(null);  
    const t = useTranslate();
    
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        handleSendMessage(messageInput.current?.value   as string);
        if(messageInput.current) {
            messageInput.current.value = '';
        }
    }

    
    return      <Form onSubmit={handleSubmit} 
                                className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                    alt="avatar 3" style={{width: "40px",height: "100%"}} className=" me-2"/>
                    <Form.Control ref={messageInput} 
                                className="form-control-md"
                                placeholder={`${t('type_message')}...`} />

                    <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
                    <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
                    <Button type="submit"
                            className="ms-3 btn-falcon-primary">
                            <i className="fas fa-paper-plane"></i>
                    </Button>    
                </Form>;
}
 
export default MessageForm;