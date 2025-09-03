import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpeciesThunk, updateSpeciesThunk } from '@store/thunks/speciesThunk';
import { Compound, Reference, Location, SearchedSpecie, Species } from '@/helpers/types';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { listCompounds, createCompound } from '@/services/compoundService';
import { listReferences } from '@/services/referenceService';
import { listLocations } from '@/services/locationService';
import CompoundForm from '@components/compounds/CompoundForm';
import ReferenceForm from '@components/references/ReferenceForm';
import LocationForm from '@components/locations/LocationForm';
import Modal from '@components/commons/Modal';

interface SpeciesFormProps {
    initialData?: Species | SearchedSpecie
    onFormClose: () => void;
}

const SpeciesForm: React.FC<SpeciesFormProps> = ({ initialData, onFormClose }) => {
    console.log('initialData', initialData);
    
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const reference = location.state?.reference;
    

    const [formData, setFormData] = useState<Species>({
        name: initialData?.reference?.name || '',
        references: initialData?.reference?.references || [], 
        compound_codes: initialData?.reference?.compound_codes || [],
        recent_name: initialData?.reference?.recent_name || '',
        kingdom: initialData?.reference?.kingdom || '',
        family: initialData?.reference?.family || '',
        site: initialData?.reference?.site || '',
        herbarium: initialData?.reference?.herbarium || '',
    });

    console.log('formData', formData);
    

    const [compoundInput, setCompoundInput] = useState('');
    const [showCompoundModal, setShowCompoundModal] = useState(false);
    const [availableCompounds, setAvailableCompounds] = useState<Compound[]>([]);
    const [selectedCompounds, setSelectedCompounds] = useState<Compound[]>([]);

    const [referenceInput, setReferenceInput] = useState('');
    const [showReferenceModal, setShowReferenceModal] = useState(false);
    const [availableReferences, setAvailableReferences] = useState<Reference[]>([]);
    const [selectedReference, setSelectedReference] = useState<Reference | null>(null);

    const [siteInput, setSiteInput] = useState('');
    const [showSiteModal, setShowSiteModal] = useState(false);
    const [availableSites, setAvailableSites] = useState<Location[]>([]);
    const [selectedSite, setSelectedSite] = useState<Location | null>(null);

    const [herbariumInput, setHerbariumInput] = useState('');
    const [showHerbariumModal, setShowHerbariumModal] = useState(false);
    const [availableHerbaria, setAvailableHerbaria] = useState<Location[]>([]);
    const [selectedHerbarium, setSelectedHerbarium] = useState<Location | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData as Species);
            // Assuming speciesToEdit.compound_codes contains IDs and we need to fetch full compound objects
            // This is a simplified approach, in a real app you might fetch these in parallel or have them pre-loaded
            if (initialData.compound_codes && initialData.compound_codes.length > 0) {
                const fetchSelectedCompounds = async () => {
                    const fetchedCompounds: Compound[] = [];
                    for (const code of initialData.compound_codes) {
                        // This assumes listCompounds can filter by code or you have a retrieveCompoundById
                        // For now, a simple filter on all compounds (less efficient for large datasets)
                        const allCompounds = await listCompounds();
                        const foundCompound = allCompounds.find(c => c.id === code || c.smiles === code); // Assuming code can be ID or smiles
                        if (foundCompound) {
                            fetchedCompounds.push(foundCompound);
                        }
                    }
                    setSelectedCompounds(fetchedCompounds);
                };
                fetchSelectedCompounds();
            }
            if (initialData.reference) {
                const fetchSelectedReference = async () => {
                    try {
                        const allReferences = await listReferences();
                        const foundReference = allReferences.find(r => r.id === initialData.reference);
                        if (foundReference) {
                            setSelectedReference(foundReference);
                        }
                    } catch (error) {
                        console.error('Error fetching selected reference:', error);
                    }
                };
                fetchSelectedReference();
            }
            if (initialData.site) {
                const fetchSelectedSite = async () => {
                    try {
                        const allLocations = await listLocations();
                        const foundLocation = allLocations.find(l => l.id === initialData.site);
                        if (foundLocation) {
                            setSelectedSite(foundLocation);
                        }
                    } catch (error) {
                        console.error('Error fetching selected site:', error);
                    }
                };
                fetchSelectedSite();
            }
            if (initialData.herbarium) {
                const fetchSelectedHerbarium = async () => {
                    try {
                        const allLocations = await listLocations();
                        const foundLocation = allLocations.find(l => l.id === initialData.herbarium);
                        if (foundLocation) {
                            setSelectedHerbarium(foundLocation);
                        }
                    } catch (error) {
                        console.error('Error fetching selected herbarium:', error);
                    }
                };
                fetchSelectedHerbarium();
            }
        } else if (reference) {
            fetch(`https://api.gbif.org/v1/species/search?q=${reference.title}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        const species = data.results[0];
                        setFormData({
                            name: species.scientificName || reference.title,
                            kingdom: species.kingdom || '',
                            family: species.family || '',
                            recent_name: '',
                            references: '',
                            compound_codes: [],
                            site: '',
                            herbarium: '',
                        });
                    } else {
                        setFormData({
                            name: reference.title || '',
                            kingdom: '',
                            family: '',
                            recent_name: '',
                            references: '',
                            compound_codes: [],
                            site: '',
                            herbarium: '',
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching data from GBIF:', error);
                    setFormData({
                        name: reference.title || '',
                        kingdom: '',
                        family: '',
                        recent_name: '',
                        references: '',
                        compound_codes: [],
                        site: '',
                        herbarium: '',
                    });
                });
        }
    }, [initialData, reference]);

    const handleCompoundInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompoundInput(e.target.value);
    };

    const handleSearchCompound = async () => {
        if (compoundInput.trim() === '') {
            setAvailableCompounds([]);
            return;
        }
        try {
            const allCompounds = await listCompounds();
            const filtered = allCompounds.filter(compound => 
                compound.smiles.toLowerCase().includes(compoundInput.toLowerCase()) ||
                compound.compound_class.toLowerCase().includes(compoundInput.toLowerCase()) ||
                compound.subclass.toLowerCase().includes(compoundInput.toLowerCase())
            );
            setAvailableCompounds(filtered);
        } catch (error) {
            console.error('Error searching compounds:', error);
            setAvailableCompounds([]);
        }
    };

    const handleAddCompound = () => {
        setShowCompoundModal(true);
    };

    const handleCompoundCreated = (newCompound: Compound) => {
        setSelectedCompounds(prev => [...prev, newCompound]);
        setShowCompoundModal(false);
        setCompoundInput(''); // Clear input after adding
    };

    const handleSelectExistingCompound = (compound: Compound) => {
        setSelectedCompounds(prev => {
            if (!prev.some(c => c.id === compound.id)) {
                return [...prev, compound];
            }
            return prev;
        });
        setCompoundInput('');
        setAvailableCompounds([]);
    };

    const handleRemoveSelectedCompound = (compoundId: string) => {
        setSelectedCompounds(prev => prev.filter(c => c.id !== compoundId));
    };

    const handleReferenceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReferenceInput(e.target.value);
    };

    const handleSearchReference = async () => {
        if (referenceInput.trim() === '') {
            setAvailableReferences([]);
            return;
        }
        try {
            const allReferences = await listReferences();
            const filtered = allReferences.filter(reference => 
                reference.title.toLowerCase().includes(referenceInput.toLowerCase()) ||
                reference.author.toLowerCase().includes(referenceInput.toLowerCase())
            );
            setAvailableReferences(filtered);
        } catch (error) {
            console.error('Error searching references:', error);
            setAvailableReferences([]);
        }
    };

    const handleAddReference = () => {
        setShowReferenceModal(true);
    };

    const handleReferenceCreated = (newReference: Reference) => {
        setSelectedReference(newReference);
        setShowReferenceModal(false);
        setReferenceInput(''); // Clear input after adding
    };

    const handleSelectExistingReference = (reference: Reference) => {
        setSelectedReference(reference);
        setReferenceInput('');
        setAvailableReferences([]);
    };

    const handleSiteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSiteInput(e.target.value);
    };

    const handleSearchSite = async () => {
        if (siteInput.trim() === '') {
            setAvailableSites([]);
            return;
        }
        try {
            const allLocations = await listLocations();
            const filtered = allLocations.filter(location => 
                location.name.toLowerCase().includes(siteInput.toLowerCase()) ||
                location.place.toLowerCase().includes(siteInput.toLowerCase()) ||
                location.city_town.toLowerCase().includes(siteInput.toLowerCase())
            );
            setAvailableSites(filtered);
        } catch (error) {
            console.error('Error searching sites:', error);
            setAvailableSites([]);
        }
    };

    const handleAddSite = () => {
        setShowSiteModal(true);
    };

    const handleSiteCreated = (newLocation: Location) => {
        setSelectedSite(newLocation);
        setShowSiteModal(false);
        setSiteInput('');
    };

    const handleSelectExistingSite = (location: Location) => {
        setSelectedSite(location);
        setSiteInput('');
        setAvailableSites([]);
    };

    const handleHerbariumInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHerbariumInput(e.target.value);
    };

    const handleSearchHerbarium = async () => {
        if (herbariumInput.trim() === '') {
            setAvailableHerbaria([]);
            return;
        }
        try {
            const allLocations = await listLocations();
            const filtered = allLocations.filter(location => 
                location.name.toLowerCase().includes(herbariumInput.toLowerCase()) ||
                location.place.toLowerCase().includes(herbariumInput.toLowerCase()) ||
                location.city_town.toLowerCase().includes(herbariumInput.toLowerCase())
            );
            setAvailableHerbaria(filtered);
        } catch (error) {
            console.error('Error searching herbaria:', error);
            setAvailableHerbaria([]);
        }
    };

    const handleAddHerbarium = () => {
        setShowHerbariumModal(true);
    };

    const handleHerbariumCreated = (newLocation: Location) => {
        setSelectedHerbarium(newLocation);
        setShowHerbariumModal(false);
        setHerbariumInput('');
    };

    const handleSelectExistingHerbarium = (location: Location) => {
        setSelectedHerbarium(location);
        setHerbariumInput('');
        setAvailableHerbaria([]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalFormData = {
            ...formData,
            compound_codes: selectedCompounds.map(c => c.id),
            ref: selectedReference ? selectedReference.id : '',
            site: selectedSite ? selectedSite.id : '',
            herbarium: selectedHerbarium ? selectedHerbarium.id : '',
        };
        if (initialData) {
            // Update existing species
            dispatch(updateSpeciesThunk(initialData.id, finalFormData));
        } else {
            // Create new species
            dispatch(createSpeciesThunk(finalFormData));
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full ">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{initialData?.id ? t('species.add') : t('species.edit')}</h1>
                <form onSubmit={handleSubmit} className="p-4">
                     <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.name')}</label>
                        <input
                            required
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t('species.form_fields.name')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.recent_name')}</label>
                        <input
                            required
                            id="recent_name"
                            type="text"
                            name="recent_name"
                            value={formData.recent_name}
                            onChange={handleChange}
                            placeholder={t('species.form_fields.recent_name')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.kingdom')}</label>
                        <select
                            id="kingdom"
                            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                            value={formData.kingdom}
                            name='kingdom'
                            onChange={handleChange}
                        >
                            <option className="placeholder" value="" disabled>Select a kingdom</option>
                            {['Plantea'].map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.family')}</label>
                        <select
                            id="family"
                            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                            value={formData.family}
                            multiple={false}
                            name='family'
                            onChange={handleChange}
                        >
                            <option className="placeholder" value="" disabled>Select a family</option>
                            {['Euphorbiaceae', 'Acanthaceae'].map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                     <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.ref')}</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={referenceInput}
                                onChange={handleReferenceInputChange}
                                onBlur={handleSearchReference}
                                placeholder="Search or add reference"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddReference}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg w-40 hover:bg-green-600"
                            >
                                Add New
                            </button>
                        </div>
                        {availableReferences.length > 0 && (
                            <div className="mt-2 border border-gray-300 rounded-lg p-2 max-h-40 overflow-y-auto">
                                {availableReferences.map(reference => (
                                    <div key={reference.id} className="flex justify-between items-center p-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectExistingReference(reference)}>
                                        <span>{reference.title} ({reference.author}, {reference.year})</span>
                                        <span className="text-sm text-gray-500">Click to select</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-2">
                            {selectedReference && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                                    {selectedReference.title}
                                    <button type="button" onClick={() => setSelectedReference(null)} className="flex-shrink-0 ml-1.5 inline-flex text-blue-400 hover:text-blue-500 focus:outline-none focus:text-blue-500">
                                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                    
                     <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.compound_codes')}</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={compoundInput}
                                onChange={handleCompoundInputChange}
                                onBlur={handleSearchCompound}
                                placeholder="Search or add compound"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddCompound}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg w-40 hover:bg-green-600"
                            >
                                Add New
                            </button>
                        </div>
                        {availableCompounds.length > 0 && (
                            <div className="mt-2 border border-gray-300 rounded-lg p-2 max-h-40 overflow-y-auto">
                                {availableCompounds.map(compound => (
                                    <div key={compound.id} className="flex justify-between items-center p-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectExistingCompound(compound)}>
                                        <span>{compound.smiles} ({compound.compound_class})</span>
                                        <span className="text-sm text-gray-500">Click to add</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-2">
                            {selectedCompounds.map(compound => (
                                <span key={compound.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                                    {compound.smiles}
                                    <button type="button" onClick={() => handleRemoveSelectedCompound(compound.id)} className="flex-shrink-0 ml-1.5 inline-flex text-blue-400 hover:text-blue-500 focus:outline-none focus:text-blue-500">
                                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.site')}</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={siteInput}
                                onChange={handleSiteInputChange}
                                onBlur={handleSearchSite}
                                placeholder="Search or add site"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddSite}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg w-40 hover:bg-green-600"
                            >
                                Add New
                            </button>
                        </div>
                        {availableSites.length > 0 && (
                            <div className="mt-2 border border-gray-300 rounded-lg p-2 max-h-40 overflow-y-auto">
                                {availableSites.map(site => (
                                    <div key={site.id} className="flex justify-between items-center p-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectExistingSite(site)}>
                                        <span>{site.name} ({site.city_town}, {site.country})</span>
                                        <span className="text-sm text-gray-500">Click to select</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-2">
                            {selectedSite && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                                    {selectedSite.name}
                                    <button type="button" onClick={() => setSelectedSite(null)} className="flex-shrink-0 ml-1.5 inline-flex text-blue-400 hover:text-blue-500 focus:outline-none focus:text-blue-500">
                                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.herbarium')}</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={herbariumInput}
                                onChange={handleHerbariumInputChange}
                                onBlur={handleSearchHerbarium}
                                placeholder="Search or add herbarium"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddHerbarium}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg w-40 hover:bg-green-600"
                            >
                                Add New
                            </button>
                        </div>
                        {availableHerbaria.length > 0 && (
                            <div className="mt-2 border border-gray-300 rounded-lg p-2 max-h-40 overflow-y-auto">
                                {availableHerbaria.map(herbarium => (
                                    <div key={herbarium.id} className="flex justify-between items-center p-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectExistingHerbarium(herbarium)}>
                                        <span>{herbarium.name} ({herbarium.city_town}, {herbarium.country})</span>
                                        <span className="text-sm text-gray-500">Click to select</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-2">
                            {selectedHerbarium && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                                    {selectedHerbarium.name}
                                    <button type="button" onClick={() => setSelectedHerbarium(null)} className="flex-shrink-0 ml-1.5 inline-flex text-blue-400 hover:text-blue-500 focus:outline-none focus:text-blue-500">
                                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {initialData ? 'Update species' : 'Create species'}
                    </button>
                </form>
            </div>
            <Modal show={showReferenceModal} onClose={() => setShowReferenceModal(false)}>
                <ReferenceForm onReferenceCreated={handleReferenceCreated} />
            </Modal>
            <Modal show={showCompoundModal} onClose={() => setShowCompoundModal(false)}>
                <CompoundForm onCompoundCreated={handleCompoundCreated} />
            </Modal>
            <Modal show={showSiteModal} onClose={() => setShowSiteModal(false)}>
                        <LocationForm onLocationCreated={handleSiteCreated} />
            </Modal>
            <Modal show={showHerbariumModal} onClose={() => setShowHerbariumModal(false)}>
                <LocationForm onLocationCreated={handleHerbariumCreated} />
            </Modal>
        </div>
    );
};

export default SpeciesForm;