import React from 'react';
import SpeciesForm from '@components/species/SpeciesForm';
import AdminLayout from '@components/layouts/AdminLayout';
import { useLocation, useNavigate } from 'react-router-dom';

const AddSpeciesPage: React.FC = () => {
    const location = useLocation();
    const initialData = location.state?.specie || null;
    
    const navigate = useNavigate();
    const handleFormClose = () => {
        navigate('/dashboard/species');
    };

    return (
        <AdminLayout>
           <SpeciesForm initialData={initialData} onFormClose={handleFormClose} onCancel={handleFormClose} />
        </AdminLayout>
    );
};

export default AddSpeciesPage;