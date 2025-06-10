import React, { useState } from 'react';
import ReferenceList from '@/components/references/ReferenceList';
import ReferenceForm from '@/components/references/ReferenceForm';
import ReferenceDetails from '@/components/references/ReferenceDetails';
import { useTranslation } from "react-i18next";
import AdminLayout from '@components/layouts/AdminLayout';

const ReferencePage: React.FC = () => {
    const { t } = useTranslation();
    const [selectedReferenceId, setSelectedReferenceId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [view, setView] = useState<'list' | 'form'>('list');

    const handleSelectReference = (id: string) => {
        setSelectedReferenceId(id);
        setIsEditing(false);
    };

    const handleAddReference = () => {
        setSelectedReferenceId(null);
        setIsEditing(true);
    };

    const handleEditReference = (id: string) => {
        setSelectedReferenceId(id);
        setIsEditing(true);
    };

    const handleSave = () => {
        setSelectedReferenceId(null);
        setIsEditing(false);
    };

    return (
        <AdminLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">{t('reference.reference')}</h1>
                <div className="mb-4">
                    <button
                        className={`px-4 py-2 mr-2 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setView('list')}
                    >
                        {t('reference.all')}
                    </button>
                    <button
                        className={`px-4 py-2 ${view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setView('form')}
                    >
                        {t('reference.add')}
                    </button>
                </div>
                {/* {!selectedReferenceId && !isEditing && (
                    <div>
                        <button onClick={handleAddReference}>{t('reference.add')}</button>
                        <ReferenceList />
                    </div>
                )}
                {isEditing && (
                    <ReferenceForm
                        reference={selectedReferenceId ? { id: selectedReferenceId } : undefined}
                        onSave={handleSave}
                        onCancel={() => setIsEditing(false)}
                    />
                )}
                {selectedReferenceId && !isEditing && (
                    <ReferenceDetails id={selectedReferenceId} />
                )} */}

                {view === 'list' && <ReferenceList />}
                {view === 'form' && <ReferenceForm />}
            </div>
        </AdminLayout>
    );
};

export default ReferencePage;