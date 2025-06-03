import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import AdminPage from './pages/dashboard/admin/AdminPage';
import RouteService from './services/RouteService';
import NotFoundPage from '@/pages/NotFoundPage';
import CompoundPage from "@/pages/dashboard/CompoundPage.tsx";
import LocationManagerPage from "@/pages/dashboard/LocationManagerPage.tsx";

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
                            <Route path="admin" element={<AdminPage />} />
                            <Route path="compounds" element={<CompoundPage />} />
                            <Route path="locations" element={<LocationManagerPage />} />
                        </Routes>
                    </RouteService>
                }
            />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default App;