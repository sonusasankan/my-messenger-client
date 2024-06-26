import React, { useState, useEffect, useContext } from 'react';

import sendSvg from '../../assets/images/send.svg';

import { CurrentMessageContextDispatch, SelectedFriendContext, CurrentMessageContext } from "../../store";

function MessageInput({ onSendMessage, setCurrentMessage }) {
  const currentMessageData = useContext(CurrentMessageContext);
  const selectedFriend = useContext(SelectedFriendContext);
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);


  const CurrentMessageDispatch = useContext(CurrentMessageContextDispatch);

  useEffect(()=>{
    
    if(selectedFriend && currentMessageData.hasOwnProperty(selectedFriend._id)){
      setMessage(currentMessageData[selectedFriend._id])
    } else {
      setMessage('');
    }

  },[selectedFriend])
  
  useEffect(() => {
    // Validate the message
    if (message.trim().length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [message]);

  // useEffect(()=>{
  //   setMessage(currentMessage);
  // },[currentMessage])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleSetMessage = (e) => {
    setMessage(e.target.value);
  }

  const handleOnBlur = (e) => {
    if(e.target.value){
      CurrentMessageDispatch({ type: "SET_CURRENT_MESSAGE", payload: {message: e.target.value, friendID: selectedFriend._id}})
    } else {
      if(selectedFriend && currentMessageData.hasOwnProperty(selectedFriend._id)){
        CurrentMessageDispatch({ type: 'REMOVE_CURRENT_MESSAGE', payload: { friendID: selectedFriend._id } });
      }
    }
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
        onBlur={handleOnBlur}
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
