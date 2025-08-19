import { Reference } from "@/helpers/types.ts";

// Action Types
export const FETCH_REFERENCES_SUCCESS = 'FETCH_REFERENCES_SUCCESS';
export const FETCH_REFERENCES_FAILURE = 'FETCH_REFERENCES_FAILURE';
export const CREATE_REFERENCE_SUCCESS = 'CREATE_REFERENCE_SUCCESS';
export const CREATE_REFERENCE_FAILURE = 'CREATE_REFERENCE_FAILURE';
export const RETRIEVE_REFERENCE_SUCCESS = 'RETRIEVE_REFERENCE_SUCCESS';
export const RETRIEVE_REFERENCE_FAILURE = 'RETRIEVE_REFERENCE_FAILURE';
export const UPDATE_REFERENCE_SUCCESS = 'UPDATE_REFERENCE_SUCCESS';
export const UPDATE_REFERENCE_FAILURE = 'UPDATE_REFERENCE_FAILURE';
export const DELETE_REFERENCE_SUCCESS = 'DELETE_REFERENCE_SUCCESS';
export const DELETE_REFERENCE_FAILURE = 'DELETE_REFERENCE_FAILURE';

// Action Creators
export const fetchReferencesSuccess = (references: Reference[]) => ({
    type: FETCH_REFERENCES_SUCCESS,
    payload: references,
});

export const fetchReferencesFailure = (error: string) => ({
    type: FETCH_REFERENCES_FAILURE,
    payload: error,
});

export const createReferenceSuccess = (reference: Reference) => ({
    type: CREATE_REFERENCE_SUCCESS,
    payload: reference,
});

export const createReferenceFailure = (error: string) => ({
    type: CREATE_REFERENCE_FAILURE,
    payload: error,
});

export const retrieveReferenceSuccess = (reference: Reference) => ({
    type: RETRIEVE_REFERENCE_SUCCESS,
    payload: reference,
});

export const retrieveReferenceFailure = (error: string) => ({
    type: RETRIEVE_REFERENCE_FAILURE,
    payload: error,
});

export const updateReferenceSuccess = (reference: Reference) => ({
    type: UPDATE_REFERENCE_SUCCESS,
    payload: reference,
});

export const updateReferenceFailure = (error: string) => ({
    type: UPDATE_REFERENCE_FAILURE,
    payload: error,
});

export const deleteReferenceSuccess = (id: string) => ({
    type: DELETE_REFERENCE_SUCCESS,
    payload: id,
});

export const deleteReferenceFailure = (error: string) => ({
    type: DELETE_REFERENCE_FAILURE,
    payload: error,
});