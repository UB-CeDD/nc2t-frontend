import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

export const apiRequest = async (method: string, endpoint: string, data?: any) => {
    const headers = getHeaders();
    const url = `${API_URL}${endpoint}`;

    return await axios({
        method,
        url,
        headers,
        data,
    });
};

// export const getUser = async () => {
//     return await apiRequest('GET', '/user/');
// };

export const login = async (email: string, password: string) => {
    return await apiRequest('post', '/admin/login/', { email, password });
};

export const logout = async () => {
    return await apiRequest('post', '/admin/logout/');
};