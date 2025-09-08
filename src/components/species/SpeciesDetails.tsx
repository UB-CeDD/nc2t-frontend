
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveSpeciesThunk, updateSpeciesThunk } from '@/store/thunks/speciesThunk';
import { RootState } from '@/store/store';
import { Species } from '@/helpers/types';
import CompoundList from '../compounds/CompoundList';
import ReferenceList from '../references/ReferenceList';
import LocationList from '../locations/LocationList';
import HerbariumList from '../commons/HerbariumList';
import SpeciesUserManagement from './SpeciesUserManagement';
import Modal from '../commons/Modal';
import SpeciesHerbariumManager from './SpeciesHerbariumManager';
import SpeciesSiteManager from './SpeciesSiteManager';
import SpeciesReferenceManager from './SpeciesReferenceManager';
import SpeciesCompoundManager from './SpeciesCompoundManager';
import { useNotification } from '../commons/NotificationContext'; // New import

const SpeciesDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { addNotification } = useNotification(); // New hook call

    const { species, loading, error } = useSelector((state: RootState) => state.getSpecies);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Species>>({});
    const [showCompoundModal, setShowCompoundModal] = useState(false);
    const [showReferenceModal, setShowReferenceModal] = useState(false);
    const [showSiteModal, setShowSiteModal] = useState(false);
    const [showHerbariumModal, setShowHerbariumModal] = useState(false); // New state

    useEffect(() => {
        if (id) {
            dispatch(retrieveSpeciesThunk(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (species) {
            setFormData(species);
        }
    }, [species]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{species.name}</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Recent Name</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="recent_name"
                            value={formData.recent_name || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    ) : (
                        <p>{species.recent_name}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Kingdom</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="kingdom"
                            value={formData.kingdom || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    ) : (
                        <p>{species.kingdom}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Family</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="family"
                            value={formData.family || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    ) : (
                        <p>{species.family}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Traditional Uses</label>
                    {isEditing ? (
                        <textarea
                            name="trad_uses"
                            value={formData.trad_uses || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    ) : (
                        <p>{species.trad_uses}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Part Used</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="part_used"
                            value={formData.part_used || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    ) : (
                        <p>{species.part_used}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Preparation</label>
                    {isEditing ? (
                        <textarea
                            name="preparation"
                            value={formData.preparation || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    ) : (
                        <p>{species.preparation}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Administration</label>
                    {isEditing ? (
                        <textarea
                            name="administration"
                            value={formData.administration || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    ) : (
                        <p>{species.administration}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Effects</label>
                    {isEditing ? (
                        <textarea
                            name="effects"
                            value={formData.effects || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    ) : (
                        <p>{species.effects}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Toxicity</label>
                    {isEditing ? (
                        <textarea
                            name="toxicity"
                            value={formData.toxicity || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    ) : (
                        <p>{species.toxicity}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    {isEditing ? (
                        <textarea
                            name="notes"
                            value={formData.notes || ''}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    ) : (
                        <p>{species.notes}</p>
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

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Compounds</h2>
                <CompoundList compounds={species.compounds as any} />
                <button
                    onClick={() => setShowCompoundModal(true)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Manage Compounds
                </button>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">References</h2>
                <ReferenceList references={species.references as any} />
                <button
                    onClick={() => setShowReferenceModal(true)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Manage References
                </button>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Sites</h2>
                <LocationList locations={species.sites as any} />
                <button
                    onClick={() => setShowSiteModal(true)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Manage Sites
                </button>
            </div>
            
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Herbariums</h2>
                <HerbariumList herbariums={species.herbariums as any} />
                <button
                    onClick={() => setShowHerbariumModal(true)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Manage Herbariums
                </button>
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
        </div>
    );
};

export default SpeciesDetails;
