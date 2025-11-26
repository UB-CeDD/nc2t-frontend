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
        window.location.href = '/login';
    }
};
