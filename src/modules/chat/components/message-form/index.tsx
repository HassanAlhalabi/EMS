import { ChangeEvent, FormEventHandler, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { EmojiClickData } from "emoji-picker-react";

import useTranslate from "../../../../hooks/useTranslate";
import useEmojisPicker from "../../hooks/useEmojisPicker";

const MessageForm = (   {   handleSendMessage,
                            isEdit}:
                        {   handleSendMessage: (msg: string) => void,
                            isEdit?: boolean}) => {

    const [messageInput, setMessgeInput] = useState('');
    const t = useTranslate();
    
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        handleSendMessage(messageInput);
        setMessgeInput('');
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setMessgeInput(e.target.value)

    const handleEmojiClick = (emoji: EmojiClickData) => {
        setMessgeInput(prev => prev + emoji.emoji) 
    }

    const { renderEmojisPicker, openEmojiPicker } = useEmojisPicker({handleEmojiClick});

    return      <Form onSubmit={handleSubmit} 
                                className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                    alt="avatar 3" style={{width: "40px",height: "100%"}} className=" me-2"/>
                    <Form.Control   value={messageInput}
                                    onChange={handleChangeInput}
                                    className="form-control-md"
                                    placeholder={`${t('type_message')}...`} />

                    {/* <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a> */}
                    <a  className="ms-3 text-muted position-relative" 
                        href="#!" 
                        onClick={openEmojiPicker}><i className="fas fa-smile"></i>
                            { renderEmojisPicker() }
                    </a>
                    {
                        !isEdit && 
                        <Button type="submit"
                                className="ms-3 btn-falcon-primary">
                                <i className="fas fa-paper-plane"></i>
                        </Button> 
                    }   
                </Form>;
}
 
export default MessageForm;