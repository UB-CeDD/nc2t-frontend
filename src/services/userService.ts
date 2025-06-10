import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
});
export const addUser = async (userData) => {
    const response = await axios.post(`${API_URL}/create`, userData, { headers: getHeaders()});
    return response.data;
};

export const editUser = async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}/`, userData, {headers: getHeaders()});
    return response.data;
};

export const listUsers = async (filters = {}) => {
    const response = await axios.get(`${API_URL}/`, {
        params: filters,
        headers: getHeaders(),
    });
    return response.data;
};

export const getUserDetails = async (id) => {
    const response = await axios.get(`${API_URL}/${id}/`, {headers: getHeaders()});
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}/`, {headers: getHeaders()});
    return response.data;
};