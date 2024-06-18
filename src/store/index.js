import { createContext, useReducer, useEffect, useState} from "react";

//reducers
import authReducer, { initialAuthData, SET_USER } from "./reducers/authReducer";

export const AuthContext = createContext();
export const AuthDispatchContext = createContext();

export const UserContext = createContext();
export const UserDispatchContext = createContext();

export const FriendsContext = createContext();
export const FriendsDispatchContext = createContext(null);

export const MessageContext = createContext();
export const MessageDispatchContext = createContext(null);

export const SelectedFriendContext = createContext();
export const SelectedFriendDispatchContext = createContext();

export const CurrentMessageContext = createContext();
export const CurrentMessageContextDispatch = createContext();

const selectedFriendData = {
  person: null
};

const currentMessagedata = {};
const currentMessageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_MESSAGE':
       return action.payload;
    default:
      return state;
  }
};

const SET_SELECTED_FRIEND = "SET_SELECTED_FRIEND";

//Setting up an empty array for initial data
const initialData = {
  friendsList: [
    {
      _id: "6661b169d3f85f84e657c5fd",
      username: "Bob",
    },
    // {
    //   _id: '6661b169d3f85f84e657c5fc',
    //   username: "Alice",
    // },
    {
      _id: "6661b169d3f85f84e657c5fe",
      username: "Charlie",
    },
  ],
  recent: "",
  loading: false,
  error: null,
};

//Reducer for fetch data from the API
const friendsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        friendsList: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        friendsList: [],
        loading: false,
        error: action.payload,
      };
    case 'ADD_FRIEND':
    return {
      ...state,
      friendsList: [...state.friendsList, action.payload],
    };
    default:
      return state;
  }
};
//Initial message data
export const initialMessages = {
  data: [],
  loading: false,
  error: null,
};

//Reducer for get and post messages
export const messageReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "POST_SUCCESS":
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
        error: null,
      };
    case "POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Selected Friend Reducer function
const selectedFriendReducer = (state, action) => {
  switch (action.type) {
    case SET_SELECTED_FRIEND:
      return {
        ...state,
        person: action.payload,
      };
    default:
      return state;
  }
};

//Function to return the products and cart context provider.
export function ContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [authState, authDispatch] = useReducer(authReducer, initialAuthData);
  const [friendsData, friendsDispatch] = useReducer(friendsReducer, initialData);
  const [messages, messagesDispatch] = useReducer(
    messageReducer,
    initialMessages
  );
  const [selectedFriend, selectedFriendDispatch] = useReducer(selectedFriendReducer, selectedFriendData);
  const [currentMessage, CurrentMessageDispatch] = useReducer(currentMessageReducer, currentMessagedata);


  const { user, isAuthenticated } = authState;
  const { friendsList } = friendsData;
  const { person } = selectedFriend;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          authDispatch({ type: SET_USER, payload: data });
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }    
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetch(`http://localhost:5000/api/friends/${user._id}`)
  //       .then((response) => response.json())
  //       .then((data) => friendsDispatch({ type: 'FETCH_SUCCESS', payload: data }))
  //       .catch((error) => friendsDispatch({ type: 'FETCH_ERROR', payload: error }));
  //   }
  // }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && selectedFriend.person) {
      CurrentMessageDispatch({
        type: 'SET_CURRENT_MESSAGE',
        payload: { [selectedFriend.person._id]: { message: '' } },
      });
    }
  }, [isAuthenticated, selectedFriend]);

  useEffect(() => {
    if (isAuthenticated && selectedFriend.person) {
      fetch(`http://localhost:5000/api/messages/recent/${user._id}`)
        .then((response) => response.json())
        .then((mostRecentFriend) => {
          selectedFriendDispatch({ type: 'SET_SELECTED_FRIEND', payload: mostRecentFriend });
        });
    }
  }, [isAuthenticated, user, selectedFriend]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={authDispatch}>
          <FriendsContext.Provider value={friendsList}>
            <FriendsDispatchContext.Provider value={friendsDispatch}>
              <MessageContext.Provider value={messages}>
                <MessageDispatchContext.Provider value={messagesDispatch}>
                  <SelectedFriendContext.Provider value={person}>
                      <SelectedFriendDispatchContext.Provider value={selectedFriendDispatch}>
                        <CurrentMessageContext.Provider value={currentMessage}>
                          <CurrentMessageContextDispatch.Provider value={CurrentMessageDispatch}>
                            {children}
                          </CurrentMessageContextDispatch.Provider>
                        </CurrentMessageContext.Provider>
                      </SelectedFriendDispatchContext.Provider>
                  </SelectedFriendContext.Provider>
                </MessageDispatchContext.Provider>
              </MessageContext.Provider>
            </FriendsDispatchContext.Provider>
          </FriendsContext.Provider>
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
