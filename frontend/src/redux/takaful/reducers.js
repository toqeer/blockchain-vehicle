import {
	GET_ALL_TAKAFUL_DATA,
	GET_ALL_TAKAFUL_DATA_LOADING,
	GET_ALL_TAKAFUL_VEHICLES,
	GET_ALL_TAKAFUL_VEHICLES_LOADING,
	ADD_TAKAFUL_RECORD_LOADING,
	GET_ALL_TAKAFUL_TRANSACTIONS,
	GET_ALL_TAKAFUL_TRANSACTIONS_LOADING
} from '../../constants/actionTypes';
const initState = {
	takafulData: [],
	takafulLoading: false,
	takafulVehiclesData: [],
	takafulVehiclesLoading: false,
	addTakafulLoading: false,
	allTransactions: null,
	transactionsLoading: false
};

export default function(state = initState, action) {
	switch (action.type) {
		case GET_ALL_TAKAFUL_DATA:
			return {
				...state,
				takafulData: action.payload
			};
		case GET_ALL_TAKAFUL_DATA_LOADING:
			return {
				...state,
				takafulLoading: action.payload
			};

		case GET_ALL_TAKAFUL_VEHICLES:
			return {
				...state,
				takafulVehiclesData: action.payload
			};
		case GET_ALL_TAKAFUL_VEHICLES_LOADING:
			return {
				...state,
				takafulVehiclesLoading: action.payload
			};
		case ADD_TAKAFUL_RECORD_LOADING:
			return {
				...state,
				addTakafulLoading: action.payload
			};
		case GET_ALL_TAKAFUL_TRANSACTIONS:
			return {
				...state,
				allTransactions: action.payload,
				transactionsLoading: false
			};
		case GET_ALL_TAKAFUL_TRANSACTIONS_LOADING:
			return {
				...state,
				transactionsLoading: false
			};

		default:
			return state;
	}
}
