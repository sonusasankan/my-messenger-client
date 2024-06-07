import { createContext, useReducer, useEffect, useState } from "react";

export const FriendsContext = createContext();

export const FriendsDispatchContext = createContext(null);

//Setting up an empty array for initial data
const initialData = [
    {
        _id: 1,
        username: "Bob",
      },
      {
        _id: 2,
        username: "Alice",
      },
      {
        _id: 3,
        username: "Charlie",
      },
];

//Reducer for fetch data from the API
const friendsReducer = (state, action) =>{
    switch (action.type) {
        case 'FETCH_SUCCESS':
          return {
            ...state,
            data: action.payload,
            loading: false,
            error: null
          };
        case 'FETCH_ERROR':
          return {
            ...state,
            data: [],
            loading: false,
            error: action.payload
          };
        default:
          return state;
      }
}

//Function to return the products and cart context provider.
export function ContextProvider({ children }) {
  const [friends, setFriends] = useState(initialData);

  return (
    <FriendsContext.Provider value={friends}>
            {children}
    </FriendsContext.Provider>
  );
}
