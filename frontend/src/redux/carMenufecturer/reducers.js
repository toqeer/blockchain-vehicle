import {
	GET_ALL_VEHICLES_ORDERS_MANUFACTURER,
	GET_ALL_VEHICLES_ORDERS_MANUFACTURER_LOADING,
	GET_ALL_MANUFACTURER,
	GET_ALL_MANUFACTURER_LOADING,
	GET_ALL_MANUFACTURER_TRANSACTIONS_LOADING,
	GET_ALL_MANUFACTURER_TRANSACTIONS
} from '../../constants/actionTypes';
const initState = {
	allOrders: null,
	allManufacturer: null,
	allOrdersLoading: false,
	allManufacturerLoading: false,
	allTransactions: null,
	transactionsLoading: false
};
export default function(state = initState, action) {
	switch (action.type) {
		case GET_ALL_VEHICLES_ORDERS_MANUFACTURER:
			return {
				...state,
				allOrdersLoading: false,
				allOrders: action.payload
			};
		case GET_ALL_VEHICLES_ORDERS_MANUFACTURER_LOADING:
			return { ...state, allOrdersLoading: true };
		case GET_ALL_MANUFACTURER:
			return {
				...state,
				allManufacturerLoading: false,
				allManufacturer: action.payload
			};
		case GET_ALL_MANUFACTURER_TRANSACTIONS:
			return {
				...state,
				transactionsLoading: false,
				allTransactions: action.payload
			};
		case GET_ALL_MANUFACTURER_LOADING:
			return { ...state, allManufacturerLoading: true };
		case GET_ALL_MANUFACTURER_TRANSACTIONS_LOADING:
			return { ...state, transactionsLoading: true };

		default:
			return state;
	}
}
