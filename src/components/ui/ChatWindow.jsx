
//Form
import MessageInput from '../form/MessageInput';

//UI
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';

function ChatWindow({ name, messages, onSendMessage, loadMoreMessages, hasMore, currentMessage, setCurrentMessage }) {
   
  return (
    <div className="app-mychat-window">
      <ChatHeader name={name}/>
      <MessageList messages={messages} loadMoreMessages={loadMoreMessages} hasMore={hasMore}/>
      <MessageInput currentMessage={currentMessage} onSendMessage={onSendMessage} setCurrentMessage={setCurrentMessage}  />
    </div>
  );
}

export default ChatWindow;