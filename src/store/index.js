import { createContext, useReducer, useEffect} from "react";

export const UserContext = createContext();
export const UserDispatchContext = createContext();

export const FriendsContext = createContext();
export const FriendsDispatchContext = createContext(null);

export const MessageContext = createContext();
export const MessageDispatchContext = createContext(null);

export const SelectedFriendContext = createContext();
export const SelectedFriendDispatchContext = createContext();

const selectedFriendData = {
  person: null
};

//User
const initialUser = {
  user: "6661b169d3f85f84e657c5fc",
  isAuthenticated: false,
};

// Action types
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const LOGOUT = "LOGOUT";
const SET_SELECTED_FRIEND = "SET_SELECTED_FRIEND";


//User Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

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
  const [userData, userDispatch] = useReducer(userReducer, initialUser);
  const [friendsData, friendsDispatch] = useReducer(friendsReducer, initialData);
  const [messages, messagesDispatch] = useReducer(
    messageReducer,
    initialMessages
  );
  const [selectedFriend, selectedFriendDispatch] = useReducer(selectedFriendReducer, selectedFriendData);

  const { user } = userData;
  const { friendsList } = friendsData;
  const { person } = selectedFriend;

  useEffect(() => {
    // Fetch the most recent friend when the component mounts
    fetch(`http://localhost:5000/api/messages/recent/${user}`)
      .then((response) => response.json())
      .then((mostRecentFriend) => {
        selectedFriendDispatch({ type: SET_SELECTED_FRIEND, payload: mostRecentFriend });
      });
  }, [user]);

  useEffect(()=>{
    fetch(`http://localhost:5000/api/friends/${user}`)
    .then(response => response.json())
    .then(data => friendsDispatch({ type: 'FETCH_SUCCESS', payload: data}))
  })

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={userDispatch}>
        <FriendsContext.Provider value={friendsList}>
          <FriendsDispatchContext.Provider value={friendsDispatch}>
            <MessageContext.Provider value={messages}>
              <MessageDispatchContext.Provider value={messagesDispatch}>
                <SelectedFriendContext.Provider value={person}>
                    <SelectedFriendDispatchContext.Provider value={selectedFriendDispatch}>
                      {children}
                    </SelectedFriendDispatchContext.Provider>
                </SelectedFriendContext.Provider>
              </MessageDispatchContext.Provider>
            </MessageContext.Provider>
          </FriendsDispatchContext.Provider>
        </FriendsContext.Provider>
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
