import { Herbarium } from '@/helpers/types';

export const FETCH_HERBARIUMS_REQUEST = 'FETCH_HERBARIUMS_REQUEST';
export const FETCH_HERBARIUMS_SUCCESS = 'FETCH_HERBARIUMS_SUCCESS';
export const FETCH_HERBARIUMS_FAILURE = 'FETCH_HERBARIUMS_FAILURE';

export const CREATE_HERBARIUM_SUCCESS = 'CREATE_HERBARIUM_SUCCESS';
export const CREATE_HERBARIUM_FAILURE = 'CREATE_HERBARIUM_FAILURE';

export const RETRIEVE_HERBARIUM_SUCCESS = 'RETRIEVE_HERBARIUM_SUCCESS';
export const RETRIEVE_HERBARIUM_FAILURE = 'RETRIEVE_HERBARIUM_FAILURE';

export const UPDATE_HERBARIUM_SUCCESS = 'UPDATE_HERBARIUM_SUCCESS';
export const UPDATE_HERBARIUM_FAILURE = 'UPDATE_HERBARIUM_FAILURE';

export const DELETE_HERBARIUM_SUCCESS = 'DELETE_HERBARIUM_SUCCESS';
export const DELETE_HERBARIUM_FAILURE = 'DELETE_HERBARIUM_FAILURE';

export const fetchHerbariumsRequest = () => ({
    type: FETCH_HERBARIUMS_REQUEST,
});

export const fetchHerbariumsSuccess = (herbariums: Herbarium[]) => ({
    type: FETCH_HERBARIUMS_SUCCESS,
    payload: herbariums,
});

export const fetchHerbariumsFailure = (error: string) => ({
    type: FETCH_HERBARIUMS_FAILURE,
    payload: error,
});

export const createHerbariumSuccess = (herbarium: Herbarium) => ({
    type: CREATE_HERBARIUM_SUCCESS,
    payload: herbarium,
});

export const createHerbariumFailure = (error: string) => ({
    type: CREATE_HERBARIUM_FAILURE,
    payload: error,
});

export const retrieveHerbariumSuccess = (herbarium: Herbarium) => ({
    type: RETRIEVE_HERBARIUM_SUCCESS,
    payload: herbarium,
});

export const retrieveHerbariumFailure = (error: string) => ({
    type: RETRIEVE_HERBARIUM_FAILURE,
    payload: error,
});

export const updateHerbariumSuccess = (herbarium: Herbarium) => ({
    type: UPDATE_HERBARIUM_SUCCESS,
    payload: herbarium,
});

export const updateHerbariumFailure = (error: string) => ({
    type: UPDATE_HERBARIUM_FAILURE,
    payload: error,
});

export const deleteHerbariumSuccess = (id: string) => ({
    type: DELETE_HERBARIUM_SUCCESS,
    payload: id,
});

export const deleteHerbariumFailure = (error: string) => ({
    type: DELETE_HERBARIUM_FAILURE,
    payload: error,
});
