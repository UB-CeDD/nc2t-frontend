import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import AdminLayout from '@components/layouts/AdminLayout';
import LocationList from '@components/locations/LocationList';
import LocationForm from '@components/locations/LocationForm';
import { Location } from '@/helpers/types';

const LocationPage: React.FC = () => {
    const { t } = useTranslation();

    const [view, setView] = useState<'list' | 'form'>('list');
    const [editingLocation, setEditingLocation] = useState<Location | undefined>(undefined);

    const handleEditLocation = (location: Location) => {
        setEditingLocation(location);
        setView('form');
    };

    const handleCloseForm = () => {
        setEditingLocation(undefined);
        setView('list');
    };

    return (
        <AdminLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">{t('location.location')}</h1>
                <div className="mb-4">
                    <button
                        className={`px-4 py-2 mr-2 ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setView('list');
                            setEditingLocation(undefined); // Clear editing location when switching to list view
                        }}
                    >
                        {t('location.all')}
                    </button>
                    <button
                        className={`px-4 py-2 ${view === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setView('form');
                            setEditingLocation(undefined); // Clear editing location when switching to add form
                        }}
                    >
                        {t('location.add')}
                    </button>
                </div>
                {view === 'list' && <LocationList onEditLocation={handleEditLocation} />}
                {view === 'form' && <LocationForm location={editingLocation} onCancel={handleCloseForm} onSave={handleCloseForm} />}
            </div>
        </AdminLayout>
    );
};

export default LocationPage;