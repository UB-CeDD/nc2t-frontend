import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCompoundThunk, updateCompoundThunk } from '@store/thunks/compoundThunk.ts';
import { useTranslation } from "react-i18next";
import { Compound } from '@/helpers/types';

const CompoundForm: React.FC<{ compoundToEdit?: Compound }> = ({ compoundToEdit }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<Compound>({
        subclass: compoundToEdit?.subclass || '',
        compound_class: compoundToEdit?.compound_class || '',
        smiles: compoundToEdit?.smiles || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (compoundToEdit) {
            // Update existing compound
            dispatch(updateCompoundThunk(compoundToEdit.id, formData));
        } else {
            // Create new compound           
            dispatch(createCompoundThunk(formData));
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full ">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{compoundToEdit?.id ? t('compound.add') : t('compound.edit')}</h1>
                <form onSubmit={handleSubmit} className="p-4">
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
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {compoundToEdit ? 'Update Compound' : 'Create Compound'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompoundForm;