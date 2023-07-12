import { MutableRefObject, useRef } from "react";

import { Button, Form } from "react-bootstrap";

import { Message } from "../../types";
import ChatMessage from "../message";
import MessageForm from "../message-form";



const ChatRoom = ({title, messages, handleSendMessage}:
                  { title: string; 
                    messages: Message[], 
                    handleSendMessage: (message:  string) => void}) => {

    const roomRef = useRef<HTMLDivElement>(null)                  

    return <>
              <h4 className="border-bottom pb-3">{title}</h4>

              <div  ref={roomRef}
                    className="pt-3 pe-3 vh-75"
                    style={{position: "relative", overflowY: 'auto', maxHeight: '500px'}}>
                        {
                          messages.map((message, index) => {
                            return <div key={`${message.messageId}${index}`} className="mb-2">
                                      <ChatMessage {...message} />
                                  </div>
                        })}
              </div>
              
              <hr />
              <MessageForm handleSendMessage={(msg) => {
                                                roomRef.current?.scrollTo({
                                                  behavior: 'smooth',
                                                  top: roomRef.current.scrollHeight
                                                })
                                                handleSendMessage(msg);
                                              }} /> 
            </>
        
}
 
export default ChatRoom;