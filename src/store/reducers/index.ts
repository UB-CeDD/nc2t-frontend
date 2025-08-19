import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import userReducer from './userReducer';
import compoundReducer from './compoundReducer';
import speciesReducer from './speciesReducer';
import locationReducer from './locationReducer';
import referenceReducer from './referenceReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    getCompounds: compoundReducer,
    getSpecies: speciesReducer,
    getLocations: locationReducer,
    getReferences: referenceReducer
});

export default rootReducer;