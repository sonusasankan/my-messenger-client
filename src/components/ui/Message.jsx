import React from 'react';

function Message({ message }) {
  return (
    <div className="app-mychat-chatbox_message-item">
      <p className="app-mychat-chatbox-message-text">{message}</p>
    </div>
  );
}

export default Message;