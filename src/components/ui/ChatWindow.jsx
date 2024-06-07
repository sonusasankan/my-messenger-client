
//Form
import MessageInput from '../form/MessageInput';

//UI
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';

function ChatWindow({ name, messages, onSendMessage }) {
   
  return (
    <div className="app-mychat-window">
      <ChatHeader name={name}/>
      <MessageList messages={messages}/>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default ChatWindow;