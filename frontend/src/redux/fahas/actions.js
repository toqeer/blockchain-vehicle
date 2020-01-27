import React from 'react';
import {
	GET_ALL_FAHAS_DATA,
	GET_ALL_FAHAS_DATA_LOADING,
	GET_ALL_FAHAS_VEHICLES,
	GET_ALL_FAHAS_VEHICLES_LOADING,
	ADD_FAHAS_RECORD_LOADING,
	GET_ALL_FAHAS_TRANSACTIONS,
	GET_ALL_FAHAS_TRANSACTIONS_LOADING
} from '../../constants/actionTypes';
import { API_PATH } from '../../constants/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { customToast } from '../../components/common';

// GET ALL VEHICLES ORDERS MANUFACTURER
export const getAllFahasRecord = () => async (dispatch) => {
	dispatch({
		type: GET_ALL_FAHAS_DATA_LOADING,
		payload: true
	});
	axios
		.get(`${API_PATH}/getAllVehicle`)
		.then((res) => {
			dispatch({
				type: GET_ALL_FAHAS_DATA_LOADING,
				payload: false
			});
			dispatch({
				type: GET_ALL_FAHAS_DATA,
				payload: res.data.result
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_FAHAS_DATA_LOADING,
				payload: false
			});
		});
};

// GET ALL VEHICLES ORDERS MANUFACTURER
export const getAllFahasVehicles = () => async (dispatch) => {
	dispatch({
		type: GET_ALL_FAHAS_VEHICLES_LOADING,
		payload: true
	});
	axios
		.get(`${API_PATH}/getAllFahasRecord`)
		.then((res) => {
			dispatch({
				type: GET_ALL_FAHAS_VEHICLES_LOADING,
				payload: false
			});
			dispatch({
				type: GET_ALL_FAHAS_VEHICLES,
				payload: res.data.result
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_FAHAS_VEHICLES_LOADING,
				payload: false
			});
		});
};

// UPDATE FAHAS ORDER STATUS
export const updateFahasVehicleOrderStatus = (data, handleClose) => async (dispatch) => {
	dispatch({
		type: ADD_FAHAS_RECORD_LOADING,
		payload: true
	});
	axios
		.post(`${API_PATH}/addFahasRecord`, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			dispatch({
				type: ADD_FAHAS_RECORD_LOADING,
				payload: false
			});
			handleClose();
			toast.success(() => customToast(res.data.result), {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			});
		})
		.catch((err) => {
			dispatch({
				type: ADD_FAHAS_RECORD_LOADING,
				payload: false
			});
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			});
		});
};

// GET ALL TRANSACTIONS
export const getAllFahasTransactions = () => async (dispatch) => {
	dispatch(getAllFahasTransactionsLoading());

	axios
		.get(`${API_PATH}/getAllTransactions_fahas`)
		.then((res) => {
			dispatch({
				type: GET_ALL_FAHAS_TRANSACTIONS,
				payload: res.data.result
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_FAHAS_TRANSACTIONS,
				payload: []
			});
		});
};
export const getAllFahasTransactionsLoading = () => {
	return {
		type: GET_ALL_FAHAS_TRANSACTIONS_LOADING
	};
};
