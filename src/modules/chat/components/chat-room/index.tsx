import { useEffect, useLayoutEffect, useRef } from "react";

import { Message } from "../../types";
import ChatMessage from "../message";
import MessageForm from "../message-form";
import MessagesLoader from "../../../../components/messages-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchNextPageOptions, UseInfiniteQueryResult } from "react-query";

const ChatRoom = ({ title, 
                    messages, 
                    handleSendMessage, 
                    fetchNextPage,
                    hasNextPage }:
                  { title: string; 
                    messages: Message[];
                    handleSendMessage: (message:  string) => void;
                    loadingMessages: boolean;
                    fetchNextPage: (options?: FetchNextPageOptions) => Promise<UseInfiniteQueryResult>;
                    hasNextPage: boolean | undefined
                  }) => {

    const roomRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //   if(loadingMessages) {
    //     roomRef.current?.scrollTo({
    //       behavior: 'instant',
    //       top: roomRef.current.scrollHeight
    //     });
    //     return;
    //   }
    //   roomRef.current?.scrollTo({
    //   behavior: 'instant',
    //   top: roomRef.current.scrollHeight
    // })
    // },[]);

    useLayoutEffect(() => {
      if(roomRef.current) {
        roomRef.current.onscroll = function() {
          if(roomRef.current?.scrollTop) {
            if(roomRef?.current?.scrollTop <= 100) {
              fetchNextPage()
            }
          }
        }
      }
    }, [])

    return <>
              <h4 className="border-bottom pb-3">{title}</h4>

                <div  ref={roomRef}
                      id="scrollableDiv"
                      className="pt-3 pe-3 vh-75 to-scroll"
                      style={{position: "relative", overflowY: 'auto', maxHeight: '500px'}}
                    >
                     <InfiniteScroll
                        scrollableTarget="scrollableDiv"
                        dataLength={messages.length}
                        next={fetchNextPage}
                        style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'hidden' }} //To put endMessage and loader to the top.
                        inverse={true}
                        hasMore={hasNextPage || false}
                        loader={<h4>Loading...</h4>}
                      >
                        {/* {loadingMessages && <MessagesLoader />} */}
                        {
                          messages.map((message, index) => {
                            return <div key={`${message.messageId}${index}`} className="mb-2">
                                      <ChatMessage {...message} />
                                  </div>
                        })}
                      </InfiniteScroll>
              </div> 

              {/* <div
                    id="scrollableDiv"
                    style={{
                      height: 500,
                      overflow: 'auto',
                      display: 'flex',
                      flexDirection: 'column-reverse',
                    }}
                  >
                    {loadingMessages && <MessagesLoader />}
                    {!loadingMessages && <InfiniteScroll
                      dataLength={messages.length} //This is important field to render the next data
                      next={refetchOldMessages}
                      hasMore={paginationInfo?.hasNext as boolean}
                      loader={<h4>Loading...</h4>}
                      style={{ display: 'flex', flexDirection: 'column-reverse' }}
                      scrollableTarget="scrollableDiv"
                      endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                  }
                >
                  {
                          messages.map((message, index) => {
                            return <div key={`${message.messageId}${index}`} className="mb-2">
                                      <ChatMessage {...message} />
                                  </div>
                        })}
                </InfiniteScroll>  }
                 </div> */}
              <hr />
              <MessageForm handleSendMessage={(msg) => { handleSendMessage(msg) }} /> 
            </>
        
}
 
export default ChatRoom;