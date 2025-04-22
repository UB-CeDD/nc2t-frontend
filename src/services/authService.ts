import axios from 'axios';

const API_URL  = 'http://localhost:8000/api';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, { username, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { user, access, refresh } = response.data;
        return { access, refresh, user, status: response.status };
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const validateRefreshToken = async (refreshToken: string) => {
    try {
        const response = await axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);
        return { status: response.status };
    } catch (error) {
        throw new Error('Token validation failed.');
    }
};

export const logout = async () => {
    return await axios.post(`${API_URL}/admin/logout/`, {}, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
};