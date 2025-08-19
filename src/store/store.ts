import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from './middleware/logger';
import compoundReducer from './reducers/compoundReducer';
import authReducer from './reducers/authReducer';
import locationReducer from './reducers/locationReducer';
import referenceReducer from './reducers/referenceReducer';
import userReducer from './reducers/userReducer';
import speciesReducer from "./reducers/speciesReducer";

// Combine all reducers
const rootReducer = combineReducers({
    getCompounds: compoundReducer,
    getLocations: locationReducer,
    getReferences: referenceReducer,
    getSpecies: speciesReducer,
    getusers: userReducer,
    auth: authReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;