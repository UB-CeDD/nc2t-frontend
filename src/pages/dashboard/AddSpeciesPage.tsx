import React from 'react';
import SpeciesForm from '@components/species/SpeciesForm';
import AdminLayout from '@components/layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';


const AddSpeciesPage: React.FC = () => {
    const initialData = (window as unknown).history.state?.state?.specie || null;
    
    const navigate = useNavigate();
    const handleFormClose = () => {
        // setView('list');
        navigate('/dashboard/species');
    };

    return (
        <AdminLayout>
           <SpeciesForm initialData={{...initialData}} onFormClose={handleFormClose} />
        </AdminLayout>
    );
};

export default AddSpeciesPage;