import axios from "axios";
import { API_PATH } from "../../../constants/api";
import {
  GET_ALL_VEHICLES,
  GET_ALL_VEHICLES_LOADING,
  REGISTER_VEHICLE_LOADING,
  REGISTER_VEHICLE,
  PLACE_VEHICLE_ORDER,
  PLACE_VEHICLE_ORDER_LOADING,
  TRANSFER_VEHICLE_LOADING,
  TRANSFER_VEHICLE,
  GET_USER_VEHICLE_ORDERS,
  GET_USER_VEHICLE_ORDERS_LOADING,
  PLACE_LISCENCE_ORDER,
  PLACE_LISCENCE_ORDER_LOADING,
  GET_ALL_TRANSFER_REQUEST_USER_LOADING,
  GET_ALL_TRANSFER_REQUEST_USER,
  TRANSFER_REQUETS_DATA,
  APPROVE_USER_TRANSFER_REQUESTS,
  APPROVE_USER_TRANSFER_REQUESTS_LOADING,
  REJECT_USER_TRANSFER_REQUESTS,
  REJECT_USER_TRANSFER_REQUESTS_LOADING,
  GET_ALL_USER_TRANSACTIONS_LOADING,
  GET_ALL_USER_TRANSACTIONS,
  GET_ALL_TRANSACTION_DETAILS,
  GET_VEHICLE_TRANSACTION,
  GET_VEHICLE_TAKAFUL_RECORD,
  GET_VEHICLE_FAHAS_RECORD
} from "../../../constants/actionTypes";
import { toast } from "react-toastify";
import { customToast } from "../../../components/common";

// GET ALL VEHICLES
export const getAllVehicles = () => async dispatch => {
  dispatch(getAllVehiclesLoading());

  axios
    .get(`${API_PATH}/getAllVehicles`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      dispatch({
        type: GET_ALL_VEHICLES,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_VEHICLES,
        payload: []
      });
    });
};

// ISSUE OF LISCENCE
export const placeLiscenceOrder = data => async dispatch => {
  dispatch(placeLiscenceOrderLoading());

  axios
    .post(`${API_PATH}/placeLicenseOrder`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      toast.success(() => customToast(res.data.result), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      dispatch({
        type: PLACE_LISCENCE_ORDER,
        payload: res.data
      });
    })
    .catch(err => {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      dispatch({
        type: PLACE_LISCENCE_ORDER,
        payload: []
      });
    });
};

// VEHICLE REGISTERATION
export const registerVehicle = data => async dispatch => {
  dispatch(registerVehicleLoading());

  axios
    .post(`${API_PATH}/registerVehicle`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      toast.success(() => customToast(res.data.result), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      dispatch({
        type: REGISTER_VEHICLE,
        payload: res.data
      });
    })
    .catch(err => {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      dispatch({
        type: REGISTER_VEHICLE,
        payload: []
      });
    });
};
// PLACE_VEHICLE_ORDER
export const placeVehicleOrder = data => async dispatch => {
  dispatch(placeVehicleOrderLoading());

  axios
    .post(`${API_PATH}/placeVehicleOrder`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      toast.success(() => customToast(res.data.result), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      dispatch({
        type: PLACE_VEHICLE_ORDER,
        payload: res.data
      });
    })
    .catch(err => {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      dispatch({
        type: PLACE_VEHICLE_ORDER,
        payload: []
      });
    });
};
// TRANSFER_VEHICLE
export const transferVehicle = data => async dispatch => {
  dispatch(transferVehicleLoading());

  axios
    .post(`${API_PATH}/transferVehicle`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      toast.success(() => customToast(res.data.result), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      dispatch({
        type: TRANSFER_VEHICLE,
        payload: res.data
      });
    })
    .catch(err => {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      dispatch({
        type: TRANSFER_VEHICLE,
        payload: []
      });
    });
};

// GET_USER_VEHICLE_ORDERS
export const getUserVehicleOrders = () => async dispatch => {
  dispatch(getUserVehicleOrdersLoading());

  axios
    .get(`${API_PATH}/getAllVehicleOrders_user`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      dispatch({
        type: GET_USER_VEHICLE_ORDERS,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_USER_VEHICLE_ORDERS,
        payload: []
      });
    });
};

