import React, {useState} from 'react';
import SpeciesList from '@components/species/SpeciesList';
import SpeciesForm from '@components/species/SpeciesForm';
import AdminLayout from '@components/layouts/AdminLayout';
import { Reference, SearchedSpecie, Species } from '@/helpers/types';

const SpeciesPage: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [selectedSpecies, setSelectedSpecies] = useState<any>(null);

    const handleEditSpecies = (species: Species | SearchedSpecie | Reference) => {
        console.log('species to edit', species);

        setSelectedSpecies({...species});
        setView('form');
    };

    const handleFormClose = () => {
        setView('list');
        setSelectedSpecies(null);
    };

    return (
        <AdminLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Species Dashboard</h1>
                <div className="mb-4">
                    <button
                        className={`px-4 py-2 mr-2 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => { setView('list'); setSelectedSpecies(null); }}
                    >
                        View Species
                    </button>
                    <button
                        className={`px-4 py-2 ${view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => { setView('form'); setSelectedSpecies(null); }}
                    >
                        Add Species
                    </button>
                </div>
                <div>
                    {view === 'list' && <SpeciesList onEditSpecies={handleEditSpecies} />}
                    {view === 'form' && <SpeciesForm initialData={{...selectedSpecies}} onFormClose={handleFormClose} />}
                </div>
            </div>
        </AdminLayout>
    );
};

export default SpeciesPage;