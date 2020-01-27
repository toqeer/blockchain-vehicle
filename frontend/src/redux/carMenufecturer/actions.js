import {
	GET_ALL_VEHICLES_ORDERS_MANUFACTURER,
	GET_ALL_VEHICLES_ORDERS_MANUFACTURER_LOADING,
	UPDATE_VEHICLE_ORDERS_STATUS_MANUFACTURER,
	UPDATE_VEHICLE_ORDERS_STATUS_MANUFACTURER_LOADING,
	GET_ALL_MANUFACTURER,
	GET_ALL_MANUFACTURER_LOADING,
	GET_ALL_MANUFACTURER_TRANSACTIONS_LOADING,
	GET_ALL_MANUFACTURER_TRANSACTIONS
} from '../../constants/actionTypes';
import { API_PATH } from '../../constants/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { customToast } from '../../components/common';
// GET ALL MANUFACTURER
export const getAllManufacturer = () => async (dispatch) => {
	dispatch(getAllManufacturerLoading());

	axios
		.get(
			`${API_PATH}/getAllManufacturers`,
			{
				// params: { orderStatus: 'PLACED' }
			}
		)
		.then((res) => {
			dispatch({
				type: GET_ALL_MANUFACTURER,
				payload: res.data.result
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_MANUFACTURER,
				payload: []
			});
		});
};

// GET ALL VEHICLES ORDERS MANUFACTURER
export const getAllVehiclesOrdersManufacturer = (params) => async (dispatch) => {
	dispatch(getAllVehiclesOrdersManufacturerLoading());

	axios
		.get(`${API_PATH}/getAllVehicleOrders_manufacturer`, {
			params: params
		})
		.then((res) => {
			dispatch({
				type: GET_ALL_VEHICLES_ORDERS_MANUFACTURER,
				payload: res.data.result
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_VEHICLES_ORDERS_MANUFACTURER,
				payload: []
			});
		});
};

// GET ALL TRANSACTIONS
export const getAllManufacturerTransactions = () => async (dispatch) => {
	dispatch(getAllManufacturerTransactionsLoading());

	axios
		.get(`${API_PATH}/getAllTransactions_manufacturer`)
		.then((res) => {
			dispatch({
				type: GET_ALL_MANUFACTURER_TRANSACTIONS,
				payload: res.data.result
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_MANUFACTURER_TRANSACTIONS,
				payload: []
			});
		});
};

// GET TRANSACTION DETAILD
// export const getTransactionDetails = (transactionInvoked) => async (dispatch) => {
// 	// dispatch(getTransactionDetailsLoading());

// 	axios
// 		.get(`${API_PATH}/getTransactionDetails`, { params: { transactionInvoked: transactionInvoked } })
// 		.then((res) => {
// 			dispatch({
// 				type: GET_ALL_TRANSACTION_DETAILS,
// 				payload: res.data.result
// 			});
// 		})
// 		.catch((err) => {
// 			dispatch({
// 				type: GET_ALL_TRANSACTION_DETAILS,
// 				payload: null
// 			});
// 		});
// };

// UPDATE VEHIVLE ORDER STATUS
export const updateVehicleOrderStatus = (data, handleClose) => async (dispatch) => {
	dispatch(updateVehicleOrderStatusLoading());

	axios
		.post(`${API_PATH}/updateVehicleOrderStatus_manufacturer`, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			dispatch(getAllVehiclesOrdersManufacturer({ orderStatusNot: 'DELIVERED' }));
			handleClose();
			toast.success(() => customToast(res.data.result), {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			});

			dispatch({
				type: UPDATE_VEHICLE_ORDERS_STATUS_MANUFACTURER,
				payload: res.data
			});
		})
		.catch((err) => {
			toast.error('Some thing went wronge', {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			});
			dispatch({
				type: UPDATE_VEHICLE_ORDERS_STATUS_MANUFACTURER,
				payload: []
			});
		});
};

export const getAllVehiclesOrdersManufacturerLoading = () => {
	return {
		type: GET_ALL_VEHICLES_ORDERS_MANUFACTURER_LOADING
	};
};
export const getAllManufacturerLoading = () => {
	return {
		type: GET_ALL_MANUFACTURER_LOADING
	};
};
export const updateVehicleOrderStatusLoading = () => {
	return {
		type: UPDATE_VEHICLE_ORDERS_STATUS_MANUFACTURER_LOADING
	};
};
export const getAllManufacturerTransactionsLoading = () => {
	return {
		type: GET_ALL_MANUFACTURER_TRANSACTIONS_LOADING
	};
};
