
//Form
import MessageInput from '../form/MessageInput';

//UI
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';

function ChatWindow({ name, onSendMessage, loadMoreMessages, hasMore }) {
   
  return (
    <div className="app-mychat-window">
      <ChatHeader name={name}/>
      <MessageList loadMoreMessages={loadMoreMessages} hasMore={hasMore}/>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default ChatWindow;