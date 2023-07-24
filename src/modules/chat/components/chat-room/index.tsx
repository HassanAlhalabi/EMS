
import { LegacyRef, useState } from 'react';

import SyncLoader from "react-spinners/SyncLoader";
import { FetchNextPageOptions, UseInfiniteQueryResult } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import { Message } from "../../types";
import ChatMessage from "../message";
import MessageForm from "../message-form";
import MessagesLoader from "../../../../components/messages-loader";
import { useRef } from "react";
import { Button } from 'react-bootstrap';

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

    const chatRoomRef = useRef<InfiniteScroll>();

    const [showDownArrow, setShowDownArrow] = useState(false)

    const handleScroll = (e: MouseEvent) => {
      const scrollTop = Math.abs((e?.target as HTMLElement).scrollTop);
      if(scrollTop >= 1000) {
        setShowDownArrow(true)
      } else {
        setShowDownArrow(false)
      }
    }
    const scrollDown = () => {
      // @ts-ignore
      const scrollElement = chatRoomRef?.current?.el
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth'
      })
    }

    return <div className='position-relative'>
              <h4 className="border-bottom pb-3">{title}</h4>
              <InfiniteScroll
                onScroll={handleScroll}
                ref={chatRoomRef as LegacyRef<InfiniteScroll>}
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
              { showDownArrow && 
                <Button
                  className='rounded-circle text-center d-flex p-0 btn-falcon-primary'
                  style={{
                    position: 'absolute',
                    bottom: '87px',
                    right: '20px',
                    width: '35px',
                    height: '35px'
                  }}
                  onClick={() => scrollDown()}>
                      <i className='fa fa-arrow-down m-auto'></i>
                </Button>}
              <hr />
              <MessageForm handleSendMessage={(msg) => { handleSendMessage(msg) }} /> 
            </div>
        
}
 
export default ChatRoom;