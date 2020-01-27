import axios from "axios";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import { API_PATH } from "../../constants/api";
import {
  USER_CREATED,
  SET_CURRENT_USER,
  SIGN_UP_USER_LOADING,
  LOGOUT_USER,
  SIGN_IN_LOADING,
  SIGN_UP_USER
} from "../../constants/actionTypes";
import { setAuthToken } from "../../utils/helpingFunctions";
import { history } from "../../utils/history";

// SIGN UP USER
export const registerUser = data => async dispatch => {
  dispatch(registerLoading());

  axios
    .post(`${API_PATH}/signUp`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      dispatch({
        type: USER_CREATED
	  });
	  dispatch({
        type: SIGN_UP_USER
      });

      toast.success("You have successfully registered", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      history.push("/login");
    })
    .catch(err => {
		dispatch({
			type: SIGN_UP_USER
		  });
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    });
};

// LOGIN USER
export const loginUser = data => async dispatch => {
  dispatch({
    type: SIGN_IN_LOADING,
    payload: true
  });
  axios
    .post(`${API_PATH}/login`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      dispatch({
        type: SIGN_IN_LOADING,
        payload: false
      });
      localStorage.setItem("token", res.data.result.jwt);
      localStorage.setItem("userType", res.data.result.userType);
      const decode = jwt.decode(res.data.result.jwt);

      setAuthToken(res.data.result.jwt);

      dispatch({
        type: SET_CURRENT_USER,
        payload: { user: decode, userType: res.data.result.userType }
      });

      toast.success("Login successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      switch (
        res.data.result.userType
        // case 'USER':
        // 	history.push('/vehicle-registeration');
        // 	break;
        // case 'MANUFACTURER':
        // 	history.push('/car-manufacturer');
        // 	break;
        // case 'MINISTORY':
        // 	history.push('/interior-ministory');
        // 	break;
        // default:
        // 	break;
      ) {
      }
    })
    .catch(err => {
      dispatch({
        type: SIGN_IN_LOADING,
        payload: false
      });
      toast.error("Incorrect username or password.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    });
};

// LOGOUT USER
export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

export const registerLoading = () => {
  return {
    type: SIGN_UP_USER_LOADING
  };
};
