import { useState } from "react";

import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import useAccess from "../../hooks/useAccess";
import GroupsList from "./components/groups-list";
import { Group, Message as IMessage } from "./types";
import ChatMessage from "./components/message";
import ChatRoom from "./components/chat-room";

const groups: Group[] = [{
  groupName: 'GroupName1',
  groupMembersCount: 230,
  thumbnail: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp',
  newMessagesCount: 2,
  description: 'sdsdsd'
},
{
  groupName: 'GroupName2',
  groupMembersCount: 200,
  thumbnail: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp',
  newMessagesCount: 0,
  description: 'sdsdsd  fdfd'
},
{
  groupName: 'GroupName3',
  groupMembersCount: 114,
  thumbnail: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp',
  newMessagesCount: 4,
  description: 'sdsdsd'
}];

const messages: IMessage[] = [
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

  const [connection, setConnection] = useState<HubConnection>();

  const { access } = useAccess();

  const createConnection = async (user?: string, room?: string) => {
    try {
      const connection = new HubConnectionBuilder()
      .withUrl('http://alimakhlouf-002-site2.btempurl.com/chatHub', { accessTokenFactory: () => access as string })
      .configureLogging(LogLevel.Information)
      .build();
  
      connection.on("ReceiveMessage", (user, message) => {
        console.log(user, message)
      });
  
      await connection.start();
  
      return connection;
  
    } catch(error) {
      console.log(error);
      return error
    } 
  }
    
      // const [messages, setMessages] = useState([]);

    const  sendMessage = (msg: string) => {
      console.log(msg)
    }


    return     <div  id="chat3" style={{borderRadius: "15px"}}>
              <button onClick={() => createConnection()}>create connection</button>
                  <div className="row">

                      <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                          <GroupsList groups={groups} />
                      </div>

                      <div className="col-md-6 col-lg-7 col-xl-8">
                        <ChatRoom title={'Group Title'} messages={messages} handleSendMessage={sendMessage} />
                      </div>

                  </div>

              </div>;
}
 
export default ChatPage;