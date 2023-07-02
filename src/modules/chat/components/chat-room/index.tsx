import { MutableRefObject, useRef } from "react";

import { Button, Form } from "react-bootstrap";

import { Message } from "../../types";
import ChatMessage from "../message";
import MessageForm from "../message-form";



const ChatRoom = ({title, messages, handleSendMessage}:
                  { title: string; 
                    messages: Message[], 
                    handleSendMessage: (message:  string) => void}) => {

    return <>
              <h4 className="border-bottom pb-3">{title}</h4>

              <div className="pt-3 pe-3 vh-75"
                  style={{position: "relative", overflowY: 'auto', maxHeight: '500px'}}>
                  {
                    messages.map((message, index) => {
                      return <div className="mb-2">
                                <ChatMessage key={message.messageId} {...message} />
                            </div>
                  })}
              </div>
              
              <hr />
              <MessageForm handleSendMessage={handleSendMessage} /> 
            </>
        
}
 
export default ChatRoom;