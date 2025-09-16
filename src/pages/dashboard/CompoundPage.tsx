import React, {useState} from 'react';
import CompoundList from '@components/compounds/CompoundList';
import CompoundForm from '@components/compounds/CompoundForm';
import AdminLayout from '@components/layouts/AdminLayout';
import { Compound } from '@/helpers/types';

const CompoundPage: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingCompound, setEditingCompound] = useState<Compound | undefined>(undefined);

    const handleEditCompound = (compound: Compound) => {
        setEditingCompound(compound);
        setView('form');
    };

    const handleCloseForm = () => {
        setEditingCompound(undefined);
        setView('list');
    };

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Compounds Dashboard</h1>
                <div className="mb-4">
                    <button
                        className={`px-4 py-2 mr-2 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setView('list');
                            setEditingCompound(undefined); // Clear editing compound when switching to list view
                        }}
                    >
                        View Compounds
                    </button>
                    <button
                        className={`px-4 py-2 ${view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setView('form');
                            setEditingCompound(undefined); // Clear editing compound when switching to add form
                        }}
                    >
                        Add Compound
                    </button>
                </div>
                <div>
                    {view === 'list' && <CompoundList onEditCompound={handleEditCompound} />}
                    {view === 'form' && <CompoundForm compound={editingCompound} onClose={handleCloseForm} />}
                </div>
            </div>
        </>
    );
};

export default CompoundPage;