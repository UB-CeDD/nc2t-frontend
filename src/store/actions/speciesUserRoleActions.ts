import { SpeciesUser } from '@/services/speciesUserRoleService';

export const FETCH_SPECIES_USERS_REQUEST = 'FETCH_SPECIES_USERS_REQUEST';
export const FETCH_SPECIES_USERS_SUCCESS = 'FETCH_SPECIES_USERS_SUCCESS';
export const FETCH_SPECIES_USERS_FAILURE = 'FETCH_SPECIES_USERS_FAILURE';

export const ADD_SPECIES_USER_SUCCESS = 'ADD_SPECIES_USER_SUCCESS';
export const ADD_SPECIES_USER_FAILURE = 'ADD_SPECIES_USER_FAILURE';

export const UPDATE_SPECIES_USER_ROLE_SUCCESS = 'UPDATE_SPECIES_USER_ROLE_SUCCESS';
export const UPDATE_SPECIES_USER_ROLE_FAILURE = 'UPDATE_SPECIES_USER_ROLE_FAILURE';

export const REMOVE_SPECIES_USER_SUCCESS = 'REMOVE_SPECIES_USER_SUCCESS';
export const REMOVE_SPECIES_USER_FAILURE = 'REMOVE_SPECIES_USER_FAILURE';

export const fetchSpeciesUsersRequest = () => ({
    type: FETCH_SPECIES_USERS_REQUEST,
});

export const fetchSpeciesUsersSuccess = (speciesUsers: SpeciesUser[]) => ({
    type: FETCH_SPECIES_USERS_SUCCESS,
    payload: speciesUsers,
});

export const fetchSpeciesUsersFailure = (error: string) => ({
    type: FETCH_SPECIES_USERS_FAILURE,
    payload: error,
});

export const addSpeciesUserSuccess = (speciesUser: SpeciesUser) => ({
    type: ADD_SPECIES_USER_SUCCESS,
    payload: speciesUser,
});

export const addSpeciesUserFailure = (error: string) => ({
    type: ADD_SPECIES_USER_FAILURE,
    payload: error,
});

export const updateSpeciesUserRoleSuccess = (speciesUser: SpeciesUser) => ({
    type: UPDATE_SPECIES_USER_ROLE_SUCCESS,
    payload: speciesUser,
});

export const updateSpeciesUserRoleFailure = (error: string) => ({
    type: UPDATE_SPECIES_USER_ROLE_FAILURE,
    payload: error,
});

export const removeSpeciesUserSuccess = (userId: number) => ({
    type: REMOVE_SPECIES_USER_SUCCESS,
    payload: userId,
});

export const removeSpeciesUserFailure = (error: string) => ({
    type: REMOVE_SPECIES_USER_FAILURE,
    payload: error,
});
