import { Message } from "../../types";
import sendingIcon from '../../../../assets/img/message-sent-loading3.gif';
import { getCookie } from "../../../../util";
import MessageOptions from "../message-options";
import styled from "styled-components";

const userId = getCookie('EMSUser').id;

const StyledMessage = styled.div`
    & .message-options {
        display: none;
    }

    &:hover .message-options {
        display: flex;
    }

    & .selected {
        background-color: #253446;
    }
`

const ChatMessage = ({  messageId, 
                        content, 
                        senderFullName, 
                        senderId, 
                        sentAt, 
                        sending, 
                        failed,
                        handleDeleteMessage,
                        handleEditMessage,
                        handleSelect,
                        selected
        }: Message) => {

    const getMessageClass = () => {
        if(failed) {
            return '#900'
        }
        return senderId === userId ? "my-message-body" : "";
    }

    const renderMessageOptions = () => {
        return (senderId === userId && !sending) ? 
            <MessageOptions messageId={messageId}
                            handleEditMessage={handleEditMessage}
                            handleDeleteMessage={handleDeleteMessage} />
        : <></> ;
    }

    const renderSendStatus = () => {
        if(failed) {
            return  <>
                        <i className="fa fa-times fa-md"></i>
                        <span>Send Failed</span>
                    </>
        }
        return sending ? 
                    <>
                        <img style={{
                            width: '12px',
                            height: '12px',
                            filter: 'invert(1) brightness(1)',
                            mixBlendMode: 'screen'
                        }} src={sendingIcon} />
                        <span>{'......'}</span>
                    </> :
                    <>
                        <i className="fa fa-check fa-md"></i>
                        <span>{sentAt}</span>
                    </>
    }

    return   <StyledMessage>
                <div className={`d-flex gap-2 flex-row justify-content-start p-2 rounded mx-3 ${selected ? 'selected' : ''}`}
                     onClick={() => handleSelect?.(messageId, 'SELECT')} 
                     onContextMenu={(e) => {e.preventDefault(); handleSelect?.(messageId, 'DISELECT')}}      
                    >
                    <img src={`https://placehold.co/55x55?text=${senderFullName}`} className="rounded-circle" alt="avatar 1" style={{width: "45px", height: "100%"}} />
                    <div>
                        <div className={`message-body ${getMessageClass()} p-3 mb-1`} 
                            style={{color: '#FFF',
                                    width: 'fit-content',
                                    borderRadius: '20px 20px 20px 10px',
                                    position: "relative"}}>
                            <h6>{senderFullName}</h6>
                            <p className="small m-0" style={{fontSize: '14px'}}>
                                {content}
                            </p>
                            {renderMessageOptions()}
                        </div>
                        <p className="small mb-1 rounded-3 text-muted float-start d-flex gap-2 align-items-center">
                            { renderSendStatus() }
                        </p>
                    </div>
                </div>
            </StyledMessage>
}

 
export default ChatMessage;