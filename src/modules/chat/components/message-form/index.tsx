import { useRef } from "react";

import { Button, Form } from "react-bootstrap";


const MessageForm = ({handleSendMessage}:{handleSendMessage: (msg: string) => void}) => {

    const messageInput = useRef<HTMLInputElement | null>(null);                

    
    return  <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                    alt="avatar 3" style={{width: "40px",height: "100%"}} className=" me-2"/>
                    <Form.Control ref={messageInput} 
                                className="form-control-md"
                                placeholder="Type your message..." />

                    <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
                    <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
                    <Button className="ms-3 btn-falcon-primary" 
                            onClick={() => handleSendMessage(messageInput.current?.value   as string)}>
                            <i className="fas fa-paper-plane"></i>
                    </Button>    
                </div>;
}
 
export default MessageForm;