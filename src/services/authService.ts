import api from './api';
import { AxiosError } from 'axios';

export const login = async (username: string, password: string) => {
    try {
        const response = await api.post(`/login/`, { username, password });

        const { user, access, refresh } = response.data;
        return { access, refresh, user, status: response.status };
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new Error(error.response.data.detail || error.response.data.message || 'Login failed. Please check your credentials.');
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('Network Error: Could not connect to the server. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error('An unexpected error occurred. Please try again.');
            }
        }
        throw new Error('An unknown error occurred during login.');
    }
};

export const validateRefreshToken = async (refreshToken: string) => {
    try {
        const response = await api.post(`/token/refresh/`, { refresh: refreshToken });
        const { access, expires_in } = response.data;
        return { status: response.status, access, expires_in };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('Dispatching unauthorized event.');
            window.dispatchEvent(new CustomEvent('unauthorized'));
        }
        throw error; // Re-throw the error so the thunk can catch it
    }
};

export const logout = async () => {
    console.log('Logout function called.');
    const user = JSON.parse(localStorage.getItem('current_user') || 'null');
    try {
        await api.post(`/logout/`, {
            user_id: user?.id,
            refresh: localStorage.getItem('refresh_token')
        });
    } catch (error) {
        console.error('Logout failed:', error);
    } finally {
        console.log('Clearing localStorage...');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_user');
        localStorage.removeItem('isAuthenticated');
        console.log('localStorage cleared.');
    }
};
