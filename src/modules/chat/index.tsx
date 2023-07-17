import { useEffect, useState } from "react";

import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import useAccess from "../../hooks/useAccess";
import GroupsList from "./components/groups-list";
import { Group, Message as IMessage, Message } from "./types";
import ChatMessage from "./components/message";
import ChatRoom from "./components/chat-room";
import { useHTTP } from "../../hooks/useHTTP";
import { browserNotify, dateFromNow, getCookie } from "../../util";
import useGetData from "../../hooks/useGetData";
import useGetAllMessages from "./hooks/useGetAllMessages";

const senderId = getCookie('EMSUser').id;

console.log(senderId)

const ChatPage = () => {

  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null)
  const { access } = useAccess();
  const  { post } = useHTTP();     

  const {data: groups} = useGetData<Group[]>('/Group/GetAllGroups')

  const [messages, setMessages] = useState<Message[]>([]);

  const { messages: allGroupMessages } = useGetAllMessages<{messages: Message[]}>(groupId,undefined,undefined,{
    onSuccess: data => setMessages(data.data.messages)
  });

  const createConnection = async (user?: string, room?: string) => {
    try {
      const connection = new HubConnectionBuilder()
      .withUrl('http://alimakhlouf-002-site2.btempurl.com/chatHub', { accessTokenFactory: () => access as string })
      .configureLogging(LogLevel.Information)
      .build();
  
      connection.on("ReceiveMessage", (message) => {

        // browserNotify('New Group Message', message);

        console.log('Message Received',message)

        setMessages(prev => ([
          ...prev,
          {
            messageId: senderId+dateFromNow(Date.now()),
            sentAt: dateFromNow(Date.now())+' ago',
            senderId,
            senderFullName: 'Ahmad Hassan',
            content: message,
          }
        ]))

      });
  

      connection.onclose(e => {
        setConnection(null)
      })

      await connection?.start();
      // await connection.invoke('JoinGroup', {user: senderId, room: groupId})

      setConnection(connection);

      return connection;
  
    } catch(error) {
      console.log(error);
      return error
    } 
  }

  useEffect(() => {
    if(!connection) {
      createConnection();
    }
  },[])

  const  sendMessage = async (msg: string) => {
    if(!msg) return;
    // Preview Message In Room
    setMessages(prev => ([
      ...prev,
      {
        messageId: senderId+dateFromNow(Date.now()),
        sentAt: dateFromNow(Date.now())+' ago',
        senderId,
        senderFullName: 'Ahmad Hassan',
        content: msg,
        sending: true
      }
    ]))
    try {
      await post('/Message',{
        content: msg,
        // toGroupId: groupId
      })
    } catch(error) {
      console.log(error)
    }
  }

    const handleClickGroup = (groupId: string) => setGroupId(groupId);

    return     <div  id="chat3" style={{borderRadius: "15px"}}>
                  <div className="row">

                      <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                          {groups && <GroupsList groups={(groups.data)} handleClickGroup={handleClickGroup}/>}
                      </div>

                      <div className="col-md-6 col-lg-7 col-xl-8">
                        <ChatRoom title={'Group Title'} messages={messages} handleSendMessage={sendMessage} />
                      </div>

                  </div>

              </div>;
}
 
export default ChatPage;