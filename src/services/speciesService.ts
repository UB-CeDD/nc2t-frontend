import api from './api';
import { Species } from '@/helpers/types';

const API_URL = '/species';

export const createSpecies = async (speciesData: Species ) => {
    try {
        const response = await api.post(`${API_URL}/`, speciesData);
        return response.data;
    } catch {
        throw new Error('Failed to create species.');
    }
};

export const listSpecies = async (queryParams: Record<string, string> = {}) => {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await api.get(`${API_URL}?${queryString}`);
        return response.data;
    } catch {
        throw new Error('Failed to fetch species.');
    }
};

export const retrieveSingleSpecies = async (id: string) => {
    try {
        const response = await api.get(`${API_URL}/${id}/`);
        console.log('retrieveSingleSpecies response:', response);

        return response.data;
    } catch {
        throw new Error('Failed to retrieve species.');
    }
};

export const updateSpecies = async (id: string, speciesData: { species_class?: string; name?: string }) => {
    try {
        const response = await api.put(`${API_URL}/${id}/`, speciesData);
        return response.data;
    } catch {
        throw new Error('Failed to update species.');
    }
};

export const deleteSpecies = async (id: string) => {
    try {
        const response = await api.delete(`${API_URL}/${id}/`);
        return response.data;
    } catch {
        throw new Error('Failed to delete species.');
    }
};

export const getSpeciesByReference = async (referenceId: number) => {
    try {
        const response = await listSpecies({ reference_id: String(referenceId) });
        if (response && response.length > 0) {
            return response[0];
        }
        return null;
    } catch {
        return null;
    }
};
