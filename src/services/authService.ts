import api from './api';

export const login = async (username: string, password: string) => {
    try {
        const response = await api.post(`/login/`, { username, password });

        const { user, access, refresh } = response.data;
        return { access, refresh, user, status: response.status };
    } catch {
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const validateRefreshToken = async (refreshToken: string) => {
    try {
        const response = await api.post(`/token/refresh/`, { refresh: refreshToken });
        return { status: response.status };
    } catch {
        throw new Error('Token validation failed.');
    }
};

export const logout = async () => {
    console.log('got here');
    
    return await api.post(`/logout/`, {
        refresh: localStorage.getItem('refreshToken')
    }).then(response => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_user');
        localStorage.removeItem('isAuthenticated');
        return response.status;
    }).catch(error => {
        console.error('Logout failed:', error);
        throw new Error('Logout failed. Please try again.');
    });
};