import { createSignalRContext } from "react-signalr";

import useAccess from "../../hooks/useAccess";

const { useSignalREffect, Provider } = createSignalRContext();

const ChatPage = () => {

    const { access } = useAccess();

    return     <Provider
                    connectEnabled={!!access}
                    accessTokenFactory={() => access}
                    dependencies={[access]} //remove previous connection and create a new connection if changed
                    url={"http://alimakhlouf-002-site2.btempurl.com/"}
                >
                    Chat App Here
                </Provider>;
}
 
export default ChatPage;