import api from './api';
import { Location } from '@/helpers/types';

const API_URL = '/locations';

export const createLocation = async (locationData: Location) => {
    try {
        const response = await api.post(`${API_URL}/`, locationData);
        return response.data;
    } catch {
        throw new Error('Failed to create location.');
    }
};

export const listLocations = async (queryParams: Record<string, string> = {}) => {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await api.get(`${API_URL}?${queryString}`);
        return response.data;
    } catch {
        throw new Error('Failed to fetch locations.');
    }
};

export const searchLocations = async (query: string) => {
    try {
        const response = await api.get(`${API_URL}/?search=${query}`);
        return response.data;
    } catch (error) {
        console.error('Failed to search locations:', error);
        throw new Error('Failed to search locations.');
    }
};

export const retrieveLocation = async (id: string) => {
    try {
        const response = await api.get(`${API_URL}/${id}/`);
        return response.data;
    } catch {
        throw new Error('Failed to retrieve location.');
    }
};

export const updateLocation = async (id: string, locationData: { name?: string; latitude?: number; longitude?: number }) => {
    try {
        const response = await api.put(`${API_URL}/${id}/`, locationData);
        return response.data;
    } catch {
        throw new Error('Failed to update location.');
    }
};

export const deleteLocation = async (id: string) => {
    try {
        const response = await api.delete(`${API_URL}/${id}/`);
        return response.data;
    } catch {
        throw new Error('Failed to delete location.');
    }
};