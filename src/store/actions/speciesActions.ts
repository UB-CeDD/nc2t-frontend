import { Specie } from "@/helpers/types.ts";

// Action Types
export const FETCH_SPECIES_REQUEST = 'FETCH_SPECIES_REQUEST';
export const FETCH_SPECIES_SUCCESS = 'FETCH_SPECIES_SUCCESS';
export const FETCH_SPECIES_FAILURE = 'FETCH_SPECIES_FAILURE';
export const CREATE_SPECIES_SUCCESS = 'CREATE_SPECIES_SUCCESS';
export const CREATE_SPECIES_FAILURE = 'CREATE_SPECIES_FAILURE';
export const RETRIEVE_SPECIES_SUCCESS = 'RETRIEVE_SPECIES_SUCCESS';
export const RETRIEVE_SPECIES_FAILURE = 'RETRIEVE_SPECIES_FAILURE';
export const UPDATE_SPECIES_SUCCESS = 'UPDATE_SPECIES_SUCCESS';
export const UPDATE_SPECIES_FAILURE = 'UPDATE_SPECIES_FAILURE';
export const DELETE_SPECIES_SUCCESS = 'DELETE_SPECIES_SUCCESS';
export const DELETE_SPECIES_FAILURE = 'DELETE_SPECIES_FAILURE';
export const SEARCH_SPECIES_SUCCESS = 'SEARCH_SPECIES_SUCCESS';
export const SEARCH_SPECIES_FAILURE = 'SEARCH_SPECIES_FAILURE';

// Action Creators
export const fetchSpeciesRequest = () => ({
    type: FETCH_SPECIES_REQUEST,
});

export const fetchSpeciesSuccess = (species: Specie[]) => ({
    type: FETCH_SPECIES_SUCCESS,
    payload: species,
});

export const fetchSpeciesFailure = (error: string) => ({
    type: FETCH_SPECIES_FAILURE,
    payload: error,
});

export const createSpeciesSuccess = (specie: Specie) => ({
    type: CREATE_SPECIES_SUCCESS,
    payload: specie,
});

export const createSpeciesFailure = (error: string) => ({
    type: CREATE_SPECIES_FAILURE,
    payload: error,
});

export const retrieveSpeciesSuccess = (specie: Specie) => ({
    type: RETRIEVE_SPECIES_SUCCESS,
    payload: specie,
});

export const retrieveSpeciesFailure = (error: string) => ({
    type: RETRIEVE_SPECIES_FAILURE,
    payload: error,
});

export const updateSpeciesSuccess = (specie: Specie) => ({
    type: UPDATE_SPECIES_SUCCESS,
    payload: specie,
});

export const updateSpeciesFailure = (error: string) => ({
    type: UPDATE_SPECIES_FAILURE,
    payload: error,
});

export const deleteSpeciesSuccess = (id: string) => ({
    type: DELETE_SPECIES_SUCCESS,
    payload: id,
});

export const deleteSpeciesFailure = (error: string) => ({
    type: DELETE_SPECIES_FAILURE,
    payload: error,
});

export const searchSpeciesSuccess = (species: Specie[]) => ({
    type: SEARCH_SPECIES_SUCCESS,
    payload: species,
});

export const searchSpeciesFailure = (error: string) => ({
    type: SEARCH_SPECIES_FAILURE,
    payload: error,
});
export const searchSpeciesByReference = (reference: string) => ({
    type: 'SEARCH_SPECIES_BY_REFERENCE',
    payload: reference,
});