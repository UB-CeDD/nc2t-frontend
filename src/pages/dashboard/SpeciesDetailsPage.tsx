
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveSingleSpeciesThunk, updateSpeciesThunk } from '@/store/thunks/speciesThunk';
import { RootState } from '@/store/store';
import { Compound, Herbarium, Reference, Site, Species } from '@/helpers/types';
import ReferenceList from '@components/references/ReferenceList';
import LocationList from '@components/locations/LocationList';
import HerbariumList from '@components/commons/HerbariumList';
import SpeciesUserManagement from '@components/species/SpeciesUserManagement';
import SpeciesHerbariumManager from '@components/species/SpeciesHerbariumManager';
import Modal from '@components/commons/Modal';
import SpeciesSiteManager from '@components/species/SpeciesSiteManager';
import SpeciesReferenceManager from '@components/species/SpeciesReferenceManager';
import SpeciesCompoundManager from '@components/species/SpeciesCompoundManager';
import AdminLayout from '@components/layouts/AdminLayout';
import { useTranslation } from "react-i18next";
import { AppDispatch } from '@/store/store';
import Table from '@components/commons/Table';


const SpeciesDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const { species, loading, error } = useSelector((state: RootState) => state.getSpecies);
    console.log('SpeciesDetailsPage render', { species, loading, error });    
    // Add notification handler
    const addNotification = (message: string, type: 'success' | 'warning' | 'error') => {
        // You can implement your notification logic here, e.g. using a toast library
        // For now, just log to console
        console.log(`[${type}] ${message}`);
    };

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Species>>({});
    const [showCompoundModal, setShowCompoundModal] = useState(false);
    const [showReferenceModal, setShowReferenceModal] = useState(false);
    const [showSiteModal, setShowSiteModal] = useState(false);
    const [showHerbariumModal, setShowHerbariumModal] = useState(false); // New state
    const [selectedCompound, setSelectedCompound] = useState<Compound | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(retrieveSingleSpeciesThunk(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (species) {
            setFormData(species);
        }
    }, [species]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        if (id && formData) {
            dispatch(updateSpeciesThunk(id, formData, addNotification));
            setIsEditing(false);
        }
    };

    const handleSaveCompounds = (selectedCompoundIds: number[]) => {
        if (id) {
            dispatch(updateSpeciesThunk(id, { compounds: selectedCompoundIds }, addNotification));
            setShowCompoundModal(false);
        }
    };

    const handleSaveReferences = (selectedReferenceIds: number[]) => {
        if (id) {
            dispatch(updateSpeciesThunk(id, { references: selectedReferenceIds }, addNotification));
            setShowReferenceModal(false);
        }
    };

    const handleSaveSites = (selectedSiteIds: number[]) => {
        if (id) {
            dispatch(updateSpeciesThunk(id, { sites: selectedSiteIds }, addNotification));
            setShowSiteModal(false);
        }
    };

    const handleSaveHerbariums = (selectedHerbariumIds: number[]) => {
        if (id) {
            dispatch(updateSpeciesThunk(id, { herbariums: selectedHerbariumIds }, addNotification));
            setShowHerbariumModal(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!species) {
        return <div>Species not found.</div>;
    }

    const cmpdColumns = [
        { key: 'name', label: t('compound.form_fields.name') },
        { key: 'compound_class', label: t('compound.form_fields.class') },
        { key: 'subclass', label: t('compound.form_fields.sub_class') },
        { key: 'smiles', label: t('compound.form_fields.smile') },
    ];

    const refColumns = [
        { key: 'type', label: t('reference.form_fields.type') },
        { key: 'author', label: t('reference.form_fields.author') },
        { key: 'year', label: t('reference.form_fields.year') },
        { key: 'doi', label: t('reference.form_fields.doi') },
    ];

    const siteColumns = [
        { key: 'name', label: t('site.form_fields.name') },
        { key: 'location', label: t('site.form_fields.location') },
    ];

    const herbariumColumns = [
        { key: 'name', label: t('herbarium.form_fields.name') },
        { key: 'location', label: t('herbarium.form_fields.location') },
        { key: 'date', label: t('herbarium.form_fields.date') },
    ];

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{species.name}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className='bg-white p-8 rounded shadow-md w-full block items-center'>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            {isEditing ? 'Cancel' : 'Edit'}
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="bg-blue-500">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0l-9.192 9.192a2 2 0 00-.497.879l-1.414 5.657a1 1 0 001.212 1.212l5.657-1.414a2 2 0 00.879-.497l9.192-9.192a2 2 0 000-2.828l-3.01-3.01zm-2.828 1.414l3.01 3.01-9.192 9.192-3.01-3.01 9.192-9.192z" />
                            </svg> */}
                        </button>
                    </div>
                    <div className='grid grid-cols-5 gap-2 items-center'>
                        <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">Recent Name:</label>
                        <div className="col-span-4">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="recent_name"
                                    value={formData.recent_name || ''}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            ) : (
                                <b className="flex-1">{species.recent_name}</b>
                            )}
                        </div>
                    </div>
                    <div className='grid grid-cols-5 mt-2 gap-2 items-center'>
                        <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">Kingdom:</label>
                                                <div className="col-span-4">
                        {isEditing ? (
                            <input
                                type="text"
                                name="kingdom"
                                value={formData.kingdom || ''}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        ) : (
                            <b className="flex-1">{species.kingdom}</b>
                        )}
                        </div>
                    </div>
                    <div className='grid grid-cols-5 mt-2 gap-2 items-center'>
                        <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">Family:</label>
                                                <div className="col-span-4">

                        {isEditing ? (
                            <input
                                type="text"
                                name="family"
                                value={formData.family || ''}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        ) : (
                            <b className="flex-1">{species.family}</b>
                        )}
                        </div>
                    </div>
                    <div className='grid grid-cols-5 mt-2 gap-2 items-center'>
                        <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">Traditional Uses:</label>
                                                <div className="col-span-4">

                        {isEditing ? (
                            <textarea
                                name="trad_uses"
                                value={formData.trad_uses || ''}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        ) : (
                            <b>{species.trad_uses}</b>
                        )}
                        </div>
                    </div>
                    <div className='grid grid-cols-5 mt-2 gap-2 items-center'>
                        <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">Part Used:</label>
                        <div className="col-span-4">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="part_used"
                                    value={formData.part_used || ''}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            ) : (
                                <b className="flex-1">{species.part_used}</b>
                            )}
                        </div>
                    </div>
                    {/* <div className='grid grid-cols-5 mt-2 gap-2 items-center'>
                        <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">Preparation:</label>
                                                <div className="col-span-4">
                        {isEditing ? (
                            <textarea
                                name="preparation"
                                value={formData.preparation || ''}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        ) : (
                            <b>{species.preparation}</b>
                        )}
                        </div>
                    </div> */}
                    <div className='grid grid-cols-5 mt-2 gap-2 items-center'>
                        <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">Administration:</label>
                        <div className="col-span-4">
                            {isEditing ? (
                                <textarea
                                    name="administration"
                                    value={formData.administration || ''}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            ) : (
                                <b>{species.administration}</b>
                            )}
                        </div>
                    </div>
                    <div className='grid grid-cols-5 mt-2 gap-2 items-center'>
                        <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">Effects:</label>
                        <div className="col-span-4">
                            {isEditing ? (
                                <textarea
                                    name="effects"
                                    value={formData.effects || ''}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            ) : (
                                <b>{species.effects}</b>
                            )}
                        </div>
                    </div>
                    {/* <div className='grid grid-cols-5 mt-2 gap-2 items-center'>
                        <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">Bio Activity:</label>
                                                <div className="col-span-4">

                        {isEditing ? (
                            <textarea
                                name="bio_activity"
                                value={formData.bio_activity || ''}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        ) : (
                            <b>{species.bio_activity}</b>
                        )}
                        </div>
                    </div> */}
                    <div className='grid grid-cols-5 mt-2 gap-2 items-center'>
                        <label className="text-sm font-medium text-gray-700 min-w-fit col-span-1">Notes:</label>
                        <div className="col-span-4">
                        {isEditing ? (
                            <textarea
                                name="notes"
                                value={formData.notes || ''}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        ) : (
                            <b>{species.notes}</b>
                        )}
                        </div>
                    </div>
                </div>
                <div className='bg-white p-8 rounded shadow-md w-full items-center gap-2'>
                    <div className="flex justify-between items-center mb-6 w-full">
                        <h2 className="text-xl font-bold">Compounds</h2>

                        <b>{species?.compounds?.length}</b>
                    </div>
                    {species?.compounds && species.compounds.length > 0 ? (
                            <ul className="">
                                {species.compounds.map((compound) => (
                                    <li key={compound.id}
                                        className="rounded text-left hover:bg-gray-100 cursor-pointer"
                                        onClick={() => setSelectedCompound(compound)}
                                    >
                                        <h3 className="font-bold">{compound.name}</h3>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No compounds associated with this species.</p>
                        )}

                        {/* Compound details modal */}
                        {selectedCompound && (
                            <Modal show={true} onClose={() => setSelectedCompound(null)}>
                                <div className="p-8 text-left bg-white rounded shadow-md">
                                    <h2 className="text-xl font-bold mb-2">{selectedCompound.name}</h2>
                                    <p><b>Class:</b> {selectedCompound.compound_class}</p>
                                    <p><b>Subclass:</b> {selectedCompound.subclass}</p>
                                    <p><b>SMILES:</b> {selectedCompound.smiles}</p>
                                    {/* Add more fields as needed */}
                                </div>
                            </Modal>
                        )}
                </div>
            </div>

            {isEditing && (
                <div className="mt-4">
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Save Changes
                    </button>
                </div>
            )}

            <div className="bg-white p-8 rounded shadow-md w-full items-center gap-2 mt-3">
                <h2 className="text-xl font-bold mb-4">References</h2>
                {/* <ReferenceList references={species.references as any} /> */}
                {/* <Table columns={refColumns} data={species?.references as Reference[]} /> */}
                <button
                    onClick={() => setShowReferenceModal(true)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Manage References
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-8 rounded shadow-md w-full items-center gap-2 mt-3">
                    <h2 className="text-xl font-bold mb-4">Place of collection</h2>
                    {/* <Table columns={siteColumns} data={species.sites as Site[]} /> */}
                    {/* <LocationList locations={species.sites as any} /> */}
                    <button
                        onClick={() => setShowSiteModal(true)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Manage Sites
                    </button>
                </div>
                <div className="bg-white p-8 rounded shadow-md w-full items-center gap-2 mt-3">
                    <h2 className="text-xl font-bold mb-4">Herbariums</h2>
                    {/* <Table columns={herbariumColumns} data={species.herbariums as Herbarium[]} /> */}
                    <button
                        onClick={() => setShowHerbariumModal(true)}
                    >
                        Manage Herbariums
                    </button>
            </div>
            </div>
            <div className="mt-8">
                <SpeciesUserManagement />
            </div>

            <Modal show={showHerbariumModal} onClose={() => setShowHerbariumModal(false)}>
                <SpeciesHerbariumManager
                    initialHerbariums={species.herbariums as Herbarium[]}
                    onSave={handleSaveHerbariums}
                />
            </Modal>

            <Modal show={showSiteModal} onClose={() => setShowSiteModal(false)}>
                <SpeciesSiteManager
                    initialSites={species.sites as Site[]}
                    onSave={handleSaveSites}
                />
            </Modal>

            <Modal show={showReferenceModal} onClose={() => setShowReferenceModal(false)}>
                <SpeciesReferenceManager
                    initialReferences={species.references as Reference[]}
                    onSave={handleSaveReferences}
                />
            </Modal>

            <Modal show={showCompoundModal} onClose={() => setShowCompoundModal(false)}>
                <SpeciesCompoundManager
                    initialCompounds={species.compounds as Compound[]}
                    onSave={handleSaveCompounds}
                />
            </Modal>
        </AdminLayout>
    );
};

export default SpeciesDetailsPage;
