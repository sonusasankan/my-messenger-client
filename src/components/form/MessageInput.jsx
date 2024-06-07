import React, { useState, useEffect } from 'react';

import sendSvg from '../../assets/images/send.svg';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate the message
    if (message.trim().length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline in textarea
      handleSubmit(e);
    }
  };

  return (
    <form className="app-mychat-chatbox_message-form" onSubmit={handleSubmit}>
      <textarea
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message"
        
      />
      <button type="submit" disabled={!isValid}>
        <img src={sendSvg} alt='Send message'/>
      </button>
    </form>
  );
}

export default MessageInput;
