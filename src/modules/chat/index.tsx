import { useEffect, useState } from "react";

import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import useAccess from "../../hooks/useAccess";
import GroupsList from "./components/groups-list";
import { Group, Message as IMessage } from "./types";
import ChatMessage from "./components/message";
import ChatRoom from "./components/chat-room";
import { useHTTP } from "../../hooks/useHTTP";
import { browserNotify, dateFromNow } from "../../util";
import dayjs from "dayjs";
import useGetData from "../../hooks/useGetData";
import useGetAllMessages from "./hooks/useGetAllMessages";

const oldMessages: IMessage[] = [
  {
    date: '1 day ago',
    userId: '123',
    fullName: 'Hassan Alhalabi',
    message: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
    thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" 
  },
  {
    date: '1 day ago',
    userId: '123',
    fullName: 'Hassan Alhalabi',
    message: 'Nemo enim ipsam voluptatem quia voluptas s qui ratione voluptatem sequi nesciunt',
    thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" 
  }, 
  {
    date: '1 day ago',
    userId: '123',
    fullName: 'Hassan Alhalabi',
    message: 'it aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt',
    thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" 
  },
  {
    date: '1 day ago',
    userId: '124',
    fullName: 'Ali Makhlouf',
    message: 'm sequi nesciunt',
    thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp" 
  },
  {
    date: '1 day ago',
    userId: '124',
    fullName: 'Ali Makhlouf',
    message: 'Done',
    thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp" 
  },
  {
    date: '1 day ago',
    userId: '125',
    fullName: 'Dania Graoi',
    message: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequununt',
    thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp" 
  },
  {
    date: '1 day ago',
    userId: '1244',
    fullName: 'Ahmad Hassan',
    message: 'Yeas',
    thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp" 
  },
  {
    date: '1 day ago',
    userId: '1244',
    fullName: 'Ahmad Hassan',
    message: 'Was Machst Du ZU In Deiner Frie Ziet',
    thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp" 
  },
  {
    date: '1 day ago',
    userId: '1244',
    fullName: 'Ahmad Hassan',
    message: 'I ch Libe',
    thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp" 
  },
]

const ChatPage = () => {

  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null)
  const { access } = useAccess();
  const  { post } = useHTTP();     

  const {data: groups} = useGetData<Group[]>('/Group/GetAllGroups')

  const [messages, setMessages] = useState(oldMessages);

  const {messages: allGroupMessages} = useGetAllMessages(groupId);

  console.log(allGroupMessages)

  const createConnection = async (user?: string, room?: string) => {
    try {
      const connection = new HubConnectionBuilder()
      .withUrl('http://alimakhlouf-002-site2.btempurl.com/chatHub', { accessTokenFactory: () => access as string })
      .configureLogging(LogLevel.Information)
      .build();
  
      connection.on("ReceiveMessage", (message) => {

        // browserNotify('New Group Message', message);

        setMessages(prev => ([
          ...prev,
          {
            date: dateFromNow(Date.now())+'ago',
            userId: '3434',
            fullName: 'Ahmad Hassan',
            message,
            thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp" 
          }
        ]))

      });
  

      connection.onclose(e => {
        setConnection(null)
      })

      await connection?.start();
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
        date: dateFromNow(Date.now())+'ago',
        userId: '3434',
        fullName: 'Ahmad Hassan',
        message: msg,
        thumbnail: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp" 
      }
    ]))
    try {
      await post('/Message',{
        content: msg
      })
    } catch(error) {
      console.log(error)
    }
  }

    const handleClickGroup = (groupId: string) => setGroupId(groupId)


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