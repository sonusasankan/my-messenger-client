import React, { Suspense, lazy } from 'react';

// Lazy load the Message component
const Message = lazy(() => import('./Message'));

const MessageList = ({ messages }) => {
  return (
    <Suspense fallback={<p>Loading messages...</p>}>
      <div className="app-mychat-chatbox_messages">
        {messages.length > 0 ? (
          messages.map(msg => (
            <Message key={msg._id} message={msg.message} />
          ))
        ) : (
          <p>No messages to display</p>
        )}
      </div>
    </Suspense>
  );
};

export default MessageList;
