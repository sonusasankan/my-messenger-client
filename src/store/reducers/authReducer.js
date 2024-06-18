// authReducer.js
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";
const LOGOUT = "LOGOUT";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";

const initialAuthData = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
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
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
export { initialAuthData, SET_USER, UPDATE_USER, LOGOUT, REGISTER_SUCCESS, REGISTER_FAILURE };
