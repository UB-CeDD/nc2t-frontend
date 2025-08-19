import jwtDecode from 'jwt-decode';

export const isTokenExpired = (token: string | null): boolean => {
    if (!token) {
        return true;
    }
    try {
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch {
        return true;
    }
};