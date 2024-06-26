import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import Message from './Message';

import { baseURL } from "../../env";

//context
import { MessageContext, MessageDispatchContext, SelectedFriendContext, AuthContext } from '../../store';


const MessageList = ({ loadMoreMessages, hasMore }) => {
  const { user } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const selectedFriend = useContext(SelectedFriendContext);
  const messagesData = useContext(MessageContext);
  const messagesDispatch = useContext(MessageDispatchContext);

  const { messages, loading, error } = messagesData;
  
  useEffect(() => {
    if (selectedFriend) {
      const fetchMessages = async () => {
        messagesDispatch({ type: 'FETCH_INIT' });
        try {
          const response = await fetch(`${baseURL}/api/messages?sender=${user._id}&receiver=${selectedFriend._id}`);
          const data = await response.json();
          messagesDispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (error) {
          messagesDispatch({ type: 'FETCH_FAILURE', payload: error });
        }
      };
      fetchMessages();
    }
  }, [selectedFriend, messagesDispatch]);


  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = useCallback(() => {
    if (containerRef.current.scrollTop === 0 && !isFetching && hasMore) {
      setIsFetching(true);
      loadMoreMessages().finally(() => setIsFetching(false));
    }
  }, [isFetching, hasMore, loadMoreMessages]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  if(error){
    return(
      <div className="app-mychat-chatbox_messages">
        <p>Error: {error}</p>
      </div>
    )
  }

  if(loading){
    return(
      <div className="app-mychat-chatbox_messages">
        <p>Loading...</p>
      </div>
    );
  }

  if(!loading && messages.length === 0){
    return(
      <div className="app-mychat-chatbox_messages">
          <p>Start a conversation with your new friend</p>
      </div>
    )
  }

  return (
    <div className="app-mychat-chatbox_messages" ref={containerRef}>
      {messages.map((msg) => <Message sender={msg.sender} key={msg._id} message={msg.message} />)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
