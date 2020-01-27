import { combineReducers } from 'redux';
import userAuthReducer from './auth/reducer';
import vehiclesReducer from './vehicleRegisteration/vehicles/reducers';
import menufacturerReducer from './carMenufecturer/reducers';
import ministoryOfInteriorReducer from './ministoryOfInterior/reducer';
import fahasReducer from './fahas/reducers';
import takafulReducer from './takaful/reducers';
const reducers = combineReducers({
	userAuth: userAuthReducer,
	vehicleRegisteration: combineReducers({
		vehicles: vehiclesReducer
	}),
	interiorMinitory: ministoryOfInteriorReducer,
	carMenufecturer: menufacturerReducer,
	fahas:fahasReducer,
	takaful:takafulReducer,
});

export default reducers;
