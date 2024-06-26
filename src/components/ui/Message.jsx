import { useContext} from 'react';
import { AuthContext } from "../../store";

function Message({ message, sender }) {
  const authState = useContext(AuthContext);
  const { user } = authState;

  return (
    <div className={`app-mychat-chatbox_message-item ${sender === user._id? "right": "left"}`}>
      <p className="app-mychat-chatbox-message-text">{message}</p>
    </div>
  );
}

export default Message;