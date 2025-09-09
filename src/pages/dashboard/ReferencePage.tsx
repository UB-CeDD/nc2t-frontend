import React, { useState } from 'react';
import ReferenceList from '@/components/references/ReferenceList';
import ReferenceForm from '@/components/references/ReferenceForm';
import { useTranslation } from "react-i18next";
import AdminLayout from '@components/layouts/AdminLayout';
import { Reference } from '@/helpers/types';

const ReferencePage: React.FC = () => {
    const { t } = useTranslation();
    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingReference, setEditingReference] = useState<Reference | undefined>(undefined);

    const handleEditReference = (reference: Reference) => {
        setEditingReference(reference);
        setView('form');
    };

    const handleCloseForm = () => {
        setEditingReference(undefined);
        setView('list');
    };

    return (
        <AdminLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">{t('reference.reference')}</h1>
                <div className="mb-4">
                    <button
                        className={`px-4 py-2 mr-2 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setView('list');
                            setEditingReference(undefined); // Clear editing reference when switching to list view
                        }}
                    >
                        {t('reference.all')}
                    </button>
                    <button
                        className={`px-4 py-2 ${view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setView('form');
                            setEditingReference(undefined); // Clear editing reference when switching to add form
                        }}
                    >
                        {t('reference.add')}
                    </button>
                </div>
                {view === 'list' && <ReferenceList onEditReference={handleEditReference} />}
                {view === 'form' && <ReferenceForm reference={editingReference} onCancel={handleCloseForm} onSave={handleCloseForm} />}
            </div>
        </AdminLayout>
    );
};

export default ReferencePage;