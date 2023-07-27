
const optoinsInfoStyles = {
    color: "#657c9a",
    fontSize: 12
}

const MessageOptions = ({ messageId, handleDeleteMessage, handleEditMessage, selected }:
                        {   messageId: string, 
                            handleDeleteMessage?: (messageId?: string) => void,
                            handleEditMessage?: () => void,
                            selected?: boolean    
                        }) => {
    return  <div className="message-options justify-content-around gap-2">
                    <span>
                        <i  onClick={(e) => { 
                            e.stopPropagation();
                            handleDeleteMessage?.(messageId);
                        }} 
                            className="fa fa-trash fa-md cursor-pointer">    
                        </i>
                    </span>
                    <span>
                        <i  onClick={(e) => { 
                            e.stopPropagation();
                            handleEditMessage?.();
                        }} 
                        className="fa fa-edit fa-md cursor-pointer"></i>
                    </span>
                    {!selected && <span  style={optoinsInfoStyles}>Double Click to Select <i className="fa fa-hand-pointer"></i></span>}
                    {selected && <span  style={optoinsInfoStyles}>Right Click to Deselect <i className="fa fa-hand-pointer"></i></span>}
            </div>;
            
            
}
 
export default MessageOptions;