import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCompoundThunk, updateCompoundThunk } from '@store/thunks/compoundThunk.ts';
import { useTranslation } from "react-i18next";
import { Compound } from '@/helpers/types';
import { useNotification } from '@/components/commons/NotificationContext';
import Spinner from '@/components/commons/Spinner';
import { RootState } from '@/store/store';
import usePubChemLookup from '@/hooks/usePubChemLookup';

interface CompoundProps {
    compound?: Compound;
    onSave?: () => void;
    onCancel?: () => void;
    onCompoundCreated?: (compound: Compound) => void;
}

const CompoundForm: React.FC<CompoundProps> = ({ compound, onSave, onCancel, onCompoundCreated }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { addNotification } = useNotification();
    const { loading: compoundLoading } = useSelector((state: RootState) => state.getCompounds);
    const [formData, setFormData] = useState<Compound>({
        name: compound?.name || '',
        subclass: compound?.subclass || '',
        compound_class: compound?.compound_class || '',
        smiles: compound?.smiles || '',
        other_names_input: compound?.other_names_input || '',
        pubchem_id: compound?.pubchem_id,
        bio_activity: compound?.bio_activity || '',
        other_names: compound?.other_names || [],
        id: compound?.id, // if EntityModel includes id
    });

    const { loading: pubchemLoading, error: pubchemError, lookupCompound } = usePubChemLookup();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePubChemButtonClick = async () => {
        if (!formData.name) {
            addNotification(t('compound.notifications.enter_name_for_pubchem'), 'warning');
            return;
        }

        const { cid, smiles } = await lookupCompound(formData.name);        

        if (pubchemError) {
            addNotification(pubchemError, 'error');
        } else if (cid !== undefined || smiles !== undefined) {
            console.log('PubChem data fetched:', { cid, smiles });
            
            setFormData(prevData => ({
                ...prevData,
                pubchem_id: cid,
                smiles: smiles,
            }));
            addNotification(t('compound.notifications.pubchem_data_fetched'), 'success');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (compound) {
                await dispatch(updateCompoundThunk(compound.id, formData, addNotification));               
            } else {
                const resultAction = await dispatch(createCompoundThunk(formData, addNotification));
                if (resultAction && resultAction.payload) {
                    onCompoundCreated?.(resultAction.payload as Compound);
                    // Reset form fields to empty values on success
                    setFormData({
                        name: '',
                        subclass: '',
                        compound_class: '',
                        smiles: '',
                        other_names_input: '',
                        pubchem_id: undefined,
                        bio_activity: '',
                        other_names: [],
                        id: undefined,
                    });
                }
            }
            if (onSave) onSave();
        } catch (error) {
            console.error('Failed to save compound:', error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full ">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{compound?.id ? t('compound.add') : t('compound.edit')}</h1>
                <form onSubmit={handleSubmit} className="p-4">
                     <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('compound.form_fields.name')}</label>
                        <div className="flex">
                            <input
                                required
                                id="compound_name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('compound.form_fields.name')}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handlePubChemButtonClick}
                                className="ml-2 px-4 py-2 bg-green-500 text-white w-50 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                disabled={pubchemLoading}
                            >
                                {pubchemLoading ? <Spinner size={5} /> : t('compound.form_fields.lookup_pubchem')}
                            </button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                            {t('compound.form_fields.other_names')}
                        </label>
                        <input
                            id="other_names"
                            type="text"
                            name="other_names_input"
                            value={formData.other_names_input || ''}
                            onChange={e => setFormData({ ...formData, other_names_input: e.target.value })}
                            onKeyDown={e => {
                                if (
                                    (e.key === 'Enter' || e.key === ',') &&
                                    formData.other_names_input &&
                                    formData.other_names_input.trim() !== ''
                                ) {
                                    e.preventDefault();
                                    setFormData({
                                        ...formData,
                                        other_names: [
                                            ...(formData.other_names || []),
                                            formData.other_names_input.trim(),
                                        ],
                                        other_names_input: '',
                                    });
                                }
                            }}
                            placeholder={t('compound.form_fields.other_names')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {(formData.other_names || []).map((tag: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                other_names: formData.other_names.filter((_, i) => i !== idx),
                                            });
                                        }}
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                        
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('compound.form_fields.class')}</label>
                        <input
                            required
                            type="text"
                            name="compound_class"
                            value={formData.compound_class}
                            onChange={handleChange}
                            placeholder={t('compound.form_fields.class')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('compound.form_fields.sub_class')}</label>
                        <input
                            required
                            id="compound_subclass"
                            type="text"
                            name="subclass"
                            value={formData.subclass}
                            onChange={handleChange}
                            placeholder={t('compound.form_fields.sub_class')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('compound.form_fields.pubchem_id')}</label>
                        <input
                            type="number"
                            name="pubchem_id"
                            value={formData.pubchem_id || ''}
                            onChange={handleChange}
                            placeholder={t('compound.form_fields.pubchem_id')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('compound.form_fields.smile')}</label>
                        <input
                            required
                            type="text"
                            name="smiles"
                            value={formData.smiles}
                            onChange={handleChange}
                            placeholder={t('compound.form_fields.smile')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('compound.form_fields.bio_activity')}</label>
                        <input
                            type="text"
                            name="bio_activity"
                            value={formData.bio_activity || ''}
                            onChange={handleChange}
                            placeholder={t('compound.form_fields.bio_activity')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                        disabled={compoundLoading}
                    >
                        {t('cancel')}
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={compoundLoading}
                    >
                        {compoundLoading ? <Spinner size={5} /> : compound ? 'Update Compound' : 'Create Compound'}
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompoundForm;