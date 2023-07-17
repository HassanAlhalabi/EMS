import { Message } from "../../types";
import sendingIcon from '../../../../assets/img/message-sent-loading3.gif';

const ChatMessage = ({messageId, content, senderFullName ,senderId, sentAt, sending}: Message) => 
                    <div className="d-flex flex-row justify-content-start">
                        {/* <img src={thumbnail} className="rounded-circle" alt="avatar 1" style={{width: "45px", height: "100%"}} /> */}
                        <div>
                            <p className="small p-2 ms-3 mb-1 rounded-3 bg-primary" 
                                style={{backgroundColor: "#f5f6f7", color: '#FFF', fontSize: '14px'}}>
                                {content}
                            </p>
                            <p className="small ms-3 mb-1 rounded-3 text-muted float-end d-flex gap-2 align-items-center">
                                <span>{sentAt}</span>
                                {sending ? <img style={{
                                    width: '12px',
                                    height: '12px',
                                    filter: 'invert(1) brightness(1)',
                                    mixBlendMode: 'screen'
                                }} src={sendingIcon} /> :
                                    <i className="fa fa-check fa-md"></i>
                                }
                            </p>

                        </div>
                    </div>

 
export default ChatMessage;