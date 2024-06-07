import React from 'react';

function ChatHeader({ name }) {
  return (
    <div className="app-mychat-window_chat-header">
      <h6>{name}</h6>
    </div>
  );
}

export default ChatHeader;