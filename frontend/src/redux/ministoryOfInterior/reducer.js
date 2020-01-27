import {
  GET_ALL_TRANSFER_REQUESTS,
  GET_ALL_TRANSFER_REQUESTS_LOADING,
  GET_ALL_LISCENCE_ORDERS,
  GET_ALL_LISCENCE_ORDERS_LOADING,
  GET_ALL_LISCENCE,
  GET_ALL_LISCENCE_LOADING,
  GET_ALL_MINISTORY,
  GET_UNAPPROVED_VEHICLES,
  GET_UNAPPROVED_VEHICLES_LOADING,
  APPROVE_VEHICLE,
  APPROVE_VEHICLE_LOADING,
  GET_ALL_MINISTORY_TRANSACTIONS,
  GET_ALL_MINISTORY_TRANSACTIONS_LOADING,
  GET_ALL_VEHICLE,
  GET_ALL_VEHICLE_LOADING
} from "../../constants/actionTypes";
const initState = {
  allTransferRequests: null,
  allLiscenceOrders: null,
  allLiscence: null,
  allMinistory: null,
  allUnApprovedVehicles: null,
  allTransactions: null,
  allVehicle: null,
  allVehicleLoading: false,
  allLiscenceLoading: false,
  allLiscenceOrdersLoading: false,
  allTransferRequestsLoading: false,
  allUnApprovedVehiclesLoading: false,
  approveVehicleLoading: false,
  transactionsLoading: false
};
export default function(state = initState, action) {
  switch (action.type) {
    case GET_ALL_TRANSFER_REQUESTS:
      return {
        ...state,
        allTransferRequestsLoading: false,
        allTransferRequests: action.payload
      };
    case GET_ALL_MINISTORY:
      return {
        ...state,
        // allMinistory: false,
        allMinistory: action.payload
      };
    case GET_ALL_TRANSFER_REQUESTS_LOADING:
      return { ...state, allTransferRequestsLoading: true };
    case GET_ALL_LISCENCE_ORDERS:
      return {
        ...state,
        allLiscenceOrdersLoading: false,
        allLiscenceOrders: action.payload
      };
    case GET_UNAPPROVED_VEHICLES:
      return {
        ...state,
        allUnApprovedVehiclesLoading: false,
        allUnApprovedVehicles: action.payload
      };
    case APPROVE_VEHICLE:
      let { allUnApprovedVehicles } = state;
      let newUnApprovedVehicles = [];
      if (allUnApprovedVehicles && allUnApprovedVehicles.length > 0) {
        newUnApprovedVehicles = allUnApprovedVehicles.filter(
          item => item.vIn !== action.payload.vIn
        );
      }
      return {
        ...state,
        approveVehicleLoading: false,
        allUnApprovedVehicles: newUnApprovedVehicles
      };
    case APPROVE_VEHICLE_LOADING:
      return {
        ...state,
        approveVehicleLoading: true
      };
    case GET_ALL_VEHICLE:
      return {
        ...state,
        allVehicle: action.payload,
        allVehicleLoading: false
      };
    case GET_ALL_VEHICLE_LOADING:
      return {
        ...state,
        allVehicleLoading: true
      };
    case GET_ALL_LISCENCE_ORDERS_LOADING:
      return { ...state, allLiscenceOrdersLoading: true };
    case GET_ALL_LISCENCE:
      return {
        ...state,
        allLiscenceLoading: false,
        allLiscence: action.payload
      };
    case GET_ALL_MINISTORY_TRANSACTIONS:
      return {
        ...state,
        transactionsLoading: false,
        allTransactions: action.payload
      };
    case GET_ALL_LISCENCE_LOADING:
      return { ...state, allLiscenceLoading: true };
    case GET_UNAPPROVED_VEHICLES_LOADING:
      return { ...state, allUnApprovedVehiclesLoading: true };
    case GET_ALL_MINISTORY_TRANSACTIONS_LOADING:
      return { ...state, transactionsLoading: true };

    default:
      return state;
  }
}
