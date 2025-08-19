import api from './api';

const API_URL = '/users';

export const addUser = async (userData) => {
    const response = await api.post(`${API_URL}/create`, userData);
    return response.data;
};

export const editUser = async (id, userData) => {
    const response = await api.put(`${API_URL}/${id}/`, userData);
    return response.data;
};

export const listUsers = async (filters = {}) => {
    const response = await api.get(`${API_URL}/`, {
        params: filters,
    });
    return response.data;
};

export const getUserDetails = async (id) => {
    const response = await api.get(`${API_URL}/${id}/`);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`${API_URL}/${id}/`);
    return response.data;
};