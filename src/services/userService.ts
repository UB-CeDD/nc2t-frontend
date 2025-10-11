import api from './api';

const API_URL = '/users';

export const addUser = async (userData) => {
    try {
        const response = await api.post(`${API_URL}/create/`, userData);
        return response.data;
    } catch (error) {
        console.error('Failed to add user:', error);
        throw error;
    }
};

export const editUser = async (id, userData) => {
    try {
        const response = await api.put(`${API_URL}/${id}/`, userData);
        return response.data;
    } catch (error) {
        console.error('Failed to edit user:', error);
        throw error;
    }
};

export const listUsers = async (filters = {}) => {
    try {
        const response = await api.get(`${API_URL}/`, {
            params: filters,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to list users:', error);
        throw error;
    }
};

export const getUserDetails = async (id) => {
    try {
        const response = await api.get(`${API_URL}/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Failed to get user details:', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`${API_URL}/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete user:', error);
        throw error;
    }
};