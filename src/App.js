import { useContext, useEffect, useState, useReducer  } from "react";

//context
import { MessageContext, MessageDispatchContext, UserContext, SelectedFriendContext, SelectedFriendDispatchContext  } from "./store";

//css
import './assets/css/app.scss';

//components
import ChatWindow from "./components/ui/ChatWindow";
import FriendsList from "./components/ui/FriendsList";

function App() {
  const user = useContext(UserContext)
  const messages = useContext(MessageContext);
  const selectedFriend = useContext(SelectedFriendContext);
  const selectedFriendDispatch = useContext(SelectedFriendDispatchContext);
  // const [messages, setMessages] = useState([]);

  const messagesDispatch = useContext(MessageDispatchContext)

  useEffect(() => {
    if (selectedFriend) {
      const fetchMessages = async () => {
        messagesDispatch({ type: 'FETCH_INIT' });
        try {
          const response = await fetch(`http://localhost:5000/api/messages?sender=${user}&receiver=${selectedFriend._id}`);
          const data = await response.json();
          messagesDispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (error) {
          messagesDispatch({ type: 'FETCH_FAILURE', payload: error });
        }
      };
      fetchMessages();
    }
  }, [selectedFriend]);


  const handleSendMessage = async (message) => {
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: user,
          receiver: selectedFriend._id,
          message
        })
      });
      const newMessage = await response.json();
      messagesDispatch({ type: 'POST_SUCCESS', payload: newMessage });
    } catch (error) {
      messagesDispatch({ type: 'POST_FAILURE', payload: error });
    }
  };

  const handleSelectFriend = (friend) => {
        selectedFriendDispatch({ type: 'SET_SELECTED_FRIEND', payload: friend});
  }

  return (
      <div className="app-mychat">
        <div className="app-mychat-chatbox">
          <FriendsList selectFriend={handleSelectFriend} selected={selectedFriend ? selectedFriend: ''}/>
          <ChatWindow onSendMessage={handleSendMessage} name={selectedFriend ? selectedFriend.username: ''} messages={messages.data} />
        </div>
      </div>
  );
}

export default App;
