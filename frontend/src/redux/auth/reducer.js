import {
  USER_CREATED,
  SET_CURRENT_USER,
  LOGOUT_USER,
  SIGN_IN_LOADING,
  SIGN_UP_USER_LOADING,
  SIGN_UP_USER
} from "../../constants/actionTypes";
import { decodeToken } from "../../utils/helpingFunctions";
const initState = localStorage.getItem("token")
  ? {
      isAuthenticated: true,
      user: decodeToken(localStorage.getItem("token")),
      userType: localStorage.getItem("userType")
    }
  : {
      isAuthenticated: false,
      user: null,
      userType: null,
      signInLoading: false,
      signUpLoading:false,
    };

export default function(state = initState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        userType: action.payload.userType
      };
    // case USER_DETAILS:
    //   return { ...state, userDetails: action.payload };
    case USER_CREATED:
      return { ...state, message: "success" };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      return { isAuthenticated: false, user: null, userType: null };
    case SIGN_IN_LOADING:
      return {
        ...state,
        signInLoading: action.payload
      };
    case SIGN_UP_USER_LOADING:
      return {
        ...state,
        signUpLoading: true
      };
    case SIGN_UP_USER:
      return {
        ...state,
        signUpLoading: false
      };
    default:
      return state;
  }
}
