import {
    createCompound,
    listCompounds,
    retrieveCompound,
    updateCompound,
    deleteCompound,
} from '@/services/compoundService.ts';
import {
    fetchCompoundsRequest,
    fetchCompoundsSuccess,
    fetchCompoundsFailure,
    createCompoundRequest, createCompoundSuccess,
    createCompoundFailure,
    retrieveCompoundSuccess,
    retrieveCompoundFailure,
    updateCompoundRequest, updateCompoundSuccess,
    updateCompoundFailure,
    deleteCompoundSuccess,
    deleteCompoundFailure,
    setCompoundCount, // Import new action creator
} from '../actions/compoundActions';
import { Compound } from '@/helpers/types';
import { AppDispatch } from '../../store/store'; // Import AppDispatch


export const fetchCompounds = (queryParams: Record<string, string> = {}) => async (dispatch: AppDispatch) => {
    dispatch(fetchCompoundsRequest());
    try {
        const compounds = await listCompounds(queryParams);
        dispatch(fetchCompoundsSuccess(compounds));
        return compounds;
    } catch (error) {
        dispatch(fetchCompoundsFailure('Failed to fetch compounds.'));
        throw error;
    }
};

export const fetchTotalCompoundCount = () => async (dispatch: AppDispatch) => {
    dispatch(fetchCompoundsRequest()); // Use the existing request action for loading state
    try {
        const compounds = await listCompounds(); // Fetch all compounds
        dispatch(setCompoundCount(compounds.length)); // Dispatch the count
    } catch (error) {
        dispatch(fetchCompoundsFailure('Failed to fetch compound count.'));
        throw error;
    }
};

export const createCompoundThunk = (compoundData: Compound, addNotification: (message: string, type: 'success' | 'warning' | 'error') => void) => async (dispatch: AppDispatch) => {
    dispatch(createCompoundRequest());
    try {
        const newCompound = await createCompound(compoundData);
        dispatch(createCompoundSuccess(newCompound));
        addNotification('Compound created successfully', 'success');
        return newCompound;
    } catch (error: any) {
        dispatch(createCompoundFailure(error.message));
        addNotification(error.message, 'error');
        throw error;
    }
};

export const retrieveCompoundThunk = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const compound = await retrieveCompound(id);
        dispatch(retrieveCompoundSuccess(compound));
        return compound;
    } catch (error: any) {
        dispatch(retrieveCompoundFailure(error.message));
        throw error;
    }
};

export const updateCompoundThunk = (id: string, compoundData: { compound_class?: string; smiles?: string }, addNotification: (message: string, type: 'success' | 'warning' | 'error') => void) => async (dispatch: AppDispatch) => {
    dispatch(updateCompoundRequest());
    try {
        const updatedCompound = await updateCompound(id, compoundData);
        dispatch(updateCompoundSuccess(updatedCompound));
        addNotification('Compound updated successfully', 'success');
        return updatedCompound;
    } catch (error: any) {
        dispatch(updateCompoundFailure(error.message));
        addNotification(error.message, 'error');
        throw error;
    }
};

export const deleteCompoundThunk = (id: string) => async (dispatch: AppDispatch) => {
    try {
        await deleteCompound(id);
        dispatch(deleteCompoundSuccess(id));
        return id;
    } catch (error) {
        dispatch(deleteCompoundFailure('Failed to delete compound.'));
        throw error;
    }
};