import React, {useState} from 'react';
import SpeciesList from '@components/species/SpeciesList';
import SpeciesForm from '@components/species/SpeciesForm';
import AdminLayout from '@components/layouts/AdminLayout';

const SpeciesPage: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');

    return (
        <AdminLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Species Dashboard</h1>
                <div className="mb-4">
                    <button
                        className={`px-4 py-2 mr-2 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setView('list')}
                    >
                        View Species
                    </button>
                    <button
                        className={`px-4 py-2 ${view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setView('form')}
                    >
                        Add Species
                    </button>
                </div>
                <div>
                    {view === 'list' && <SpeciesList />}
                    {view === 'form' && <SpeciesForm />}
                </div>
            </div>
        </AdminLayout>
    );
};

export default SpeciesPage;