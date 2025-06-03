import axios from 'axios';
import { Location } from '@/helpers/types';

const API_URL = 'http://localhost:8000/api/locations';
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
});

export const createLocation = async (locationData: Location) => {
    try {
        const response = await axios.post(`${API_URL}/`, locationData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        throw new Error('Failed to create location.');
    }
};

export const listLocations = async (queryParams: Record<string, string> = {}) => {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await axios.get(`${API_URL}?${queryString}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch locations.');
    }
};

export const retrieveLocation = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        throw new Error('Failed to retrieve location.');
    }
};

export const updateLocation = async (id: string, locationData: { name?: string; latitude?: number; longitude?: number }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/`, locationData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update location.');
    }
};

export const deleteLocation = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}/`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete location.');
    }
};