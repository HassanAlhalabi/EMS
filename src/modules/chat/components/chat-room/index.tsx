
import { LegacyRef, useState, useRef } from 'react';

import SyncLoader from "react-spinners/SyncLoader";
import { FetchNextPageOptions, UseInfiniteQueryResult } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from 'react-bootstrap';

import { Message } from "../../types";
import ChatMessage from "../message";
import MessageForm from "../message-form";
import MessagesLoader from "../../../../components/messages-loader";
import useTranslate from '../../../../hooks/useTranslate';

const ChatRoom = ({ title, 
                    messages, 
                    handleSendMessage, 
                    fetchNextPage,
                    loadingMessages,
                    hasNextPage,
                    handleSelectMessage,
                    handleDeleteMessages,
                    handleEditMessage   
                  }:
                  { title: string; 
                    messages: Message[];
                    handleSendMessage: (message:  string) => void;
                    loadingMessages: boolean;
                    fetchNextPage: (options?: FetchNextPageOptions) => Promise<UseInfiniteQueryResult>;
                    hasNextPage: boolean | undefined,
                    isFetchingNextPage: boolean,
                    handleSelectMessage: (messageId: string, action: 'SELECT' | 'DISELECT') => void,
                    handleDeleteMessages: (messagesIds?: string) => void,
                    handleEditMessage: (messageId: string) => void,
                  }) => {

    const chatRoomRef = useRef<InfiniteScroll>();
    const t = useTranslate();
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

    const selectedMessages = messages.filter(message => message.selected === true)

    return <div className='position-relative'>
              <h4 className="border-bottom pb-3 d-flex justify-content-between flex-wrap">
                {title} {selectedMessages.length > 0 ? <Button onClick={() => handleDeleteMessages()} className='btn-sm btn-falcon-danger'>{t('delete')} {selectedMessages.length} {t('messages')}</Button> : null}
              </h4>
              <InfiniteScroll
                onScroll={handleScroll}
                ref={chatRoomRef as LegacyRef<InfiniteScroll>}
                dataLength={messages.length}
                next={fetchNextPage}
                style={{ display: 'flex', flexDirection: 'column-reverse', minHeight: '60vh' }}
                hasMore={hasNextPage as boolean}
                loader={<h4 className="mt-3" style={{ textAlign: "center" }}><SyncLoader color="#8cb3e2" /></h4>}
                height={500}
                inverse={true}
              >
                {loadingMessages && <MessagesLoader />}
                {
                  messages.map((message, index) => {
                    return <div key={`${message.messageId}${index}`}>
                              <ChatMessage handleSelect={handleSelectMessage} 
                                           handleDeleteMessage={handleDeleteMessages}
                                           handleEditMessage={handleEditMessage}
                                          {...message} />
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
              <MessageForm  handleSendMessage={(msg) => { handleSendMessage(msg) }} /> 
            </div>
        
}
 
export default ChatRoom;