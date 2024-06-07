import { createContext, useReducer, useEffect, useState } from "react";

export const FriendsContext = createContext();
export const FriendsDispatchContext = createContext(null);

export const MessageContext = createContext();
export const MessageDispatchContext = createContext(null);

//Setting up an empty array for initial data
const initialData = [
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
];

//Reducer for fetch data from the API
const friendsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        data: [],
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

//Function to return the products and cart context provider.
export function ContextProvider({ children }) {
  const [friends, friendsDispatch] = useReducer(friendsReducer, initialData);
  const [messages, messagesDispatch] = useReducer(
    messageReducer,
    initialMessages
  );

  return (
    <FriendsContext.Provider value={friends}>
      <FriendsDispatchContext.Provider value={friendsDispatch}>
        <MessageContext.Provider value={messages}>
          <MessageDispatchContext.Provider value={messagesDispatch}>
            {children}
          </MessageDispatchContext.Provider>
        </MessageContext.Provider>
      </FriendsDispatchContext.Provider>
    </FriendsContext.Provider>
  );
}
