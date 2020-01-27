import React from 'react';
import {
	GET_ALL_TAKAFUL_DATA,
	GET_ALL_TAKAFUL_DATA_LOADING,
	GET_ALL_TAKAFUL_VEHICLES,
	GET_ALL_TAKAFUL_VEHICLES_LOADING,
	ADD_TAKAFUL_RECORD_LOADING,
	GET_ALL_TAKAFUL_TRANSACTIONS,
	GET_ALL_TAKAFUL_TRANSACTIONS_LOADING
} from '../../constants/actionTypes';
import { API_PATH } from '../../constants/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { customToast } from '../../components/common';

// GET ALL VEHICLES ORDERS MANUFACTURER
export const getAllTakafulRecord = () => async (dispatch) => {
	dispatch({
		type: GET_ALL_TAKAFUL_DATA_LOADING,
		payload: true
	});
	axios
		.get(`${API_PATH}/getAllVehicle`)
		.then((res) => {
			dispatch({
				type: GET_ALL_TAKAFUL_DATA_LOADING,
				payload: false
			});
			dispatch({
				type: GET_ALL_TAKAFUL_DATA,
				payload: res.data.result
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_TAKAFUL_DATA_LOADING,
				payload: false
			});
		});
};

// GET ALL VEHICLES ORDERS MANUFACTURER
export const getAllTakafulVehicles = () => async (dispatch) => {
	dispatch({
		type: GET_ALL_TAKAFUL_VEHICLES_LOADING,
		payload: true
	});
	axios
		.get(`${API_PATH}/getAllTakafulRecord`)
		.then((res) => {
			dispatch({
				type: GET_ALL_TAKAFUL_VEHICLES_LOADING,
				payload: false
			});
			dispatch({
				type: GET_ALL_TAKAFUL_VEHICLES,
				payload: res.data.result
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_TAKAFUL_VEHICLES_LOADING,
				payload: false
			});
		});
};

// UPDATE Takaful ORDER STATUS
export const updateTakafulVehicleOrderStatus = (data, handleClose) => async (dispatch) => {
	dispatch({
		type: ADD_TAKAFUL_RECORD_LOADING,
		payload: true
	});
	axios
		.post(`${API_PATH}/addTakafulRecord`, data, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			dispatch({
				type: ADD_TAKAFUL_RECORD_LOADING,
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
				type: ADD_TAKAFUL_RECORD_LOADING,
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
export const getAllTkafulTransactions = () => async (dispatch) => {
	dispatch(getAllTkafulTransactionsLoading());

	axios
		.get(`${API_PATH}/getAllTransactions_takaful`)
		.then((res) => {
			dispatch({
				type: GET_ALL_TAKAFUL_TRANSACTIONS,
				payload: res.data.result
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_TAKAFUL_TRANSACTIONS,
				payload: []
			});
		});
};
export const getAllTkafulTransactionsLoading = () => {
	return {
		type: GET_ALL_TAKAFUL_TRANSACTIONS_LOADING
	};
};
