import {
  GET_ALL_TRANSFER_REQUESTS,
  GET_ALL_TRANSFER_REQUESTS_LOADING,
  APPROVE_TRANSFER_REQUESTS_LOADING,
  APPROVE_TRANSFER_REQUESTS,
  GET_ALL_LISCENCE_ORDERS,
  GET_ALL_LISCENCE_ORDERS_LOADING,
  GET_ALL_LISCENCE,
  GET_ALL_LISCENCE_LOADING,
  GET_ALL_MINISTORY,
  // UPDATE_LICENCE_ORDER_STATUS,
  GET_UNAPPROVED_VEHICLES,
  GET_UNAPPROVED_VEHICLES_LOADING,
  APPROVE_VEHICLE,
  APPROVE_VEHICLE_LOADING,
  GET_ALL_MINISTORY_TRANSACTIONS,
  GET_ALL_MINISTORY_TRANSACTIONS_LOADING,
  GET_ALL_VEHICLE,
  GET_ALL_VEHICLE_LOADING
} from "../../constants/actionTypes";
import { API_PATH } from "../../constants/api";
import axios from "axios";
import { toast } from "react-toastify";
import { customToast } from "../../components/common";

// GET ALL VEHICLES ORDERS MANUFACTURER
export const getAllTransferRequests = () => async dispatch => {
  dispatch(getAllTransferRequestsLoading());

  axios
    .get(`${API_PATH}/getAllTransferRequests`, {})
    .then(res => {
      dispatch({
        type: GET_ALL_TRANSFER_REQUESTS,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_TRANSFER_REQUESTS,
        payload: []
      });
    });
};
// GET ALL MINISTRY
export const getAllMinistory = () => async dispatch => {
  // dispatch(getAllMinistoryLoading());
  console.log("calling");

  axios
    .get(`${API_PATH}/getAllMinistory`, {})
    .then(res => {
      console.log("calling", res.data.result);

      dispatch({
        type: GET_ALL_MINISTORY,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_MINISTORY,
        payload: []
      });
    });
};
// getAllLicenseOrders_ministoryComments
export const getAllLiscenceOrders = () => async dispatch => {
  dispatch(getAllLiscenceOrdersLoading());

  axios
    .get(`${API_PATH}/getAllLicenseOrders_ministory`, {
      params: {
        licenseOrderStatus: "REQUESTED"
      }
    })
    .then(res => {
      dispatch({
        type: GET_ALL_LISCENCE_ORDERS,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_LISCENCE_ORDERS,
        payload: []
      });
    });
};

export const getAllLiscence = () => async dispatch => {
  dispatch(getAllLiscenceLoading());

  axios
    .get(`${API_PATH}/getAllLicenses_ministory`, {
      params: {
        licenseOrderStatus: "REQUESTED"
      }
    })
    .then(res => {
      dispatch({
        type: GET_ALL_LISCENCE,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_LISCENCE,
        payload: []
      });
    });
};

// GET UNAPPROVED VEHICLES
export const getUnApprovedVehivles = () => async dispatch => {
  dispatch(getUnApprovedVehivlesLoading());

  axios
    .get(`${API_PATH}/getUnApprovedVehicles`, {})
    .then(res => {
      dispatch({
        type: GET_UNAPPROVED_VEHICLES,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_UNAPPROVED_VEHICLES,
        payload: []
      });
    });
};

// APPROVE VEHICLES
export const approveVehicle = data => async dispatch => {
  dispatch(approveVehicleLoading());

  axios
    .post(`${API_PATH}/approveVehicle`, data)
    .then(res => {
      // dispatch(getUnApprovedVehivles());
      dispatch({
        type: APPROVE_VEHICLE,
        payload: res.data.result
      });

      toast.success("Successfully approved", {
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
        type: APPROVE_VEHICLE,
        payload: []
      });
      toast.error("Something went wronge", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    });
};

export const getAllVehicle = () => async dispatch => {
  dispatch(getAllVehicleLoading());

  axios
    .get(`${API_PATH}/getAllVehicle`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      dispatch({
        type: GET_ALL_VEHICLE,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_VEHICLE,
        payload: []
      });
    });
};
// APPROVE TRANSFER REQUEST
export const approveTransferRequest = data => async dispatch => {
  dispatch(approveTransferRequestLoading());

  axios
    .post(`${API_PATH}/approveTransferVehicle`, data)
    .then(res => {
      dispatch(getAllTransferRequests());
      dispatch({
        type: APPROVE_TRANSFER_REQUESTS,
        payload: res.data.result
      });
      toast.success("Successfully approved", {
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
        type: APPROVE_TRANSFER_REQUESTS,
        payload: []
      });
      toast.error("Something went wronge", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    });
};
export const cancleLiscence = data => async dispatch => {
  // dispatch(cancleLiscenceLoading());

  axios
    .post(`${API_PATH}/revokeLicense`, data)
    .then(res => {
      dispatch(getAllLiscence());
      dispatch({
        type: APPROVE_TRANSFER_REQUESTS,
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
        type: APPROVE_TRANSFER_REQUESTS,
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

export const unRevokeLiscence = data => async dispatch => {
  // dispatch(cancleLiscenceLoading());

  axios
    .post(`${API_PATH}/unRevokeLicense`, data)
    .then(res => {
      dispatch(getAllLiscence());

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

export const updateLicenseOrderStatus = data => async dispatch => {
  // dispatch(cancleLiscenceLoading());

  axios
    .post(`${API_PATH}/updateLicenseOrderStatus`, data)
    .then(res => {
      // dispatch({
      // 	type: UPDATE_LICENCE_ORDER_STATUS,
      // 	payload: res.data.result
      // });
      dispatch(getAllLiscenceOrders());
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
      // dispatch({
      // 	type: UPDATE_LICENCE_ORDER_STATUS,
      // 	payload: []
      // });
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

// GET ALL TRANSACTIONS
export const getAllMinistoryTransactions = () => async dispatch => {
  dispatch(getAllMinistoryTransactionsLoading());

  axios
    .get(`${API_PATH}/getAllTransactions_ministory`)
    .then(res => {
      dispatch({
        type: GET_ALL_MINISTORY_TRANSACTIONS,
        payload: res.data.result
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_MINISTORY_TRANSACTIONS,
        payload: []
      });
    });
};

// GET ALL VEHICLES LOADING
export const getAllTransferRequestsLoading = () => {
  return {
    type: GET_ALL_TRANSFER_REQUESTS_LOADING
  };
};

// GET ALL VEHICLES LOADING
export const approveTransferRequestLoading = () => {
  return {
    type: APPROVE_TRANSFER_REQUESTS_LOADING
  };
};

// GET ALL VEHICLES LOADING
export const getAllLiscenceOrdersLoading = () => {
  return {
    type: GET_ALL_LISCENCE_ORDERS_LOADING
  };
};

// GET ALL VEHICLES LOADING
export const getAllLiscenceLoading = () => {
  return {
    type: GET_ALL_LISCENCE_LOADING
  };
};
// GET UNAPPROVED VEHICLES LOADING
export const getUnApprovedVehivlesLoading = () => {
  return {
    type: GET_UNAPPROVED_VEHICLES_LOADING
  };
};
// GET UNAPPROVED VEHICLES LOADING
export const approveVehicleLoading = () => {
  return {
    type: APPROVE_VEHICLE_LOADING
  };
};
export const getAllMinistoryTransactionsLoading = () => {
  return {
    type: GET_ALL_MINISTORY_TRANSACTIONS_LOADING
  };
};
export const getAllVehicleLoading = () => {
  return {
    type: GET_ALL_VEHICLE_LOADING
  };
};
