
const MessageOptions = ({ messageId, handleDeleteMessage, handleEditMessage }:
                        {   messageId: string, 
                            handleDeleteMessage?: (messageId: string) => void,
                            handleEditMessage?: (messageId: string) => void}) => {
    return  <div className="message-options flex-column gap-4 position-absolute" 
                style={{
                bottom: '50%',
                left: 'calc(100% + 5px)',
                translate: '0 50%'
                }}>
                    <i onClick={() => handleDeleteMessage?.(messageId)} className="fa fa-trash fa-sm cursor-pointer"></i>
                    <i onClick={() => handleEditMessage?.(messageId)} className="fa fa-edit fa-sm cursor-pointer"></i>
            </div>;
            
            
}
 
export default MessageOptions;