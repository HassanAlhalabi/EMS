import { useState } from "react";

import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import useAccess from "../../hooks/useAccess";
import GroupsList from "./components/groups-list";
import { Group, Message } from "./types";
import ChatRoom from "./components/chat-room";
import { useHTTP } from "../../hooks/useHTTP";
import { dateFromNow, getCookie } from "../../util";
import useGetData from "../../hooks/useGetData";
import useGetAllMessages from "./hooks/useGetAllMessages";
import useTranslate from "../../hooks/useTranslate";
import { PaginationInfo } from "../../types";
import GroupsLoader from "./components/groups-loader";

const senderId = getCookie('EMSUser').id;

const ChatPage = () => {

  const [signlRconnection, setSignlRconnectionConnection] = useState<HubConnection | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const { access } = useAccess();
  const  { post } = useHTTP();     
  const t = useTranslate();
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    hasNext: true,
    pageNo: 1,
    pageSize: 50,
  })

  const {data: groups, isLoading, isFetching} = useGetData<Group[]>('/Group/GetAllGroups')

  const [messages, setMessages] = useState<Message[]>([]);

  const { refetch,
          isLoading: loadingMessages,
          fetchNextPage, 
          hasNextPage, isFetchingNextPage } = useGetAllMessages<{messages: Message[];
                                                            paginationInfo: PaginationInfo
                                                          }>(selectedGroup?.groupId  as string, 
                                                                                  undefined, 
                                                                                  paginationInfo.pageSize,{
    onSuccess: res => { 
      setMessages(res.pages[res.pages.length - 1].data.messages.map(message => ({...message, sentAt: dateFromNow(message.sentAt)})))
      }
  });

  const createConnection = async (group?: string) => {

    try {

      if(signlRconnection) return signlRconnection;
      
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
            sentAt: dateFromNow(message.sentAt)
          }
        ]));

        refetch();

      });
  

      connection.onclose(e => {
        setSignlRconnectionConnection(null)
      })

      await connection.start();
      await connection.invoke('AddToGroup', group)

      setSignlRconnectionConnection(connection);

      return connection;
  
    } catch(error) {
      return error
    } 
  }

  const  sendMessage = async (msg: string) => {
    if(!msg) return;

    const messageId = senderId+Date.now();

    // Preview Message In Room
    setMessages(prev => ([
      {
        messageId,
        sentAt: dateFromNow(Date.now()),
        senderId,
        senderFullName: 'Ahmad Hassan',
        content: msg,
        sending: true
      },
      ...prev
    ]))
    try {
      await post('/Message',{
        content: msg,
        toGroupId: selectedGroup?.groupId
      });
      setMessages(prev => prev.map(message => {
        if(message.messageId === messageId) {
          return {
            ...message,
            sending: false
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
  }

  const handleClickGroup = (group: Group) => { createConnection(group.groupId); setSelectedGroup(group)};

  return     <div  id="chat3" style={{borderRadius: "15px"}}>
                <div className="row">

                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                        {(groups && !isLoading) ? 
                          <GroupsList groups={(groups.data)} handleClickGroup={handleClickGroup}/> :
                          <GroupsLoader />}
                    </div>

                    <div className="col-md-6 col-lg-7 col-xl-8">
                      <div className="border rounded p-3 h-100">
                        {selectedGroup ? <ChatRoom  loadingMessages={loadingMessages} 
                                                    title={selectedGroup.groupName} 
                                                    messages={messages} 
                                                    handleSendMessage={sendMessage}
                                                    fetchNextPage={fetchNextPage}
                                                    hasNextPage={hasNextPage}
                                                    isFetchingNextPage={isFetchingNextPage} /> : 
                        <div className="d-flex h-100 flex-column justify-content-center  text-center">
                          <p className="fw-bold">{t('select_group')}</p>
                          <i className="fa fa-message fa-4x"></i>
                        </div>}
                      </div>
                    </div>

                </div>
            </div>;
}
 
export default ChatPage;