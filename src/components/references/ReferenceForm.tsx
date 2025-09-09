import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { createReferenceThunk, updateReferenceThunk } from '@store/thunks/referenceThunk';
import { Reference } from '@/helpers/types';
import { useNotification } from '@/components/commons/NotificationContext';
import Spinner from '@/components/commons/Spinner';
import { RootState } from '@/store/store';

interface ReferenceFormProps {
    reference?: Reference;
    onSave?: () => void;
    onCancel?: () => void;
    onReferenceCreated?: (reference: Reference) => void;
}

const ReferenceForm: React.FC<ReferenceFormProps> = ({ reference, onSave, onCancel, onReferenceCreated }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { addNotification } = useNotification();
    const { loading } = useSelector((state: RootState) => state.getReferences);
    const [formData, setFormData] = useState<Reference>({
        type: reference?.type || '',
        title: reference?.title || '',
        author: reference?.author || '',
        doi: reference?.doi || '',
        year: reference?.year || new Date().getFullYear(),
        thesis_level: reference?.thesis_level || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (reference?.id) {
                await dispatch(updateReferenceThunk(reference.id, formData, addNotification));
            } else {
                const newReference = await dispatch(createReferenceThunk(formData, addNotification));
                if (newReference) {
                    onReferenceCreated?.(newReference);
                    setFormData({
                        type: '',
                        title: '',
                        author: '',
                        doi: '',
                        year: new Date().getFullYear(),
                        thesis_level: '',
                    });
                }
            }
            if (onSave) onSave();
        } catch (error) {
            console.error('Failed to save reference:', error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{reference?.id === undefined ? t('reference.add') : t('reference.edit')}</h1>

                <form onSubmit={handleSubmit} className="p-4">
                    {/* ... form fields ... */}
                     <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('reference.form_fields.type')}</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="" disabled>{t('reference.form_fields.type_placeholder')}</option>
                            <option value="Article">Article</option>
                            <option value="Manuscript">Manuscript</option>
                            <option value="Thesis">Thesis</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('reference.form_fields.title')}</label>
                        <input
                            required
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder={t('reference.form_fields.title')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('reference.form_fields.author')}</label>
                        <input
                            required
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder={t('reference.form_fields.author')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {formData.type === 'Thesis' && (
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('reference.form_fields.thesis_level')}</label>
                            <select
                                required
                                name="thesis_level"
                                value={formData.thesis_level}
                                onChange={handleChange}
                                // placeholder={t('reference.form_fields.thesis_level')}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option className='placeholder' value="" disabled>{t('reference.form_fields.thesis_level')}</option>
                                <option value="masters">Masters</option>
                                <option value="phd">PhD</option>
                            </select>
                        </div>
                    )}
                    {(formData.type !== 'Thesis' && formData.type !== 'Manuscript' && formData.type) && (
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('reference.form_fields.doi')}</label>
                            <input
                                required
                                type="text"
                                name="doi"
                                value={formData.doi}
                                onChange={handleChange}
                                placeholder={t('reference.form_fields.doi')}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    )}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('reference.form_fields.year')}</label>
                        <select
                            required
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
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
                        {loading ? <Spinner size={5} /> : reference ? t('reference.edit') : t('reference.add')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReferenceForm;