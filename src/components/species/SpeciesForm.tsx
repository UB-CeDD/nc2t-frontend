import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpeciesThunk, updateSpeciesThunk } from '@store/thunks/speciesThunk.ts';
import { useTranslation } from "react-i18next";
import { Specie } from '@/helpers/types';
import { useLocation } from 'react-router-dom';

const SpeciesForm: React.FC<{ speciesToEdit?: Specie }> = ({ speciesToEdit }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const reference = location.state?.reference;

    const [formData, setFormData] = useState<Specie>({
        name: speciesToEdit?.name || '',
        species_class: speciesToEdit?.species_class || '',
        subclass: speciesToEdit?.subclass || '',
    });

    useEffect(() => {
        if (speciesToEdit) {
            setFormData(speciesToEdit);
        } else if (reference) {
            fetch(`https://api.gbif.org/v1/species/search?q=${reference.title}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        const species = data.results[0];
                        setFormData({
                            name: species.scientificName || reference.title,
                            species_class: species.class || '',
                            subclass: species.family || '',
                        });
                    } else {
                        setFormData({
                            name: reference.title || '',
                            species_class: '',
                            subclass: '',
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching data from GBIF:', error);
                    setFormData({
                        name: reference.title || '',
                        species_class: '',
                        subclass: '',
                    });
                });
        }
    }, [speciesToEdit, reference]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (speciesToEdit) {
            // Update existing species
            dispatch(updateSpeciesThunk(speciesToEdit.id, formData));
        } else {
            // Create new species
            dispatch(createSpeciesThunk(formData));
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full ">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{speciesToEdit?.id ? t('specie.add') : t('specie.edit')}</h1>
                <form onSubmit={handleSubmit} className="p-4">
                     <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('specie.form_fields.name')}</label>
                        <input
                            required
                            id="specie_name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t('specie.form_fields.name')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('specie.form_fields.sub_class')}</label>
                        <input
                            required
                            id="specie_subclass"
                            type="text"
                            name="subclass"
                            value={formData.subclass}
                            onChange={handleChange}
                            placeholder={t('specie.form_fields.sub_class')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">{t('specie.form_fields.class')}</label>
                        <input
                            required
                            type="text"
                            name="species_class"
                            value={formData.species_class}
                            onChange={handleChange}
                            placeholder={t('specie.form_fields.class')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {speciesToEdit ? 'Update Specie' : 'Create Specie'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SpeciesForm;