import React, { useState, useEffect } from 'react';

import sendSvg from '../../assets/images/send.svg';

function MessageInput({ onSendMessage, currentMessage, setCurrentMessage }) {
  const [message, setMessage] = useState(currentMessage);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate the message
    if (message.trim().length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [message]);

  useEffect(()=>{
    setMessage(currentMessage);
  },[currentMessage])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSendMessage(message);
      setCurrentMessage('');
    }
  };

  const handleSetMessage = (e) => {
    setMessage(e.target.value);
    setCurrentMessage(e.target.value);
  }

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
        onChange={handleSetMessage}
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