// GET ALL transfer requests
export const getAllUserTransferRequests = () => async dispatch => {
  dispatch(getAllUserTransferRequestsLoading());

  axios
    .get(`${API_PATH}/getAllTransferRequests_user`, {})
    .then(res => {
      dispatch({
        type: TRANSFER_REQUETS_DATA,
        payload: res.data.result
      });
      dispatch({
        type: GET_ALL_TRANSFER_REQUEST_USER,
        payload: []
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_TRANSFER_REQUEST_USER,
        payload: []
      });
    });
};
//APPROVE TRANSFER REQUESTS
export const approveUserTransferRequest = data => async dispatch => {
  dispatch(approveUserTransferRequestLoading());

  axios
    .post(`${API_PATH}/acceptTransferVehicle`, data)
    .then(res => {
      dispatch(getAllUserTransferRequests());
      dispatch({
        type: APPROVE_USER_TRANSFER_REQUESTS,
        payload: res.data.result
      });
      toast.success(() => customToast(res.data.result), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    })
    .catch(err => {
      dispatch({
        type: APPROVE_USER_TRANSFER_REQUESTS,
        payload: []
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

//REJECT TRANSFER REQUESTS
export const rejectUserTransferRequest = data => async dispatch => {
  dispatch(rejectUserTransferRequestLoading());

  axios
    .post(`${API_PATH}/cancelTransferVehicle`, data)
    .then(res => {
      dispatch(getAllUserTransferRequests());
      dispatch({
        type: REJECT_USER_TRANSFER_REQUESTS,
        payload: res.data.result
      });
      toast.success(() => customToast(res.data.result), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    })
    .catch(err => {
      dispatch({
        type: REJECT_USER_TRANSFER_REQUESTS,
        payload: []
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
//GET ALL USER TRANSACTIONS
export const getAllUserTransactions = () => async dispatch => {
  dispatch(getAllUserTransactionsLoading());

  axios
    .get(`${API_PATH}/getAllTransactions_user`, {})
    .then(res => {
      dispatch({
        type: GET_ALL_USER_TRANSACTIONS,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_USER_TRANSACTIONS,
        payload: []
      });
    });
};
// getTransactionDetails
export const getTransactionDetails = transactionInvoked => async dispatch => {
  // dispatch(getTransactionDetailsLoading());

  axios
    .get(`${API_PATH}/getTransactionDetails`, {
      params: { transactionInvoked: transactionInvoked }
    })
    .then(res => {
      dispatch({
        type: GET_ALL_TRANSACTION_DETAILS,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_TRANSACTION_DETAILS,
        payload: null
      });
    });
};

//getAllVehicleTransactions
export const getVehicleTransaction = vIn => async dispatch => {
  // dispatch(getTransactionDetailsLoading());

  axios
    .get(`${API_PATH}/getAllVehicleTransactions`, { params: { vIn: vIn } })
    .then(res => {
      dispatch({
        type: GET_VEHICLE_TRANSACTION,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_VEHICLE_TRANSACTION,
        payload: null
      });
    });
};

// Get Vehicle Takaful Record
export const getVehicleTakafulRecord = vIn => async dispatch => {
  // dispatch(getTransactionDetailsLoading());

  axios
    .get(`${API_PATH}/getVehicleTakafulRecord`, { params: { vIn: vIn } })
    .then(res => {
      dispatch({
        type: GET_VEHICLE_TAKAFUL_RECORD,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_VEHICLE_TAKAFUL_RECORD,
        payload: null
      });
    });
};
// Get Vehicle Takaful Record
export const getVehicleFahasRecord = vIn => async dispatch => {
  // dispatch(getTransactionDetailsLoading());

  axios
    .get(`${API_PATH}/getVehicleFahasRecord`, { params: { vIn: vIn } })
    .then(res => {
      dispatch({
        type: GET_VEHICLE_FAHAS_RECORD,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_VEHICLE_FAHAS_RECORD,
        payload: null
      });
    });
};

// GET ALL VEHICLES LOADING
export const getAllVehiclesLoading = () => {
  return {
    type: GET_ALL_VEHICLES_LOADING
  };
};

// GET ALL VEHICLES LOADING
export const registerVehicleLoading = () => {
  return {
    type: REGISTER_VEHICLE_LOADING
  };
};

// PLACE_VEHICLE_LOADING
export const placeVehicleOrderLoading = () => {
  return {
    type: PLACE_VEHICLE_ORDER_LOADING
  };
};
// PLACE_VEHICLE_LOADING
export const transferVehicleLoading = () => {
  return {
    type: TRANSFER_VEHICLE_LOADING
  };
};
// PLACE_VEHICLE_LOADING
export const getUserVehicleOrdersLoading = () => {
  return {
    type: GET_USER_VEHICLE_ORDERS_LOADING
  };
};
// PLACE_VEHICLE_LOADING
export const placeLiscenceOrderLoading = () => {
  return {
    type: PLACE_LISCENCE_ORDER_LOADING
  };
};

// GET ALL TRANSFER REQUESTS LOADING
export const getAllUserTransferRequestsLoading = () => {
  return {
    type: GET_ALL_TRANSFER_REQUEST_USER_LOADING
  };
};
// approve transfer vehicle
export const approveUserTransferRequestLoading = () => {
  return {
    type: APPROVE_USER_TRANSFER_REQUESTS_LOADING
  };
};

// reject transfer vehicle
export const rejectUserTransferRequestLoading = () => {
  return {
    type: REJECT_USER_TRANSFER_REQUESTS_LOADING
  };
};
export const getAllUserTransactionsLoading = () => {
  return {
    type: GET_ALL_USER_TRANSACTIONS_LOADING
  };
};
