import { createSignalRContext } from "react-signalr";

import useAccess from "../../hooks/useAccess";
import { useState } from "react";

const { useSignalREffect, Provider } = createSignalRContext();

const ChatPage = () => {

    const { access } = useAccess();
    
    const [messages, setMessage] = useState([]);

    useSignalREffect(
      "event name",
      (message) => {
        setMessage([...messages, message]);
      },
      [messages],
    );

    return     <Provider
                    connectEnabled={!!access}
                    accessTokenFactory={() => access  as string}
                    dependencies={[access]} //remove previous connection and create a new connection if changed
                    url={"http://alimakhlouf-002-site2.btempurl.com/"}
                >
                    Chat App Here
                </Provider>;
}
 
export default ChatPage;