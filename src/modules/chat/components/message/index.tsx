import { Card } from "react-bootstrap";
import { Message } from "../../types";


const ChatMessage = ({thumbnail,fullName, date,  message, messageId}: Message) => 
                    <div className="d-flex flex-row justify-content-start">
                        <img src={thumbnail} className="rounded-circle" alt="avatar 1" style={{width: "45px", height: "100%"}} />
                        <div>
                            <p className="small p-2 ms-3 mb-1 rounded-3 bg-primary" 
                                style={{backgroundColor: "#f5f6f7", color: '#FFF', fontSize: '14px'}}>
                                {message}
                            </p>
                            <p className="small ms-3 mb-1 rounded-3 text-muted float-end">{date}</p>
                        </div>
                    </div>

 
export default ChatMessage;