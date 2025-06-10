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
export const fetchReferencesSuccess = (references) => ({
    type: FETCH_REFERENCES_SUCCESS,
    payload: references,
});

export const fetchReferencesFailure = (error) => ({
    type: FETCH_REFERENCES_FAILURE,
    payload: error,
});

export const createReferenceSuccess = (reference) => ({
    type: CREATE_REFERENCE_SUCCESS,
    payload: reference,
});

export const createReferenceFailure = (error) => ({
    type: CREATE_REFERENCE_FAILURE,
    payload: error,
});

export const retrieveReferenceSuccess = (reference) => ({
    type: RETRIEVE_REFERENCE_SUCCESS,
    payload: reference,
});

export const retrieveReferenceFailure = (error) => ({
    type: RETRIEVE_REFERENCE_FAILURE,
    payload: error,
});

export const updateReferenceSuccess = (reference) => ({
    type: UPDATE_REFERENCE_SUCCESS,
    payload: reference,
});

export const updateReferenceFailure = (error) => ({
    type: UPDATE_REFERENCE_FAILURE,
    payload: error,
});

export const deleteReferenceSuccess = (id) => ({
    type: DELETE_REFERENCE_SUCCESS,
    payload: id,
});

export const deleteReferenceFailure = (error) => ({
    type: DELETE_REFERENCE_FAILURE,
    payload: error,
});