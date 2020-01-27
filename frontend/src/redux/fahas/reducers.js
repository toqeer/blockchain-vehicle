import {
	GET_ALL_FAHAS_DATA,
	GET_ALL_FAHAS_DATA_LOADING,
	GET_ALL_FAHAS_VEHICLES,
	GET_ALL_FAHAS_VEHICLES_LOADING,
	ADD_FAHAS_RECORD_LOADING,
	GET_ALL_FAHAS_TRANSACTIONS,
	GET_ALL_FAHAS_TRANSACTIONS_LOADING
} from '../../constants/actionTypes';
const initState = {
	fahasData: [],
	fahasLoading: false,
	fahasVehiclesData: [],
	fahasVehiclesLoading: false,
	addFahasLoading: false,
	allTransactions: null,
	transacionsLoading: false
};

export default function(state = initState, action) {
	switch (action.type) {
		case GET_ALL_FAHAS_DATA:
			return {
				...state,
				fahasData: action.payload
			};
		case GET_ALL_FAHAS_DATA_LOADING:
			return {
				...state,
				fahasLoading: action.payload
			};

		case GET_ALL_FAHAS_VEHICLES:
			return {
				...state,
				fahasVehiclesData: action.payload
			};
		case GET_ALL_FAHAS_TRANSACTIONS:
			return {
				...state,
				allTransactions: action.payload,
				transacionsLoading: false
			};
		case GET_ALL_FAHAS_TRANSACTIONS_LOADING:
			return {
				...state,
				transacionsLoading: true
			};
		case GET_ALL_FAHAS_VEHICLES_LOADING:
			return {
				...state,
				fahasVehiclesLoading: action.payload
			};
		case ADD_FAHAS_RECORD_LOADING:
			return {
				...state,
				addFahasLoading: action.payload
			};

		default:
			return state;
	}
}
