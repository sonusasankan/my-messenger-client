import { useContext} from 'react';
import { UserContext } from "../../store";

function Message({ message, sender }) {
  const user = useContext(UserContext);
  console.log(sender, user)
  return (
    <div className={`app-mychat-chatbox_message-item ${sender === user? "right": "left"}`}>
      <p className="app-mychat-chatbox-message-text">{message}</p>
    </div>
  );
}

export default Message;