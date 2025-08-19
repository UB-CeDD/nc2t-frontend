// ncct_backend/services/ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '@store/store';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo: string;
}

const RouteService: React.FC<ProtectedRouteProps> = ({ children, redirectTo }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} />;
};

export default RouteService;