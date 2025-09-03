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
    createCompoundSuccess,
    createCompoundFailure,
    retrieveCompoundSuccess,
    retrieveCompoundFailure,
    updateCompoundSuccess,
    updateCompoundFailure,
    deleteCompoundSuccess,
    deleteCompoundFailure,
} from '../actions/compoundActions';
import { Compound } from '@/helpers/types';

export const fetchCompounds = (queryParams: Record<string, string> = {}) => async (dispatch: any) => {
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

export const createCompoundThunk = (compoundData: Compound) => async (dispatch: any) => {
    try {
        const newCompound = await createCompound(compoundData);
        dispatch(createCompoundSuccess(newCompound));
        return newCompound;
    } catch (error) {
        dispatch(createCompoundFailure('Failed to create compound.'));
        throw error;
    }
};

export const retrieveCompoundThunk = (id: string) => async (dispatch: any) => {
    try {
        const compound = await retrieveCompound(id);
        dispatch(retrieveCompoundSuccess(compound));
        return compound;
    } catch (error) {
        dispatch(retrieveCompoundFailure('Failed to retrieve compound.'));
        throw error;
    }
};

export const updateCompoundThunk = (id: string, compoundData: { compound_class?: string; smiles?: string }) => async (dispatch: any) => {
    try {
        const updatedCompound = await updateCompound(id, compoundData);
        dispatch(updateCompoundSuccess(updatedCompound));
        return updatedCompound;
    } catch (error) {
        dispatch(updateCompoundFailure('Failed to update compound.'));
        throw error;
    }
};

export const deleteCompoundThunk = (id: string) => async (dispatch: any) => {
    try {
        await deleteCompound(id);
        dispatch(deleteCompoundSuccess(id));
        return id;
    } catch (error) {
        dispatch(deleteCompoundFailure('Failed to delete compound.'));
        throw error;
    }
};