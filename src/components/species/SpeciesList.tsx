import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecies } from '@store/thunks/speciesThunk.ts';
import { RootState } from '@store/store';
import { Specie, Reference, SearchedSpecie } from "@/helpers/types.ts";
import { useTranslation } from "react-i18next";
import Table from '@components/commons/Table';
import { useNavigate } from 'react-router-dom';
import { searchSpeciesByReference } from '@store/thunks/speciesThunk.ts';
import SpeciesCard from './SpeciesCard';
import { getSpeciesByReference } from '@/services/speciesService';

const SpeciesList: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { species, error: speciesError, searchResults} = useSelector((state: RootState) => state.getSpecies);
    const { references, error: referencesError } = useSelector((state: RootState) => state.getReferences);
    const [searchText, setSearchText] = useState('');

    console.log('species', species);
    console.log('searchResults', searchResults);

    const handleSearch = async () => {
        if (searchText.trim() !== '') {
            dispatch(searchSpeciesByReference(searchText));
        }
    };

    const columns = [
        { key: 'name', label: t('specie.form_fields.name') },
        { key: 'class', label: t('specie.form_fields.class') },
        { key: 'sub_class', label: t('specie.form_fields.sub_class') },
    ];

    const handleEdit = async (row: Specie | Reference) => {
        if ('title' in row) {
            const existingSpecies = await getSpeciesByReference(row.id);
            if (existingSpecies) {
                navigate(`/species/${existingSpecies.id}`);
            } else {
                navigate('/species/new', { state: { reference: row } });
            }
        } else {
            if (row.id) {
                navigate(`/species/${row.id}`);
            }
        }
    };

    const handleDelete = (row: Specie) => {
        // Implement delete logic here
        console.log('Delete', row);
    };

    const renderActions = (row: Specie) => (
        <div className="flex justify-center items-center gap-2">
            <a className="text-blue-500 cursor-pointer" onClick={() => handleEdit(row)} >{row.id ? 'Edit' : 'Create'}</a>
            <a className="text-red-500 cursor-pointer" onClick={() => handleDelete(row)} >Delete</a>
        </div>
    );

    useEffect(() => {
        dispatch(fetchSpecies());
    }, [dispatch]);

    if (speciesError || referencesError) return <p>Error: {speciesError || referencesError}</p>;

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{t('specie.all')}</h1>
                <div className="filters mb-6 mt-4 flex gap-4">
                    <input
                        type="text"
                        placeholder="Search by reference..."
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Search</button>
                </div>
                {searchResults !== null ? (
                    Array.isArray(searchResults.results) && searchResults.results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {searchResults.results.map((specie: SearchedSpecie) => (
                                <SpeciesCard
                                    key={specie.id}
                                    specie={specie}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            {searchResults.message || 'No results matching reference found.'}
                        </p>
                    )
                ) : (
                    <Table columns={columns} renderActions={renderActions} data={species} />
                )}
            </div>
        </div>
    );
};

export default SpeciesList;
