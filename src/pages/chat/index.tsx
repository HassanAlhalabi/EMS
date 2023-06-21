import { createSignalRContext } from "react-signalr";

import useAccess from "../../hooks/useAccess";

const { useSignalREffect, Provider } = createSignalRContext();

const ChatPage = () => {

    const {access} = useAccess();

    return     <Provider
                    connectEnabled={!!access}
                    accessTokenFactory={() => access}
                    dependencies={[access]} //remove previous connection and create a new connection if changed
                    url={"https://example/hub"}
                >
                    Chat App Here
                </Provider>;
}
 
export default ChatPage;