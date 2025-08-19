import { Compound } from '@/helpers/types';
import api from './api';

const API_URL = '/compounds/';

export const createCompound = async (compoundData: Compound ) => {
    try {        
        if (!compoundData || !compoundData.smiles) {
            throw new Error('Compound data is incomplete. SMILES is required.');
        }
        if (!compoundData.compound_class) {
            throw new Error('Compound class is required.');
        }
        // Make the API call to create the compound
        const response = await api.post(API_URL, compoundData);
        console.log('Compound created successfully:', response);
        
        return response;
    } catch {
        throw new Error('Failed to create compound.');
    }
};

export const listCompounds = async (queryParams: Record<string, string> = {}) => {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await api.get(`${API_URL}?${queryString}`);
        return response;
    } catch {
        throw new Error('Failed to fetch compounds.');
    }
};

export const retrieveCompound = async (id: string) => {
    try {
        console.log(id);
        // const response = await makeApiCall('get', `${API_URL}/${id}/`);
        // return response;
    } catch {
        throw new Error('Failed to retrieve compound.');
    }
};

export const updateCompound = async (id: string, compoundData: { compound_class?: string; smiles?: string }) => {
    try {
        console.log(id, compoundData);
        // const response = await makeApiCall('put', `${API_URL}/${id}/`, compoundData);
        // return response;
    } catch {
        throw new Error('Failed to update compound.');
    }
};

export const deleteCompound = async (id: string) => {
    try {
        console.log(id);
        // const response = await makeApiCall('delete', `${API_URL}/${id}/`);
        // return response;
    } catch {
        throw new Error('Failed to delete compound.');
    }
};