import { Message } from "../../types";
import sendingIcon from '../../../../assets/img/message-sent-loading3.gif';
import { getCookie } from "../../../../util";

const userId = getCookie('EMSUser').id;

const ChatMessage = ({  messageId, 
                        content, 
                        senderFullName, 
                        senderId, 
                        sentAt, 
                        sending, 
                        failed}: Message) => {

    const getMessageClass = () => {
        if(failed) {
            return '#900'
        }
        return senderId === userId ? "my-message-body" : "";
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

    return <div className="d-flex gap-2 flex-row justify-content-start">
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
                </div>
                <p className="small mb-1 rounded-3 text-muted float-start d-flex gap-2 align-items-center">
                    { renderSendStatus() }
                </p>
            </div>
        </div>
}

 
export default ChatMessage;