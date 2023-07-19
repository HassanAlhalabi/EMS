import { Message } from "../../types";
import sendingIcon from '../../../../assets/img/message-sent-loading3.gif';
import { getCookie } from "../../../../util";

const userId = getCookie('EMSUser').id;

const ChatMessage = ({messageId, content, senderFullName, senderId, sentAt, sending, failed}: Message) => {

    const getMessageBG = () => {
        if(failed) {
            return '#900'
        }
        return senderId === userId ? "#6899d5" : "#123057";
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

    return <div className="d-flex flex-row justify-content-start">
            {/* <img src={thumbnail} className="rounded-circle" alt="avatar 1" style={{width: "45px", height: "100%"}} /> */}
            <div>
                <p className="small p-2 mb-1 rounded-3" 
                    style={{backgroundColor: getMessageBG(), 
                            color: '#FFF', 
                            fontSize: '14px',
                            width: 'fit-content'}}>
                    {content}
                </p>
                <p className="small mb-1 rounded-3 text-muted float-start d-flex gap-2 align-items-center">
                    { renderSendStatus() }
                </p>

            </div>
        </div>
}

 
export default ChatMessage;