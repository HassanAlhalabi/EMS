import { useState } from "react";

import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import useAccess from "../../hooks/useAccess";
import Button from "../../components/button";

const ChatPage = () => {

  const [connection, setConnection] = useState<HubConnection>();

  const { access } = useAccess();

  const createConnection = async (user?: string, room?: string) => {
    try {
      const connection = new HubConnectionBuilder()
      .withUrl('/api/Message', { accessTokenFactory: () => access as string })
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
    
  const [messages, setMessage] = useState([]);

    return     <>
                    Chat App Here
                    <Button onClick={() => createConnection()} scope={""}>Create Connection</Button>
                </>;
}
 
export default ChatPage;