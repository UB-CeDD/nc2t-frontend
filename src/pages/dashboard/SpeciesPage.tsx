import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpeciesList from '@components/species/SpeciesList';
import AdminLayout from '@components/layouts/AdminLayout';
import { Reference, SearchedSpecies, Species } from '@/helpers/types';
import { useTranslation } from "react-i18next";
import { RootState, AppDispatch } from '@/store/store';
import { clearCurrentSpecies } from '@/store/actions/speciesActions';
import { useNavigate } from 'react-router-dom';

const SpeciesPage: React.FC = () => {
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [view, setView] = useState<'list' | 'form'>('list');
    const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

    const { currentSpecies } = useSelector((state: RootState) => state.getSpecies);

    useEffect(() => {
        if (currentSpecies) {
            setSelectedSpecies(currentSpecies);
        }
    }, [currentSpecies]);

    const handleEditSpecies = (species: Species | SearchedSpecies | Reference) => {
        navigate('/dashboard/add-species', { state: { specie: species } });
    };

    return (
        <AdminLayout>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold mb-4">{t('species.dashboard')}</h1>
                    <button
                        className={'px-4 py-2 bg-blue-500 text-white'}
                        onClick={() => { navigate('/dashboard/add-species'); }}
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