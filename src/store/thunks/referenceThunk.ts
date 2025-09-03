import { listReferences, createReference, updateReference } from '@/services/referenceService.ts';
import {
    fetchReferencesRequest,
    fetchReferencesSuccess,
    fetchReferencesFailure,
    createReferenceSuccess,
    createReferenceFailure,
    updateReferenceSuccess,
    updateReferenceFailure
} from '../actions/referenceActions';
import { Reference } from '@/helpers/types';


export const fetchReferencesThunk = () => async (dispatch: any) => {
    dispatch(fetchReferencesRequest());
    try {
        const references = await listReferences();
        dispatch(fetchReferencesSuccess(references));
    } catch (error) {
        dispatch(fetchReferencesFailure('Failed to fetch references.'));
    }
};

export const createReferenceThunk = (referenceData: Reference) => async (dispatch: any) => {
    try {
        const newReference = await createReference(referenceData);
        dispatch(createReferenceSuccess(newReference));
        return newReference;
    } catch (error) {
        dispatch(createReferenceFailure('Failed to create reference.'));
        throw error;
    }
};

export const updateReferenceThunk = (id: string, referenceData: Partial<Reference>) => async (dispatch: any) => {
    try {
        const updatedReference = await updateReference(id, referenceData);
        dispatch(updateReferenceSuccess(updatedReference));
        return updatedReference;
    } catch (error) {
        dispatch(updateReferenceFailure('Failed to update reference.'));
        throw error;
    }
};
