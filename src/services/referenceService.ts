import { Reference } from "@/helpers/types";
import axios from "axios";

const API_URL = 'http://localhost:8000/api/references';
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
});

export const createReference = async (referenceData: Reference) => {
    try {
        const response = await axios.post(`${API_URL}/`, referenceData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        throw new Error('Failed to create reference.');
    }
};

export const listReferences = async (queryParams: Record<string, string> = {}) => {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await axios.get(`${API_URL}?${queryString}`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch references.');
    }
};

export const retrieveReference = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        throw new Error('Failed to retrieve reference.');
    }
};

export const updateReference = async (id: string, referenceData: { title?: string; author?: string; year?: number }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/`, referenceData, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update reference.');
    }
};

export const deleteReference = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}/`, { headers: getHeaders() });
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete reference.');
    }
};