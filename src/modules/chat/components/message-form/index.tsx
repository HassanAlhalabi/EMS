import { ChangeEvent, FormEventHandler, useRef, useState, useContext } from "react";

import EmojiPicker, { EmojiClickData, SuggestionMode, Theme } from "emoji-picker-react";
import { Button, Form } from "react-bootstrap";

import useTranslate from "../../../../hooks/useTranslate";
import { useBlur } from "../../../../hooks/useBlur";
import { LayoutContext } from "../../../../contexts/layout-context";


const MessageForm = ({handleSendMessage}:{handleSendMessage: (msg: string) => void}) => {

    const [messageInput, setMessgeInput] = useState('');  
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const t = useTranslate();
    const theme = useContext(LayoutContext)
    const emojiPickerRef = useRef(null);
    const openEmojiPicker = () => setShowEmojiPicker(true);
    const closeEmojiPicker = () => setShowEmojiPicker(false);
    useBlur(emojiPickerRef, closeEmojiPicker)
    
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        handleSendMessage(messageInput);
        setMessgeInput('');
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setMessgeInput(e.target.value)

    const handleEmojiClick = (emoji: EmojiClickData) => {
        setMessgeInput(prev => prev + emoji.emoji) 
    }
    
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
                        {
                            showEmojiPicker && <div ref={emojiPickerRef}
                                                    className="position-absolute"
                                                    style={{
                                                        bottom: 0,
                                                        right: 0
                                                    }}>
                                                    <EmojiPicker 
                                                        lazyLoadEmojis
                                                        suggestedEmojisMode={SuggestionMode.FREQUENT}
                                                        theme={
                                                            theme.theme === 'DARK' ? Theme.DARK : Theme.LIGHT
                                                        } 
                                                        onEmojiClick={handleEmojiClick} />
                                                </div>
                        }
                    </a>
                    <Button type="submit"
                            className="ms-3 btn-falcon-primary">
                            <i className="fas fa-paper-plane"></i>
                    </Button>    
                </Form>;
}
 
export default MessageForm;