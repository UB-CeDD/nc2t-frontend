import axios from 'axios';

const API_URL = 'http://localhost:8000/api/compounds';
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
});

export const createCompound = async (compoundData: { subclass: string; compound_class: string; smiles: string }) => {
    try {
        const response = await axios.post(`${API_URL}/`, compoundData, {headers: getHeaders()});
        return response.data;
    } catch (error) {
        throw new Error('Failed to create compound.');
    }
};

export const listCompounds = async (queryParams: Record<string, string> = {}) => {
    try {
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await axios.get(`${API_URL}?${queryString}`, {headers: getHeaders()});
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch compounds.');
    }
};

export const retrieveCompound = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}/`, {headers: getHeaders()});
        return response.data;
    } catch (error) {
        throw new Error('Failed to retrieve compound.');
    }
};

export const updateCompound = async (id: string, compoundData: { compound_class?: string; smiles?: string }) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/`, compoundData, {headers: getHeaders()});
        return response.data;
    } catch (error) {
        throw new Error('Failed to update compound.');
    }
};

export const deleteCompound = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}/`, {headers: getHeaders()});
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete compound.');
    }
};