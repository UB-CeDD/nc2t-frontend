import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import logger from './middleware/logger';
import compoundReducer from './reducers/compoundReducer';
import authReducer from './reducers/authReducer';

// Combine all reducers
const rootReducer = combineReducers({
    getCompounds: compoundReducer,
    auth: authReducer,
    // Add other reducers here as needed
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;