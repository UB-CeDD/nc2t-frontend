import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import AdminPage from './pages/dashboard/admin/AdminPage';
import RouteService from './services/RouteService';
import NotFoundPage from '@/pages/NotFoundPage';
import CompoundPage from "@/pages/dashboard/CompoundPage.tsx";
import LocationPage from "@/pages/dashboard/LocationPage";
import ReferencePage from './pages/dashboard/ReferencePage';
import UsersPage from './pages/dashboard/admin/UsersPage';
import AddEditUser from '@components/users/AddEditUser';
import SpeciesPage from './pages/dashboard/SpeciesPage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/dashboard/*"
                element={
                    <RouteService redirectTo="/login">
                        <Routes>
                            <Route path="compounds" element={<CompoundPage />} />
                            <Route path="references" element={<ReferencePage />} />
                            <Route path="locations" element={<LocationPage />} />
                            <Route path="species" element={<SpeciesPage />} />
                        </Routes>
                    </RouteService>
                }
            />
            <Route
                path="/admin/*"
                element={
                    <RouteService redirectTo="/login">
                        <Routes>
                            <Route path="dashboard" element={<AdminPage />} />
                            <Route path="users" element={<UsersPage />} />
                            <Route path="users/add" element={<AddEditUser />} />
                        </Routes>
                    </RouteService>
                }
            />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default App;