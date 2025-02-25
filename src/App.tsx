import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import AdminPage from './pages/dashboard/admin/AdminPage';
import RouteService from './services/RouteService';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={
                <RouteService redirectTo="/login">
                    <AdminPage />
                </RouteService>
            } />
        </Routes>
    );
};

export default App;