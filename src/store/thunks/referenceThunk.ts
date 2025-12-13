import { listReferences, createReference, updateReference, deleteReference } from '@/services/referenceService.ts';
import {
    fetchReferencesRequest,
    fetchReferencesSuccess,
    fetchReferencesFailure,
    createReferenceRequest,
    createReferenceSuccess,
    createReferenceFailure,
    updateReferenceRequest,
    updateReferenceSuccess,
    updateReferenceFailure,
    deleteReferenceSuccess,
    deleteReferenceFailure,
    setReferenceCount, // Import new action creator
} from '../actions/referenceActions';
import { Reference } from '@/helpers/types';
import { AppDispatch } from '../../store/store'; // Import AppDispatch

export const fetchReferencesThunk = () => async (dispatch: AppDispatch) => {
    dispatch(fetchReferencesRequest());
    try {
        const references = await listReferences();
        dispatch(fetchReferencesSuccess(references));
    } catch (error: any) {
        dispatch(fetchReferencesFailure(error.message || 'Failed to fetch references.'));
    }
};

export const fetchTotalReferenceCount = () => async (dispatch: AppDispatch) => {
    dispatch(fetchReferencesRequest()); // Use the existing request action for loading state
    try {
        const references = await listReferences(); // Fetch all references
        dispatch(setReferenceCount(references.length)); // Dispatch the count
    } catch (error: any) {
        dispatch(fetchReferencesFailure(error.message || 'Failed to fetch reference count.'));
    }
};

export const createReferenceThunk = (referenceData: Reference, addNotification: (message: string, type: 'success' | 'warning' | 'error') => void) => async (dispatch: AppDispatch) => {
    dispatch(createReferenceRequest());
    try {
        const newReference = await createReference(referenceData);
        dispatch(createReferenceSuccess(newReference));
        addNotification('Reference created successfully', 'success');
        return newReference;
    } catch (error: any) {
        dispatch(createReferenceFailure(error.message));
        addNotification(error.message, 'error');
        throw error;
    }
};

export const updateReferenceThunk = (id: string, referenceData: Partial<Reference>, addNotification: (message: string, type: 'success' | 'warning' | 'error') => void) => async (dispatch: AppDispatch) => {
    dispatch(updateReferenceRequest());
    try {
        const updatedReference = await updateReference(id, referenceData);
        dispatch(updateReferenceSuccess(updatedReference));
        addNotification('Reference updated successfully', 'success');
        return updatedReference;
    } catch (error: any) {
        dispatch(updateReferenceFailure(error.message));
        addNotification(error.message, 'error');
        throw error;
    }
};

export const deleteReferenceThunk = (id: string, addNotification?: (message: string, type: 'success' | 'warning' | 'error') => void) => async (dispatch: AppDispatch) => {
    try {
        await deleteReference(id);
        dispatch(deleteReferenceSuccess(id));
        if (addNotification) {
            addNotification('Reference deleted successfully!', 'success');
        }
        // Refetch the references list to reflect the deleted data
        dispatch(fetchReferencesThunk());
        return id;
    } catch (error: any) {
        const errorMessage = error.message || 'Failed to delete reference.';
        dispatch(deleteReferenceFailure(errorMessage));
        if (addNotification) {
            addNotification(errorMessage, 'error');
        }
        throw error;
    }
};
