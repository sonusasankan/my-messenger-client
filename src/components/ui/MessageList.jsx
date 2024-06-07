import React, { useEffect, useRef, useState, useCallback } from 'react';
import Message from './Message';

const MessageList = ({ messages, loadMoreMessages, hasMore }) => {
  const [isFetching, setIsFetching] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

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

  return (
    <div className="app-mychat-chatbox_messages" ref={containerRef}>
      {messages.length ? (
        messages.map((msg) => <Message key={msg._id} message={msg.message} />)
      ) : (
        <p>Loading...</p>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
