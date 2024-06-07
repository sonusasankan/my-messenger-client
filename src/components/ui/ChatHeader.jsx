import React from 'react';

function ChatHeader({ name }) {
  return (
    <div className="app-mychat-window_chat-header">
      <strong>{name}</strong>
    </div>
  );
}

export default ChatHeader;