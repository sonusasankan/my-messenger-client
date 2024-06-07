import { useContext, useEffect, useState  } from "react";

//css
import './assets/css/app.scss';

//components
import ChatWindow from "./components/ui/ChatWindow";
import FriendsList from "./components/ui/FriendsList";

function App() {
  const [selectedFriend, setSelectedFriend] = useState('');

  const handleSendMessage = (message) => {
    console.log(message);
  };

  const handleSelectFriend = (friend) => {
        setSelectedFriend(friend)
  }

  return (
      <div className="app-mychat">
        <div className="app-mychat-chatbox">
          <FriendsList selectFriend={handleSelectFriend} selected={selectedFriend}/>
          <ChatWindow onSendMessage={handleSendMessage} name={selectedFriend.username} />
        </div>
      </div>
  );
}

export default App;
