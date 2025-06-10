import {
    fetchReferencesSuccess,
    fetchReferencesFailure,
    createReferenceSuccess,
    createReferenceFailure,
    retrieveReferenceSuccess,
    retrieveReferenceFailure,
    updateReferenceSuccess,
    updateReferenceFailure,
    deleteReferenceSuccess,
    deleteReferenceFailure,
} from '../actions/referenceActions';
import {
    listReferences,
    createReference,
    retrieveReference,
    updateReference,
    deleteReference,
} from '../../services/referenceService';
import { Reference } from '@/helpers/types';

export const fetchReferencesThunk = (queryParams) => async (dispatch) => {
    try {
        const references = await listReferences(queryParams);
        dispatch(fetchReferencesSuccess(references));
    } catch (error) {
        dispatch(fetchReferencesFailure(error.message));
    }
};

export const createReferenceThunk = (referenceData: Reference) => async (dispatch) => {
    try {
        const reference = await createReference(referenceData);
        dispatch(createReferenceSuccess(reference));
    } catch (error) {
        dispatch(createReferenceFailure(error.message));
    }
};

export const retrieveReferenceThunk = (id: string) => async (dispatch) => {
    try {
        const reference = await retrieveReference(id);
        dispatch(retrieveReferenceSuccess(reference));
    } catch (error) {
        dispatch(retrieveReferenceFailure(error.message));
    }
};

export const updateReferenceThunk = (id: string, referenceData: Reference ) => async (dispatch) => {
    try {
        const reference = await updateReference(id, referenceData);
        dispatch(updateReferenceSuccess(reference));
    } catch (error) {
        dispatch(updateReferenceFailure(error.message));
    }
};

export const deleteReferenceThunk = (id: string) => async ( dispatch ) => {
    try {
        await deleteReference(id);
        dispatch(deleteReferenceSuccess(id));
    } catch (error) {
        dispatch(deleteReferenceFailure(error.message));
    }
};