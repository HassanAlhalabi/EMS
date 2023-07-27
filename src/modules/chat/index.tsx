import { useRef, useState } from "react";

import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import useAccess from "../../hooks/useAccess";
import GroupsList from "./components/groups-list";
import { Group, Message } from "./types";
import ChatRoom from "./components/chat-room";
import { useHTTP } from "../../hooks/useHTTP";
import { dateFromNow, getCookie } from "../../util";
import useGetData from "../../hooks/useGetData";
import useGetAllMessages from "./hooks/useGetAllMessages";
import useTranslate, { TranslateKey } from "../../hooks/useTranslate";
import { Action, PaginationInfo } from "../../types";
import GroupsLoader from "./components/groups-loader";
import { ACTION_TYPES } from "../../constants";
import PopUp from "../../components/popup";
import { toast } from "react-toastify";
import { ActionItem, useActions } from "../../hooks/useActions";
import MessageForm from "./components/message-form";
import { Form, FormCheck, Stack } from "react-bootstrap";

const senderId = getCookie('EMSUser').id;

const ChatPage = () => {

  const [signlRconnection, setSignlRconnectionConnection] = useState<HubConnection | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const { access } = useAccess();
  const [messageId, setMessageId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);
  const { setAction } = useActions()
  const  { post } = useHTTP();     
  const t = useTranslate();
  const [deleteForAll, setDeleteForAll] = useState<boolean>(true);
  const [messageContent, setMessageContent] = useState('');
  const {data: groups, isLoading } = useGetData<Group[]>('/Group/GetAllGroups')
  const [messages, setMessages] = useState<Message[]>([]);
  const { refetch,
          isLoading: loadingMessages,
          fetchNextPage,
          isFetching, 
          hasNextPage, isFetchingNextPage } = useGetAllMessages<{messages: Message[];
                                                            paginationInfo: PaginationInfo
                                                          }>(selectedGroup?.groupId  as string, 
                                                                                  undefined, 
                                                                                  undefined,{
    onSuccess: res => { 
      setMessages(res.pages[res.pages.length - 1].data.messages.map(message => ({...message, sentAt: dateFromNow(message.sentAt)})))
    }
  });

  const handleContentChange = (newContent: string) => setMessageContent(newContent) 

  const createConnection = async (group?: string) => {

    try {

      if(signlRconnection) return;
      
      const connection = new HubConnectionBuilder()
      .withUrl('http://alimakhlouf-002-site2.btempurl.com/chatHub', { accessTokenFactory: () => access as string })
      .configureLogging(LogLevel.Information)
      .build();
  
      connection.on("newmessage", (message: Message) => {

        if(message.senderId === senderId) return;

        setMessages(prev => ([
          ...prev,
          {
            ...message,
            sentAt: dateFromNow(message.sentAt),
            selected: false
          }
        ]));

        refetch();

      });
  

      connection.onclose(e => setSignlRconnectionConnection(null))

      await connection.start();
      await connection.invoke('AddToGroup', group)

      setSignlRconnectionConnection(connection);

      return connection;
  
    } catch(error) {
      return error
    } 
  }

  const sendMessage = async () => {
    
    if(!messageContent) return;

    if(!navigator.onLine) {
      return toast.warning('You Are Offline');
    }

    const messageId = senderId+Date.now();

    // Preview Message In Room
    setMessages(prev => ([
      {
        messageId,
        sentAt: dateFromNow(Date.now()),
        senderId,
        senderFullName: 'Ahmad Hassan',
        content: messageContent,
        sending: true,
        selected: false
      },
      ...prev
    ]))
    try {
      await post('/Message',{
        content: messageContent,
        toGroupId: selectedGroup?.groupId
      });
      setMessages(prev => prev.map(message => {
        if(message.messageId === messageId) {
          return {
            ...message,
            sending: false,
          }
        }
        return message;
      }))
    } catch(error) {
      setMessages(prev => prev.map(message => {
        if(message.messageId === messageId) {
          return {
            ...message,
            sending: false,
            failed: true,
          }
        }
        return message;
      }))
    }
    refetch();
    setMessageContent('');
  }

  const handleClickGroup = (group: Group) => { 
    if(group.groupId === selectedGroup?.groupId) return;
    setMessages([]);
    createConnection(group.groupId); 
    setSelectedGroup(group)
  };

  const handleSelectMessage = (messageId: string, action: 'SELECT' | 'DISELECT') => {
    if(action === 'SELECT') {
      return setMessages(prev => prev.map(message => message.messageId === messageId ? ({...message, selected: true}) : message))
    }
    if(action === 'DISELECT') {
      return setMessages(prev => prev.map(message => message.messageId === messageId ? ({...message, selected: false}) : message))
    }
  }

  const  handleDeselectAllMessages = () => setMessages(prev => prev.map(message => ({...message, selected: false})))

  const handleSuccess = (message: string) => {
    toast.success(message);
    refetch();
    reset();
  }

  const actionsMap = {
    [ACTION_TYPES.update]: {
        type:  ACTION_TYPES.update,
        path: '/Message/PutMessage',
        payload: {
          content: messageContent,
          messageId
        },
        onSuccess: () => handleSuccess('Message Updated Successfully')
    },
    [ACTION_TYPES.delete]: {
        type: ACTION_TYPES.update,
        path: `/Message/DeleteMessage`,
        payload: {
          ids:  messageId ? [messageId] : 
                messages.filter(message => message.selected === true)
                        .map(message => message.messageId),
          deleteFromAll: deleteForAll
        },
        onSuccess: () => handleSuccess('Messages Deleted Successfully')
    } 
  }

  const handleMessageAction = async () => {
    if(currentAction) {
        setAction(actionsMap[currentAction] as ActionItem)
    }
  }

  const handleDeleteMessages = (messageId?: string) => {
    if(!navigator.onLine) {
      return toast.warning('Offline');
    }
    if(messageId) {
      setMessageId(messageId)
    }
    setCurrentAction(ACTION_TYPES.delete as Action)
  }

  const handleEditMessagePopup = (messageId: string, content: string) => {
    if(!navigator.onLine) {
      return toast.warning('Offline');
    }
    if(messageId) {
      setMessageId(messageId)
    }
    if(content) {
      setMessageContent(content)
    }
    setCurrentAction(ACTION_TYPES.update as Action);
  }

  const reset = () => {
    setCurrentAction(null);
    setMessageId(null);
    setMessageContent('');
  }

  return     <div  id="chat3" style={{borderRadius: "15px"}}>

                <div className="row">
                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 position-relative">
                        {(groups && !isLoading) ? 
                          <GroupsList groups={(groups.data)} handleClickGroup={handleClickGroup}/> :
                          <GroupsLoader />}
                    </div>
                    <div className="col-md-6 col-lg-7 col-xl-8">
                      <div className="border border-2 rounded p-2 h-100">
                        {selectedGroup ? <ChatRoom  loadingMessages={loadingMessages} 
                                                    fetchingMessasges={isFetching}
                                                    title={selectedGroup.groupName} 
                                                    messages={messages} 
                                                    handleSendMessage={sendMessage}
                                                    messageContent={messageContent}
                                                    handleContentChange={handleContentChange}
                                                    fetchNextPage={fetchNextPage}
                                                    hasNextPage={hasNextPage}
                                                    isFetchingNextPage={isFetchingNextPage}
                                                    handleSelectMessage={handleSelectMessage}
                                                    handleDeleteMessages={handleDeleteMessages}
                                                    handleEditMessage={handleEditMessagePopup}
                                                    handleDeselectAllMessages={handleDeselectAllMessages}
                                          /> : 
                        <div className="d-flex h-100 flex-column justify-content-center  text-center">
                          <p className="fw-bold">{t('select_group')}</p>
                          <i className="fa fa-message fa-4x"></i>
                        </div>}
                      </div>
                    </div>

                </div>

                <PopUp  title={`${t(currentAction as TranslateKey)} ${t('messages')}`}
                        show={currentAction !== null}
                        onHide={() => { reset() }}
                        confirmText={`${currentAction} Message`}
                        confirmButtonVariant={
                            currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
                        }
                        handleConfirm={handleMessageAction}
                        // confirmButtonIsDisabled={currentAction !== ACTION_TYPES.delete}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <MessageForm isEdit
                                                handleContentChange={handleContentChange}
                                                content={messageContent}
                                                handleSendMessage={handleMessageAction} />
                        }
                        {currentAction === ACTION_TYPES.delete && 
                                    <div className="d-flex justify-content-between">
                                      <div>Are you Sure You Want to Delete This Messages</div>
                                      <Stack className="d-flex gap-2">
                                          <Form.Label htmlFor="delete-for-all">
                                            Delete For All Users:
                                          </Form.Label>
                                          <FormCheck  onChange={e => e.target.checked ? setDeleteForAll(true) : setDeleteForAll(false)} 
                                                      checked={deleteForAll} 
                                                      id="delete-for-all" />
                                      </Stack>
                                    </div>
                        }
                </PopUp>
                
            </div>;
}
 
export default ChatPage;