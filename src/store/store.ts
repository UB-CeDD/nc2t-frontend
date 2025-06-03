import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from './middleware/logger';
import compoundReducer from './reducers/compoundReducer';
import authReducer from './reducers/authReducer';
import locationReducer from './reducers/locationReducer';

// Combine all reducers
const rootReducer = combineReducers({
    getCompounds: compoundReducer,
    getLocations: locationReducer,
    auth: authReducer,
    // Add other reducers here as needed
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;