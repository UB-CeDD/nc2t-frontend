import React from 'react';
import SpeciesList from '@components/species/SpeciesList';
import AdminLayout from '@components/layouts/AdminLayout';
import { Reference, SearchedSpecies, Species } from '@/helpers/types';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router';

const SpeciesPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleEditSpecies = (species: Species | SearchedSpecies | Reference) => {
        navigate(`/species/edit/${species.id}`, { state: { specie: species } });
    };

    return (
        <AdminLayout>
            <div className="p-4">
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-4">{t('species.dashboard')}</h1>

                    <button
                        onClick={() => navigate('/dashboard/species/add')}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        {t('species.add')}
                    </button>
                </div>
                <SpeciesList onEditSpecies={handleEditSpecies} />
            </div>
        </AdminLayout>
    );
};

export default SpeciesPage;