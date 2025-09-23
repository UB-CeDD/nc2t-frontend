import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RouteService from './services/RouteService';
import NotFoundPage from '@/pages/NotFoundPage';
import CompoundPage from "@/pages/dashboard/CompoundPage.tsx";
import LocationPage from "@/pages/dashboard/LocationPage";
import ReferencePage from './pages/dashboard/ReferencePage';
import UsersPage from './pages/dashboard/admin/UsersPage';
import AddEditUser from '@components/users/AddEditUser';
import SpeciesPage from './pages/dashboard/SpeciesPage';
import UserDetails from '@components/users/UserDetails';
import SpeciesDetailsPage from './pages/dashboard/SpeciesDetailsPage';
import ErrorBoundary from '@/components/commons/ErrorBoundary';
import AdminLayout from '@/components/layouts/AdminLayout';
import AdminPage from './pages/dashboard/admin/AdminPage';

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Admin Layout for dashboard routes */}
                <Route
                    path="/dashboard/*">
                    <Route path="compounds" element={<CompoundPage />} />
                    <Route path="references" element={<ReferencePage />} />
                    <Route path="locations" element={<LocationPage />} />
                    <Route path="species" element={<SpeciesPage />} />
                    <Route path="species/:id" element={<SpeciesDetailsPage />} />
                </Route>

                {/* Admin Layout for admin routes */}
                <Route
                    path="/admin/*">
                    <Route path="dashboard" element={<AdminPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/add" element={<AddEditUser />} />
                    <Route path="users/:id" element={<UserDetails />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;