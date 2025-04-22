import {
    createCompound,
    listCompounds,
    retrieveCompound,
    updateCompound,
    deleteCompound,
} from '@/services/compoundService.ts';
import {
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

export const fetchCompounds = (queryParams: Record<string, string> = {}) => async (dispatch: any) => {
    try {
        const compounds = await listCompounds(queryParams);
        dispatch(fetchCompoundsSuccess(compounds));
    } catch (error) {
        dispatch(fetchCompoundsFailure('Failed to fetch compounds.'));
    }
};

export const createCompoundThunk = (compoundData: { subclass: string; compound_class: string; smiles: string }) => async (dispatch: any) => {
    try {
        const newCompound = await createCompound(compoundData);
        dispatch(createCompoundSuccess(newCompound));
    } catch (error) {
        dispatch(createCompoundFailure('Failed to create compound.'));
    }
};

export const retrieveCompoundThunk = (id: string) => async (dispatch: any) => {
    try {
        const compound = await retrieveCompound(id);
        dispatch(retrieveCompoundSuccess(compound));
    } catch (error) {
        dispatch(retrieveCompoundFailure('Failed to retrieve compound.'));
    }
};

export const updateCompoundThunk = (id: string, compoundData: { compound_class?: string; smiles?: string }) => async (dispatch: any) => {
    try {
        const updatedCompound = await updateCompound(id, compoundData);
        dispatch(updateCompoundSuccess(updatedCompound));
    } catch (error) {
        dispatch(updateCompoundFailure('Failed to update compound.'));
    }
};

export const deleteCompoundThunk = (id: string) => async (dispatch: any) => {
    try {
        await deleteCompound(id);
        dispatch(deleteCompoundSuccess(id));
    } catch (error) {
        dispatch(deleteCompoundFailure('Failed to delete compound.'));
    }
};