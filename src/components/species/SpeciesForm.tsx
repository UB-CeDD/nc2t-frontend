import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpeciesThunk, updateSpeciesThunk } from '@store/thunks/speciesThunk';
import { useNotification } from '../commons/NotificationContext';
import { Compound, Reference, Location, SearchedSpecies, Species } from '@/helpers/types';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { listCompounds } from '@/services/compoundService';
import { listReferences } from '@/services/referenceService';
import { listLocations } from '@/services/locationService';
import CompoundForm from '@components/compounds/CompoundForm';
import ReferenceForm from '@components/references/ReferenceForm';
import LocationForm from '@components/locations/LocationForm';
import Modal from '@components/commons/Modal';
import Spinner from '@/components/commons/Spinner';
import { RootState } from '@/store/store';

interface SpeciesFormProps {
    initialData?: Species | SearchedSpecies | { reference: Reference };
    onSave?: () => void;
    onCancel?: () => void;
    onSpeciesCreated?: (species: Species) => void;
    onFormClose: () => void;
}

const SpeciesForm: React.FC<SpeciesFormProps> = ({ initialData, onFormClose, onCancel, onSave, onSpeciesCreated }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const routeLocation = useLocation();
    const referenceFromState = routeLocation.state?.reference;
    const { addNotification } = useNotification();
    const { loading } = useSelector((state: RootState) => state.getSpecies);

    console.log('Initial Data:', initialData);
        const dateInputRef = useRef<HTMLInputElement>(null);

    
    // Compute today's date in local timezone as YYYY-MM-DD for HTML date input max
    const todayStr = (() => {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    })();

    // Helper to format any Date/string into YYYY-MM-DD for date inputs
    const formatDateToYYYYMMDD = (value: Date | string): string => {
        const d = typeof value === 'string' ? new Date(value) : value;
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };


    const getInitialFormData = () => {
        if (initialData) {
            if ('id' in initialData) { // Covers both Species and SearchedSpecies
                const data = { ...initialData };
                if (data.collection_date) {
                    data.collection_date = formatDateToYYYYMMDD(data.collection_date as Date | string);
                }
                return data;
            }
            if ('reference' in initialData) { // New species from reference
                const ref = (initialData as { reference: Reference }).reference;
                return {
                    name: ref.title,
                    references: [ref],
                };
            }
        }
        return {
            name: '',
            references: [],
            compound_codes: [],
            compounds: [],
            recent_name: '',
            kingdom: '',
            family: '',
            harvest_sites: [],
            collection_date: '',
            storage_locations: [],
        };
    };

    const [formData, setFormData] = useState<Partial<Species>>(getInitialFormData());
    const [compoundInput, setCompoundInput] = useState('');
    const [showCompoundModal, setShowCompoundModal] = useState(false);
    const [availableCompounds, setAvailableCompounds] = useState<Compound[]>([]);
    const [selectedCompounds, setSelectedCompounds] = useState<Compound[]>([]);

    const [referenceInput, setReferenceInput] = useState('');
    const [showReferenceModal, setShowReferenceModal] = useState(false);
    const [availableReferences, setAvailableReferences] = useState<Reference[]>([]);
    const [selectedReferences, setSelectedReferences] = useState<Reference[]>([]);

    const [siteInput, setSiteInput] = useState('');
    const [showSiteModal, setShowSiteModal] = useState(false);
    const [availableSites, setAvailableSites] = useState<Location[]>([]);
    const [selectedSites, setSelectedSites] = useState<Location[]>([]);

    const [herbariumInput, setHerbariumInput] = useState('');
    const [showHerbariumModal, setShowHerbariumModal] = useState(false);
    const [availableHerbaria, setAvailableHerbaria] = useState<Location[]>([]);
    const [selectedStorageLocations, setSelectedStorageLocations] = useState<Location[]>([]);

      useEffect(() => {
        const initial = getInitialFormData();
        setFormData(initial);

        // Preload selected compounds from detail if present; fallback to IDs
        if ((initial as any).compounds_detail && (initial as any).compounds_detail.length > 0) {
            setSelectedCompounds((initial as any).compounds_detail as Compound[]);
        } else if ((initial as any).compounds && (initial as any).compounds.length > 0) {
            if (typeof (initial as any).compounds[0] === 'number') {
                const fetchSelectedCompounds = async () => {
                    const allCompounds = await listCompounds();
                    const compoundIds = (initial as any).compounds as number[];
                    const fetchedCompounds = allCompounds.filter(c => compoundIds.includes(c.id));
                    setSelectedCompounds(fetchedCompounds);
                };
                fetchSelectedCompounds();
            } else if (typeof (initial as any).compounds[0] === 'string') {
                const fetchSelectedCompounds = async () => {
                    const allCompounds = await listCompounds();
                    const compoundIds = (initial as any).compounds as string[];
                    const fetchedCompounds = allCompounds.filter(c => compoundIds.includes(String(c.id)));
                    setSelectedCompounds(fetchedCompounds);
                };
                fetchSelectedCompounds();
            } else {
                setSelectedCompounds((initial as any).compounds as Compound[]);
            }
        }

        // Preload selected references from detail if present; fallback to IDs
        if ((initial as any).references_detail && (initial as any).references_detail.length > 0) {
            setSelectedReferences((initial as any).references_detail as Reference[]);
        } else if ((initial as any).references && (initial as any).references.length > 0) {
            if (typeof (initial as any).references[0] === 'number') {
                const fetchSelectedReferences = async () => {
                    const allReferences = await listReferences();
                    const referenceIds = (initial as any).references as number[];
                    const fetchedReferences = allReferences.filter(r => referenceIds.includes(r.id));
                    setSelectedReferences(fetchedReferences);
                };
                fetchSelectedReferences();
            } else if (typeof (initial as any).references[0] === 'string') {
                const fetchSelectedReferences = async () => {
                    const allReferences = await listReferences();
                    const referenceIds = (initial as any).references as string[];
                    const fetchedReferences = allReferences.filter(r => referenceIds.includes(String(r.id)));
                    setSelectedReferences(fetchedReferences);
                };
                fetchSelectedReferences();
            } else {
                setSelectedReferences((initial as any).references as Reference[]);
            }
        }

        // Preload selected sites (place of collection) from initial data
        const initialSitesDetail = (initial as any).harvest_sites_detail;
        const initialSites = (initial as any).harvest_sites || (initial as any).sites;
        if (initialSitesDetail && initialSitesDetail.length > 0) {
            setSelectedSites(initialSitesDetail as Location[]);
        } else if (initialSites && initialSites.length > 0) {
            if (typeof initialSites[0] === 'number') {
                const fetchSelectedSites = async () => {
                    const allLocations = await listLocations();
                    const siteIds = initialSites as number[];
                    const fetchedSites = allLocations.filter(l => siteIds.includes(l.id));
                    setSelectedSites(fetchedSites);
                };
                fetchSelectedSites();
            } else if (typeof initialSites[0] === 'string') {
                const fetchSelectedSites = async () => {
                    const allLocations = await listLocations();
                    const siteIds = initialSites as string[];
                    const fetchedSites = allLocations.filter(l => siteIds.includes(String(l.id)));
                    setSelectedSites(fetchedSites);
                };
                fetchSelectedSites();
            } else {
                setSelectedSites(initialSites as Location[]);
            }
        }

        // Preload selected herbariums (storage locations) from initial data
        const initialHerbariaDetail = (initial as any).storage_locations_detail;
        const initialHerbaria = (initial as any).storage_locations || (initial as any).herbariums;
        if (initialHerbariaDetail && initialHerbariaDetail.length > 0) {
            setSelectedStorageLocations(initialHerbariaDetail as Location[]);
        } else if (initialHerbaria && initialHerbaria.length > 0) {
            if (typeof initialHerbaria[0] === 'number') {
                const fetchSelectedStorageLocations = async () => {
                    const allLocations = await listLocations();
                    const storageLocationIds = initialHerbaria as number[];
                    const fetchedStorageLocations = allLocations.filter(h => storageLocationIds.includes(h.id));
                    setSelectedStorageLocations(fetchedStorageLocations);
                };
                fetchSelectedStorageLocations();
            } else if (typeof initialHerbaria[0] === 'string') {
                const fetchSelectedStorageLocations = async () => {
                    const allLocations = await listLocations();
                    const storageLocationIds = initialHerbaria as string[];
                    const fetchedStorageLocations = allLocations.filter(h => storageLocationIds.includes(String(h.id)));
                    setSelectedStorageLocations(fetchedStorageLocations);
                };
                fetchSelectedStorageLocations();
            } else {
                setSelectedStorageLocations(initialHerbaria as Location[]);
            }
        }

    }, [initialData, referenceFromState]);

    const handleSearchCompound = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setCompoundInput(inputValue);
        if (inputValue.trim() === '') {
            setAvailableCompounds([]);
            return;
        }
        try {
            const allCompounds = await listCompounds(inputValue ? { q: inputValue } : {});
            const filtered = allCompounds.filter(compound =>
                compound.smiles.toLowerCase().includes(inputValue.toLowerCase()) ||
                compound.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                compound.compound_class.toLowerCase().includes(inputValue.toLowerCase()) ||
                compound.subclass.toLowerCase().includes(inputValue.toLowerCase())
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
        setCompoundInput('');
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

    const handleRemoveSelectedCompound = (compoundId: number | string) => {
        setSelectedCompounds(prev => prev.filter(c => String(c.id) !== String(compoundId)));
    };

    const handleSearchReference = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setReferenceInput(inputValue);
        
        if (inputValue.trim() === '') {
            setAvailableReferences([]);
            return;
        }
        try {
            const allReferences = await listReferences(inputValue ? { q: inputValue } : {});
            
            const filtered = allReferences.filter(reference =>
                reference.title.toLowerCase().includes(inputValue.toLowerCase()) ||
                reference.author.toLowerCase().includes(inputValue.toLowerCase()) ||
                reference.doi.toLowerCase().includes(inputValue.toLowerCase()) ||
                reference.thesis_level?.toLowerCase().includes(inputValue.toLowerCase()) ||
                reference.author.toLowerCase().includes(inputValue.toLowerCase())
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
        setSelectedReferences(prev => [...prev, newReference]);
        setReferenceInput('');
    };

    const handleSelectExistingReference = (reference: Reference) => {
        setSelectedReferences(prev => {
            if (!prev.some(r => r.id === reference.id)) {
                return [...prev, reference];
            }
            return prev;
        });
        setReferenceInput('');
        setAvailableReferences([]);
    };

    const handleRemoveSelectedReference = (referenceId: number | string) => {
        setSelectedReferences(prev => prev.filter(r => String(r.id) !== String(referenceId)));
    };

    const handleSiteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSiteInput(e.target.value);
    };

    const handleSearchSite = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSiteInput(inputValue);

        if (inputValue.trim() === '') {
            setAvailableSites([]);
            return;
        }
        try {
            const allLocations = await listLocations(inputValue ? { q: inputValue } : {});
            setAvailableSites(allLocations);
        } catch (error) {
            console.error('Error searching sites:', error);
            setAvailableSites([]);
        }
    };

    const handleAddSite = () => {
        setShowSiteModal(true);
    };

    const handleSiteCreated = (newLocation: Location) => {
        setSelectedSites(prev => [...prev, newLocation]);
        setSiteInput('');
    };

    const handleSelectExistingSite = (location: Location) => {
        setSelectedSites(prev => {
            if (!prev.some(s => s.id === location.id)) {
                return [...prev, location];
            }
            return prev;
        });
        setSiteInput('');
        setAvailableSites([]);
    };

    const handleRemoveSelectedSite = (siteId: number | string) => {
        setSelectedSites(prev => prev.filter(s => String(s.id) !== String(siteId)));
    };

    // const handleHerbariumInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setHerbariumInput(e.target.value);
    // };

    const handleSearchHerbarium = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setHerbariumInput(inputValue);

        if (inputValue.trim() === '') {
            setAvailableHerbaria([]);
            return;
        }
        try {
            const allLocations = await listLocations(inputValue ? { q: inputValue } : {});
            setAvailableHerbaria(allLocations);
        } catch (error) {
            console.error('Error searching herbaria:', error);
            setAvailableHerbaria([]);
        }
    };

    const handleAddHerbarium = () => {
        setShowHerbariumModal(true);
    };

    const handleHerbariumCreated = (newLocation: Location) => {
        setSelectedStorageLocations(prev => [...prev, newLocation]);
        setHerbariumInput('');
    };

    const handleSelectExistingHerbarium = (location: Location) => {
        setSelectedStorageLocations(prev => {
            if (!prev.some(h => h.id === location.id)) {
                return [...prev, location];
            }
            return prev;
        });
        setHerbariumInput('');
        setAvailableHerbaria([]);
    };
    
    const handleRemoveSelectedHerbarium = (herbariumId: number | string) => {
        setSelectedStorageLocations(prev => prev.filter(h => String(h.id) !== String(herbariumId)));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // ... (the rest of the state declarations)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalFormData: any = {
            ...formData,
            compounds: selectedCompounds.map(c => String(c.id)).filter(Boolean),
            references: selectedReferences.map(r => String(r.id)).filter(Boolean),
            harvest_sites: selectedSites.map(s => String(s.id)).filter(Boolean),
            storage_locations: selectedStorageLocations.map(h => String(h.id)).filter(Boolean),
        };
        try {
            console.log('Submitting form data:', finalFormData);

            let result;
            if (formData.id) {
                result = dispatch(updateSpeciesThunk(formData.id.toString(), finalFormData, addNotification));
            } else {
                result = dispatch(createSpeciesThunk(finalFormData as Species, addNotification));
            }
            // Only close the form if the thunk was successful
            if (result && !result.error) {
                onFormClose();
            }
        } catch (error) {
            // Notification is handled in the thunk
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full ">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{formData.id ? t('species.edit') : t('species.add')}</h1>
                <form onSubmit={handleSubmit} className="p-4">
                     <div className="mb-6 flex flex-col">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.kingdom')}</label>
                        <select
                            id="kingdom"
                            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                            value={formData.kingdom || ''}
                            name='kingdom'
                            onChange={handleChange}
                        >
                            <option className="placeholder" value="" disabled>Select a kingdom</option>
                            {['Plantae', 'Animalia', 'Protista', 'Fungi', 'Monera'].map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                     <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.family')}</label>
                        <input
                            required
                            id="family"
                            type="text"
                            name="family"
                            value={formData.family || ''}
                            onChange={handleChange}
                            placeholder={t('species.form_fields.family')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.name')}</label>
                        <input
                            required
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            placeholder={t('species.form_fields.name')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.recent_name')}</label>
                        <input
                            id="recent_name"
                            type="text"
                            name="recent_name"
                            value={formData.recent_name || ''}
                            onChange={handleChange}
                            placeholder={t('species.form_fields.recent_name')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.trad_uses')}</label>
                        <input
                            id="trad_uses"
                            type="text"
                            name="trad_uses"
                            value={formData.trad_uses || ''}
                            onChange={handleChange}
                            placeholder={t('species.form_fields.trad_uses')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.part_used')}</label>
                        <select
                            required
                            id="part_used"
                            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                            value={formData.part_used || ''}
                            name='part_used'
                            onChange={handleChange}
                        >
                            <option className="placeholder" value="" disabled>Select a part used</option>
                            {['Whole plant', 'Stem bark', 'Roots', 'Whole Sponge', 'Leaves', 'Whole fungi', 'Whole mushroom', "Aerial parts", "Seeds", 'Whole corals', 'Twigs'].map((item, index) => (
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
                                onChange={handleSearchReference}
                                // onBlur={handleSearchReference}
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
                            <div className="mt-0 border border-gray-300 rounded-lg p-2 max-h-40 overflow-y-auto">
                                {availableReferences.map(reference => (
                                    <div key={reference.id} className="flex justify-between items-center p-1 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectExistingReference(reference)}>
                                        <span>
                                            {reference.title}
                                            {reference.doi ? (
                                                <> ({(() => {
                                                    const doi = reference.doi as string;
                                                    const isUrl = doi.startsWith('http://') || doi.startsWith('https://');
                                                    const href = isUrl ? doi : `https://doi.org/${encodeURIComponent(doi)}`;
                                                    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{doi}</a>;
                                                })()})</>
                                            ) : null}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-2">
                            {selectedReferences.map(reference => (
                                <span key={reference.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                                    {reference.title}
                                    <button type="button" onClick={() => handleRemoveSelectedReference(reference.id)} className="flex-shrink-0 ml-1.5 inline-flex text-blue-400 hover:text-blue-500 focus:outline-none focus:text-blue-500">
                                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.compound_codes')}</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={compoundInput}
                                onChange={handleSearchCompound}
                                // onBlur={handleSearchCompound}
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
                                        <span>{compound.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-2">
                            {selectedCompounds.map(compound => (
                                <span key={compound.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                                    {compound.name}
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
                                onChange={handleSearchSite}
                                // onBlur={handleSearchSite}
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
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-2">
                            {selectedSites.map(site => (
                                 <span key={site.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                                    {site.name}
                                    <button type="button" onClick={() => handleRemoveSelectedSite(site.id)} className="flex-shrink-0 ml-1.5 inline-flex text-blue-400 hover:text-blue-500 focus:outline-none focus:text-blue-500">
                                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div
                        className="mb-6"
                        onClick={(e) => {
                            const el = dateInputRef.current;
                            if (!el) return;
                            // Avoid re-trigger when clicking directly on input
                            if (e.target instanceof HTMLInputElement && e.target.type === 'date') return;
                            if (typeof (el as any).showPicker === 'function') {
                                (el as any).showPicker();
                            } else {
                                el.focus();
                                el.click();
                            }
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        <label htmlFor="collection_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.collection_date')}</label>
                        <input
                            id="collection_date"
                            type="date"
                            name="collection_date"
                            ref={dateInputRef}
                            value={formData.collection_date ? (typeof formData.collection_date === 'string' ? formData.collection_date : formatDateToYYYYMMDD(formData.collection_date)) : ''}
                            onChange={handleChange}
                            max={todayStr}
                            placeholder={t('species.form_fields.collection_date')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('species.form_fields.herbarium')}</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={herbariumInput}
                                onChange={handleSearchHerbarium}
                                // onBlur={handleSearchHerbarium}
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
                            {selectedStorageLocations.map(herbarium => (
                                <span key={herbarium.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                                    {herbarium.name}
                                    <button type="button" onClick={() => handleRemoveSelectedHerbarium(herbarium.id)} className="flex-shrink-0 ml-1.5 inline-flex text-blue-400 hover:text-blue-500 focus:outline-none focus:text-blue-500">
                                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                        disabled={loading}
                    >
                        {t('cancel')}
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? <Spinner size={5} /> : formData.id ? 'Update species' : 'Create species'}
                    </button>
                    </div>
                </form>
            </div>

            {/* ... (modals) ... */}
            <Modal show={showReferenceModal} onClose={() => setShowReferenceModal(false)}>
                <ReferenceForm onReferenceCreated={handleReferenceCreated} onCancel={()=>setShowReferenceModal(false)} />
            </Modal>
            <Modal show={showCompoundModal} onClose={() => setShowCompoundModal(false)}>
                <CompoundForm onCompoundCreated={handleCompoundCreated} onCancel={()=>setShowCompoundModal(false)} />
            </Modal>
            <Modal show={showSiteModal} onClose={() => setShowSiteModal(false)}>
                <LocationForm onLocationCreated={handleSiteCreated} onCancel={()=>setShowSiteModal(false)}  />
            </Modal>
            <Modal show={showHerbariumModal} onClose={() => setShowHerbariumModal(false)}>
                <LocationForm onLocationCreated={handleHerbariumCreated}  onCancel={()=>setShowHerbariumModal(false)} isHerbarium={true}/>
            </Modal>
        </div>
    );
};

export default SpeciesForm;
