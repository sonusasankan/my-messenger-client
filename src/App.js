import { useContext, useEffect, useCallback, useState} from "react";
import { BrowserRouter as Router, Route, Redirect, Switch, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Network from './pages/Network.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx'; // Import your PrivateRoute component

import { baseURL } from "./env";

//context
import { MessageContext, MessageDispatchContext, SelectedFriendContext, SelectedFriendDispatchContext, AuthDispatchContext, AuthContext, FriendsDispatchContext  } from "./store";

//css
import './assets/css/app.scss';

//components
import Chat from "./pages/Chat.jsx"

function App() {
  const { user } = useContext(AuthContext);
  const messages = useContext(MessageContext);
  const selectedFriend = useContext(SelectedFriendContext);
  const selectedFriendDispatch = useContext(SelectedFriendDispatchContext);
  const [hasMore, setHasMore] = useState(true);

  const [currentMessage, setCurrentMessage] = useState(null);
  const [currentlyTyped, setCurrentlyTyped] = useState(null);


  const messagesDispatch = useContext(MessageDispatchContext);
  const friendsDispatch = useContext(FriendsDispatchContext);

  const fetchMessagesNew = useCallback(async () => {
    if (!selectedFriend) return;
    const response = await fetch(`${baseURL}/api/messages?sender=${user._id}&receiver=${selectedFriend._id}&limit=10`);
    const data = await response.json();
    messagesDispatch({ type: 'FETCH_SUCCESS', payload: data });
    setHasMore(data.length >= 10);
  }, [selectedFriend, messagesDispatch]);

  useEffect(() => {
    fetchMessagesNew();
  }, [fetchMessagesNew]);

  const loadMoreMessages = useCallback(async () => {
    if (!selectedFriend || !messages.data.length) return;
    
    const lastMessage = messages.data[0];
    const response = await fetch(`${baseURL}/api/messages/load?sender=${user}&receiver=${selectedFriend._id}&before=${lastMessage.timestamp}&limit=5`);
    const data = await response.json();

    // Check for duplicates and only add new messages
    const existingMessageIds = new Set(messages.data.map(msg => msg._id));
    const newMessages = data.filter(msg => !existingMessageIds.has(msg._id));
    
    if (newMessages.length < 5) {
      setHasMore(false);
    }
    
    // Dispatch new messages to the context
    messagesDispatch({ type: 'FETCH_SUCCESS', payload: [...newMessages, ...messages.data] });
}, [selectedFriend, user, messages, messagesDispatch]);


  const handleSendMessage = async (message) => {
    friendsDispatch({ type: 'UPDATE', payload: selectedFriend });
    try {
      const response = await fetch(`${baseURL}/api/messages`, {
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
    selectedFriendDispatch({ type: 'SET_SELECTED_FRIEND', payload: friend });
  };


  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
          path="/"
          element={
            <PrivateRoute>
              <Network />
            </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat 
                  selectFriend={handleSelectFriend} 
                  selected={selectedFriend || ''} 
                  onSendMessage={handleSendMessage}
                  name={selectedFriend ? selectedFriend.username : ''}
                  loadMoreMessages={loadMoreMessages}
                  hasMore={hasMore}
                  />
              </PrivateRoute>
              }
            />
        </Routes>
  </Router>
  );
}

export default App;
