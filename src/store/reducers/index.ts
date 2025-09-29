import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import userReducer from './userReducer';
import compoundReducer from './compoundReducer';
import speciesReducer from './speciesReducer';
import locationReducer from './locationReducer';
import referenceReducer from './referenceReducer';
import herbariumReducer from './herbariumReducer';
import speciesUserRoleReducer from './speciesUserRoleReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    getUsers: userReducer,
    getCompounds: compoundReducer,
    getSpecies: speciesReducer,
    getLocations: locationReducer,
    getReferences: referenceReducer,
    getHerbariums: herbariumReducer,
    speciesUserRoles: speciesUserRoleReducer,
    loading: loadingReducer,
});

export default rootReducer;