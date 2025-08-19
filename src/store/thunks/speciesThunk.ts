import {
    createSpecies,
    listSpecies,
    retrieveSpecies,
    updateSpecies,
    deleteSpecies,
} from '@/services/speciesService.ts';
import {
    fetchSpeciesSuccess,
    fetchSpeciesFailure,
    createSpeciesSuccess,
    createSpeciesFailure,
    retrieveSpeciesSuccess,
    retrieveSpeciesFailure,
    updateSpeciesSuccess,
    updateSpeciesFailure,
    deleteSpeciesSuccess,
    deleteSpeciesFailure,
    searchSpeciesFailure,
    searchSpeciesSuccess,
} from '../actions/speciesActions';

import { Specie } from '@/helpers/types';
import { searchReferences } from '@/services/referenceService';

export const fetchSpecies = (queryParams: Record<string, string> = {}) => async (dispatch: any) => {
    try {
        const species = await listSpecies(queryParams);
        dispatch(fetchSpeciesSuccess(species));
    } catch (error) {
        dispatch(fetchSpeciesFailure('Failed to fetch species.'));
    }
};

export const createSpeciesThunk = (speciesData: Specie) => async (dispatch) => {
    try {
        const newSpecies = await createSpecies(speciesData);
        dispatch(createSpeciesSuccess(newSpecies));
    } catch (error) {
        dispatch(createSpeciesFailure('Failed to create species.'));
    }
};

export const retrieveSpeciesThunk = (id: string) => async (dispatch) => {
    try {
        const specie = await retrieveSpecies(id);
        dispatch(retrieveSpeciesSuccess(specie));
    } catch (error) {
        dispatch(retrieveSpeciesFailure('Failed to retrieve species.'));
    }
};

export const updateSpeciesThunk = (id: string, speciesData: { species_class?: string; name?: string }) => async (dispatch: any) => {
    try {
        const updatedSpecies = await updateSpecies(id, speciesData);
        dispatch(updateSpeciesSuccess(updatedSpecies));
    } catch (error) {
        dispatch(updateSpeciesFailure('Failed to update species.'));
    }
};

export const deleteSpeciesThunk = (id: string) => async (dispatch) => {
    try {
        await deleteSpecies(id);
        dispatch(deleteSpeciesSuccess(id));
    } catch (error) {
        dispatch(deleteSpeciesFailure('Failed to delete species.'));
    }
};

export const searchSpeciesByReference = (query: string) => async (dispatch: any) => {
    try {
        const searchSpecies = await searchReferences(query);
        dispatch(searchSpeciesSuccess(searchSpecies));
    } catch (error) {
        dispatch(searchSpeciesFailure('Failed to search species by reference.'));
    }
};