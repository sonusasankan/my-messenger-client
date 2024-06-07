import { useContext} from 'react';
import { FriendsContext } from "../../store";

//Form
import MessageInput from '../form/MessageInput';

//UI
import ChatHeader from './ChatHeader';


function ChatWindow({ name, messages, onSendMessage }) {
    const friends = useContext(FriendsContext);
   
  return (
    <div className="app-mychat-window">
      <ChatHeader name={name}/>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}

export default ChatWindow;