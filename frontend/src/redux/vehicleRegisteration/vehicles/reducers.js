import {
  GET_ALL_VEHICLES,
  GET_ALL_VEHICLES_LOADING,
  REGISTER_VEHICLE_LOADING,
  REGISTER_VEHICLE,
  PLACE_VEHICLE_ORDER_LOADING,
  PLACE_VEHICLE_ORDER,
  GET_USER_VEHICLE_ORDERS,
  GET_USER_VEHICLE_ORDERS_LOADING,
  TRANSFER_VEHICLE_LOADING,
  TRANSFER_VEHICLE,
  PLACE_LISCENCE_ORDER_LOADING,
  PLACE_LISCENCE_ORDER,
  GET_ALL_TRANSFER_REQUEST_USER_LOADING,
  GET_ALL_TRANSFER_REQUEST_USER,
  TRANSFER_REQUETS_DATA,
  APPROVE_USER_TRANSFER_REQUESTS_LOADING,
  APPROVE_USER_TRANSFER_REQUESTS,
  REJECT_USER_TRANSFER_REQUESTS_LOADING,
  REJECT_USER_TRANSFER_REQUESTS,
  GET_ALL_USER_TRANSACTIONS_LOADING,
  GET_ALL_USER_TRANSACTIONS,
  GET_ALL_TRANSACTION_DETAILS,
  GET_VEHICLE_TRANSACTION,
  GET_VEHICLE_TAKAFUL_RECORD,
  GET_VEHICLE_FAHAS_RECORD,
  GET_LICENSES_USER,
  GET_LICENSES_USER_LOADING
} from "../../../constants/actionTypes";
const initState = {
  allVehicles: null,
  userVehicleOrders: null,
  userTransactions: null,
  transactionDetails: null,
  userTrasferRequests: null,
  vehicleTransaction: null,
  vehicleFahasRecord: null,
  vehicleTakafulRecord: null,
  allVehiclesloading: false,
  registerVehicleLoading: false,
  placeOrderLoading: false,
  userVehicleOrdersLoading: false,
  transferVehicleLoading: false,
  placeLiscenceOrderLoading: false,
  userTrasferRequestsLoading: false,
  approveUserTransferLoading: false,
  rejectUserTransferLoading: false,
  userTransactionsLoading: false,
  UserAllLicenseData: [],
  UserAllLicenseLoading: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case GET_ALL_VEHICLES:
      return {
        ...state,
        allVehiclesloading: false,
        allVehicles: action.payload
      };
    case GET_USER_VEHICLE_ORDERS:
      return {
        ...state,
        userVehicleOrdersLoading: false,
        userVehicleOrders: action.payload
      };
    case TRANSFER_REQUETS_DATA:
      return { ...state, userTrasferRequests: action.payload };
    case GET_VEHICLE_FAHAS_RECORD:
      return { ...state, vehicleFahasRecord: action.payload };
    case GET_VEHICLE_TAKAFUL_RECORD:
      return { ...state, vehicleTakafulRecord: action.payload };
    case GET_ALL_VEHICLES_LOADING:
      return { ...state, allVehiclesloading: true };
    case GET_ALL_USER_TRANSACTIONS:
      return {
        ...state,
        userTransactionsLoading: false,
        userTransactions: action.payload
      };
    case GET_ALL_TRANSACTION_DETAILS:
      return { ...state, transactionDetails: action.payload };
    case GET_VEHICLE_TRANSACTION:
      return { ...state, vehicleTransaction: action.payload };
    case REGISTER_VEHICLE_LOADING:
      return { ...state, registerVehicleLoading: true };
    case REGISTER_VEHICLE:
      return { ...state, registerVehicleLoading: false };
    case PLACE_VEHICLE_ORDER:
      return { ...state, placeOrderLoading: false };
    case PLACE_VEHICLE_ORDER_LOADING:
      return { ...state, placeOrderLoading: true };
    case TRANSFER_VEHICLE_LOADING:
      return { ...state, transferVehicleLoading: true };
    case TRANSFER_VEHICLE:
      return { ...state, transferVehicleLoading: false };
    case PLACE_LISCENCE_ORDER_LOADING:
      return { ...state, placeLiscenceOrderLoading: true };
    case PLACE_LISCENCE_ORDER:
      return { ...state, placeLiscenceOrderLoading: false };

    case GET_LICENSES_USER_LOADING:
      return { ...state, UserAllLicenseLoading: action.payload };
    case GET_LICENSES_USER:
      return { ...state, UserAllLicenseData: action.payload };

    // export const GET_LICENSES_USER='GET_LICENSES_USER';
    // export const GET_LICENSES_USER_LOADING='GET_LICENSES_USER_LOADING';
    case GET_USER_VEHICLE_ORDERS_LOADING:
      return { ...state, userVehicleOrdersLoading: true };

    case GET_ALL_TRANSFER_REQUEST_USER_LOADING:
      return { ...state, userTrasferRequestsLoading: true };
    case GET_ALL_TRANSFER_REQUEST_USER:
      return { ...state, userTrasferRequestsLoading: false };

    case APPROVE_USER_TRANSFER_REQUESTS_LOADING:
      return { ...state, approveUserTransferLoading: true };
    case APPROVE_USER_TRANSFER_REQUESTS:
      return { ...state, approveUserTransferLoading: false };

    case REJECT_USER_TRANSFER_REQUESTS_LOADING:
      return { ...state, rejectUserTransferLoading: true };
    case REJECT_USER_TRANSFER_REQUESTS:
      return { ...state, rejectUserTransferLoading: false };
    case GET_ALL_USER_TRANSACTIONS_LOADING:
      return { ...state, userTransactionsLoading: true };

    default:
      return state;
  }
}
