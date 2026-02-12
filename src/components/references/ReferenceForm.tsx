import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { createReferenceThunk, updateReferenceThunk } from '@store/thunks/referenceThunk';
import { Reference } from '@/helpers/types';
import { useNotification } from '@/components/commons/NotificationContext';
import Spinner from '@/components/commons/Spinner';
import { RootState } from '@/store/store';
import { serializeFullAuthors } from '@/helpers/authors';

interface ReferenceFormProps {
    reference?: Reference;
    onSave?: () => void;
    onCancel?: () => void;
    onReferenceCreated?: (reference: Reference) => void;
}

type Author = { first: string; middle: string; last: string };

const ReferenceForm: React.FC<ReferenceFormProps> = ({ reference, onSave, onCancel, onReferenceCreated }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { addNotification } = useNotification();
    const { loading } = useSelector((state: RootState) => state.getReferences);

    // Helper to parse an existing author string in the serializeFullAuthors format: "Last, First Middle; Last2, First2"
    const parseAuthorString = (authorStr?: string): Author[] => {
        if (!authorStr) return [{ first: '', middle: '', last: '' }];
        // Authors are separated by semicolons in serialized form
        const parts = authorStr.split(';').map(p => p.trim()).filter(Boolean);
        if (parts.length === 0) return [{ first: '', middle: '', last: '' }];
        return parts.map(part => {
            // Expect "Last, First Middle" or a fallback like "First Middle Last"
            if (part.includes(',')) {
                const [lastRaw, restRaw] = part.split(',');
                const last = (lastRaw || '').trim();
                const rest = (restRaw || '').trim();
                const restParts = rest.split(' ').filter(Boolean);
                const first = restParts.length > 0 ? restParts[0] : '';
                const middle = restParts.length > 1 ? restParts.slice(1).join(' ') : '';
                return { first, middle, last } as Author;
            }
            // Fallback: split by spaces, last token is last name
            const words = part.split(' ').filter(Boolean);
            if (words.length === 1) {
                return { first: words[0], middle: '', last: '' } as Author;
            }
            const lastFallback = words[words.length - 1];
            const firstFallback = words[0];
            const middleFallback = words.length > 2 ? words.slice(1, -1).join(' ') : '';
            return { first: firstFallback, middle: middleFallback, last: lastFallback } as Author;
        });
    };

    const [formData, setFormData] = useState<Reference>({
        type: reference?.type || '',
        title: reference?.title || '',
        author: reference?.author || '',
        doi: reference?.doi || '',
        year: reference?.year || new Date().getFullYear(),
        thesis_level: reference?.thesis_level || '',
    });

    // maintain authors as structured data in the form UI
    const [authors, setAuthors] = useState<Author[]>(() => parseAuthorString(reference?.author));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAuthorChange = (index: number, field: keyof Author, value: string) => {
        const next = [...authors];
        next[index] = { ...next[index], [field]: value };
        setAuthors(next);
    };

    const addAuthor = () => setAuthors(prev => [...prev, { first: '', middle: '', last: '' }]);
    const removeAuthor = (index: number) => setAuthors(prev => prev.filter((_, i) => i !== index));

    // When saving, serialize structured authors into full names for backend storage
    const formatAuthorsForSubmit = (authorList: Author[]): string => {
        const parts = authorList.map(a => ({ first: a.first, middle: a.middle, last: a.last }));
        return serializeFullAuthors(parts);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // prepare payload: set author string from structured authors
            const payload = { ...formData, author: formatAuthorsForSubmit(authors) } as Reference;

            if (reference?.id) {
                await dispatch(updateReferenceThunk(reference.id, payload, addNotification));
            } else {
                const newReference = await dispatch(createReferenceThunk(payload, addNotification));
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
                    setAuthors([{ first: '', middle: '', last: '' }]);
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

                    {/* Multiple authors input */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('reference.form_fields.author')}</label>
                        <div className="space-y-2">
                            {authors.map((a, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        value={a.first}
                                        onChange={(e) => handleAuthorChange(idx, 'first', e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/2 p-2.5"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Middle name"
                                        value={a.middle}
                                        onChange={(e) => handleAuthorChange(idx, 'middle', e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/2 p-2.5"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        value={a.last}
                                        onChange={(e) => handleAuthorChange(idx, 'last', e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/2 p-2.5"
                                    />
                                    <button type="button" onClick={() => removeAuthor(idx)} className="text-red-500">Remove</button>
                                </div>
                            ))}
                            <div>
                                <button type="button" onClick={addAuthor} className="bg-gray-200 px-3 py-1 rounded">Add author</button>
                                <p className="text-xs text-gray-500 mt-1">Full names are saved to the database ("Last, First Middle; ..."). Displayed in lists/tables as: "Last F.M., NextLast A.B." (last name then initials with dots, authors separated by comma).</p>
                            </div>
                        </div>
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
