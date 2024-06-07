import { useContext, useEffect, useState, useReducer  } from "react";

//context
import { MessageContext, MessageDispatchContext  } from "./store";

//css
import './assets/css/app.scss';

//components
import ChatWindow from "./components/ui/ChatWindow";
import FriendsList from "./components/ui/FriendsList";

function App() {
  const messages = useContext(MessageContext);
  const [selectedFriend, setSelectedFriend] = useState('');
  // const [messages, setMessages] = useState([]);

  const messagesDispatch = useContext(MessageDispatchContext)

  const userId = '6661b169d3f85f84e657c5fc';


  useEffect(() => {
    // Fetch the most recent friend when the component mounts
    fetch(`http://localhost:5000/api/messages/recent/${userId}`)
      .then(response => response.json())
      .then(mostRecentFriend => {
        setSelectedFriend(mostRecentFriend);
      });
  }, []);

  useEffect(() => {
    if (selectedFriend) {
      const fetchMessages = async () => {
        messagesDispatch({ type: 'FETCH_INIT' });
        try {
          const response = await fetch(`http://localhost:5000/api/messages?sender=${userId}&receiver=${selectedFriend._id}`);
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
          sender: userId,
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
        setSelectedFriend(friend)
  }

  return (
      <div className="app-mychat">
        <div className="app-mychat-chatbox">
          <FriendsList selectFriend={handleSelectFriend} selected={selectedFriend}/>
          <ChatWindow onSendMessage={handleSendMessage} name={selectedFriend.username} messages={messages.data} />
        </div>
      </div>
  );
}

export default App;
