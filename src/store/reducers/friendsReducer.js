
//Setting up an empty array for initial data
const initialFriendsData = {
    friendsList: [
    ],
    recent: "",
    loading: true,
    dataLoaded: false,
    error: null
  };

//Reducer for fetch data from the API
const friendsReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_START':
      return {
        ...state,
        loading: true,
        dataLoaded: false
      };
      case "FETCH_SUCCESS":
        return {
          ...state,
          friendsList: action.payload,
          loading: false,
          dataLoaded: true,
          error: null,
        };
      case "FETCH_ERROR":
        return {
          ...state,
          friendsList: [],
          loading: false,
          dataLoaded: true,
          error: action.payload,
        };
      case 'ADD_FRIEND':
      return {
        ...state,
        friendsList: [...state.friendsList, action.payload],
      };
      case 'REMOVE_FRIEND':
      return {
        ...state,
        friendsList: state.friendsList.filter(friend => friend._id !== action.payload._id),
      };
      case 'UPDATE':
      return {
        ...state,
        friendsList: [
            action.payload,
            ...state.friendsList.filter(friend => friend._id !== action.payload._id)
        ],
      };
      default:
        return state;
    }
  };

export default friendsReducer;
export { initialFriendsData };
