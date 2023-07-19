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
import TableLoader from "../../components/table-loader";
import useTranslate from "../../hooks/useTranslate";
import dayjs from "dayjs";

const senderId = getCookie('EMSUser').id;

const ChatPage = () => {

  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const { access } = useAccess();
  const  { post } = useHTTP();     
  const t = useTranslate();

  console.log(dayjs.locale('ar'))

  const {data: groups, isLoading, isFetching} = useGetData<Group[]>('/Group/GetAllGroups')

  const [messages, setMessages] = useState<Message[]>([]);

  const { messages: allGroupMessages, refetch, isLoading: loadingMessages } = useGetAllMessages<{messages: Message[]}>(selectedGroup?.groupId  as string,undefined,undefined,{
    onSuccess: data => setMessages(data.data.messages.map(message => ({...message, sentAt: dateFromNow(message.sentAt)})))
  });

  const createConnection = async (group?: string) => {
    try {
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
        setConnection(null)
      })

      await connection.start();
      await connection.invoke('AddToGroup', group)

      setConnection(connection);

      return connection;
  
    } catch(error) {
      console.log(error);
      return error
    } 
  }

  const  sendMessage = async (msg: string) => {
    if(!msg) return;

    const messageId = senderId+dateFromNow(Date.now());

    // Preview Message In Room
    setMessages(prev => ([
      ...prev,
      {
        messageId,
        sentAt: dateFromNow(Date.now()),
        senderId,
        senderFullName: 'Ahmad Hassan',
        content: msg,
        sending: true
      }
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
                            <TableLoader columns={10} />}
                      </div>

                      <div className="col-md-6 col-lg-7 col-xl-8">
                        <div className="border rounded p-3 h-100">
                          {selectedGroup ? <ChatRoom loadingMessages={loadingMessages} title={selectedGroup.groupName} messages={messages} handleSendMessage={sendMessage} /> : 
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