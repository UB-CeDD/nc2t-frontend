import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { validateToken } from '@store/thunks/authThunks.ts';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
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
import AdminPage from './pages/dashboard/admin/AdminPage';
import AddSpeciesPage from './pages/dashboard/AddSpeciesPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AdminProtectedRoute from "@services/AdminProtectedRoute.tsx";

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validateToken());
    }, [dispatch]);

    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Protected dashboard routes */}
                <Route element={<AdminProtectedRoute />}>
                    <Route path="/dashboard" element={<AdminPage />} />
                    <Route path="/dashboard/compounds" element={<CompoundPage />} />
                    <Route path="/dashboard/references" element={<ReferencePage />} />
                    <Route path="/dashboard/locations" element={<LocationPage />} />
                    <Route path="/dashboard/species" element={<SpeciesPage />} />
                    <Route path="/dashboard/species/:id" element={<SpeciesDetailsPage />} />
                    <Route path="/dashboard/species/add" element={<AddSpeciesPage />} />
                    <Route path="/dashboard/species/:id/edit" element={<AddSpeciesPage />} />
                </Route>

                {/* Protected admin routes */}
                <Route element={<AdminProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin/users" element={<UsersPage />} />
                    <Route path="/admin/users/add" element={<AddEditUser />} />
                    <Route path="/admin/users/:id" element={<UserDetails />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;