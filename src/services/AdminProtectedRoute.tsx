import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '@store/store';

interface AdminProtectedRouteProps {
    redirectTo?: string;
    allowedRoles: string[];
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ redirectTo = '/unauthorized', allowedRoles }) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};

export default AdminProtectedRoute;