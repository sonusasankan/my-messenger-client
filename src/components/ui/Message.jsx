import React from 'react';

function Message({ message }) {
  return (
    <div className="app-mychat-chatbox_message-item">
      <strong>{message}</strong>
    </div>
  );
}

export default Message;