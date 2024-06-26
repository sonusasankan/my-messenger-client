import { createContext, useReducer, useEffect, useState, useContext} from "react";
import { baseURL } from "../env";

//Services
import { userLogin , fetchFriendlist, fetchAllUsers } from "../services";

//reducers
import authReducer, { initialAuthData, SET_USER } from "./reducers/authReducer";
import friendsReducer, { initialFriendsData } from "./reducers/friendsReducer";

export const AuthContext = createContext('AuthContext');
export const AuthDispatchContext = createContext('AuthDispatchContext');

// export const UserContext = createContext();
// export const UserDispatchContext = createContext();

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
       return {
        ...state,
        [action.payload.friendID]: action.payload.message
       }
    case 'REMOVE_CURRENT_MESSAGE': {
    const { [action.payload.friendID]: removedMessage, ...newState } = state;
    return newState;
  }
    default:
      return state;
  }
};

const SET_SELECTED_FRIEND = "SET_SELECTED_FRIEND";


//Initial message data
export const initialMessages = {
  messages: [],
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
        messages: action.payload,
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
        messages: [...state.messages, action.payload],
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

//Function to return the initial data.
export function ContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [authState, authDispatch] = useReducer(authReducer, initialAuthData);
  const [friendsData, friendsDispatch] = useReducer(friendsReducer, initialFriendsData);
  const [messages, messagesDispatch] = useReducer(
    messageReducer,
    initialMessages
  );
  const [selectedFriend, selectedFriendDispatch] = useReducer(selectedFriendReducer, selectedFriendData);
  const [currentMessage, CurrentMessageDispatch] = useReducer(currentMessageReducer, currentMessagedata);


  const { user, isAuthenticated, isNewUser } = authState;

  // const { friendsList } = friendsData;
  const { person } = selectedFriend;
  
  //Auto user login if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const getUser = async () => {
        try {
          const result = await userLogin(token);
          authDispatch({ type: SET_USER, payload: result });
          setLoading(false);
        } catch (err) {
          localStorage.removeItem('token');
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
      getUser();
    } else {
      setLoading(false);
    }

  }, []);

  //Fetch friends list for initial data.
  useEffect(() => {
    if (isAuthenticated && user.hasFriends) {
      friendsDispatch({ type: 'FETCH_START' });
      const getFriends = async () => {
        try {
          const result = await fetchFriendlist(user._id);
          friendsDispatch({ type: 'FETCH_SUCCESS', payload: result })
        } catch (err) {
          friendsDispatch({ type: 'FETCH_ERROR', payload: err.message })
        }
      }
      getFriends();
    }
  }, [isAuthenticated, user, friendsDispatch]);
  

  useEffect(() => {
    if (isAuthenticated && user.hasMessages) {
      //fetch init
      fetch(`${baseURL}/api/messages/recent/${user._id}`)
        .then((response) => response.json())
        .then((mostRecentFriend) => {
          selectedFriendDispatch({ type: 'SET_SELECTED_FRIEND', payload: mostRecentFriend });
        });
    }
  }, [isAuthenticated, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={authDispatch}>
          <FriendsContext.Provider value={friendsData}>
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

export const useFriendsState = () => useContext(FriendsContext);
export const useFriendsDispatch = () => useContext(FriendsDispatchContext);