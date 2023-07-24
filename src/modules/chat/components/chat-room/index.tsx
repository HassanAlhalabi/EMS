
import SyncLoader from "react-spinners/SyncLoader";
import { FetchNextPageOptions, UseInfiniteQueryResult } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { Message } from "../../types";
import ChatMessage from "../message";
import MessageForm from "../message-form";
import MessagesLoader from "../../../../components/messages-loader";

const ChatRoom = ({ title, 
                    messages, 
                    handleSendMessage, 
                    fetchNextPage,
                    loadingMessages,
                    hasNextPage }:
                  { title: string; 
                    messages: Message[];
                    handleSendMessage: (message:  string) => void;
                    loadingMessages: boolean;
                    fetchNextPage: (options?: FetchNextPageOptions) => Promise<UseInfiniteQueryResult>;
                    hasNextPage: boolean | undefined,
                    isFetchingNextPage: boolean
                  }) => {

    return <>
              <h4 className="border-bottom pb-3">{title}</h4>
              <InfiniteScroll
                dataLength={messages.length}
                next={fetchNextPage}
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
                hasMore={hasNextPage as boolean}
                loader={<h4 className="mt-3" style={{ textAlign: "center" }}><SyncLoader color="#8cb3e2" /></h4>}
                height={500}
                inverse={true}
              >
                {loadingMessages && <MessagesLoader />}
                {
                  messages.map((message, index) => {
                    return <div key={`${message.messageId}${index}`} className="mb-2">
                              <ChatMessage {...message} />
                          </div>
                })}
              </InfiniteScroll>
              <hr />
              <MessageForm handleSendMessage={(msg) => { handleSendMessage(msg) }} /> 
            </>
        
}
 
export default ChatRoom;