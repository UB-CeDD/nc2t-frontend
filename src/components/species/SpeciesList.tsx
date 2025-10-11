import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecies } from '@store/thunks/speciesThunk.ts';
import { RootState } from '@store/store';
import { Species, Reference, SearchedSpecies, Compound } from "@/helpers/types.ts";
import { useTranslation } from "react-i18next";
import Table from '@components/commons/Table';
import { searchSpeciesByReference } from '@store/thunks/speciesThunk.ts';
import SpeciesCard from './SpeciesCard';
import { getSpeciesByReference } from '@/services/speciesService';
import Spinner from "@components/commons/Spinner.tsx";
import { AppDispatch } from '@store/store';
import Loader from '@components/commons/Loader';

interface SpeciesListProps {
    onEditSpecies: (species: Species | SearchedSpecies) => void;
}

const SpeciesList: React.FC<SpeciesListProps> = ({ onEditSpecies }) => {
    const { t } = useTranslation();
    const dispatch: AppDispatch = useDispatch();
    const { species, error: speciesError, searchResults, loading } = useSelector((state: RootState) => state.getSpecies);
    const { error: referencesError } = useSelector((state: RootState) => state.getReferences);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);
  

    const columns = [
        { key: 'name', label: t('species.table_columns.name') },
        { key: 'recent_name', label: t('species.table_columns.recent_name') },
        { key: 'family', label: t('species.table_columns.family') },
        { key: 'kingdom', label: t('species.table_columns.kingdom') },
        { key: 'part_used', label: t('species.table_columns.part_used') },
        { 
            key: 'references',
            label: t('species.table_columns.ref'),
            render: (row: Species) => Array.isArray(row.references) ? (row.references as Reference[]).length : 0
        },
        {
            key: 'compounds',
            label: t('species.table_columns.compounds'),
            render: (row: Species) => Array.isArray(row.compounds) ? (row.compounds as Compound[]).length : 0
        },
    ];

    const handleEdit = async (row: Species | SearchedSpecies | Reference) => {
        if ('kingdom' in row) { // It's a Specie or SearchedSpecie
            onEditSpecies(row);
        } else { // It's a Reference that might not have a specie yet
            const existingSpecies = await getSpeciesByReference(row.id);
            if (existingSpecies) {
                onEditSpecies(existingSpecies);
            } else {
                onEditSpecies({ reference: row });
            }
        }
    };

    const handleDelete = (row: Species) => {
        // Implement delete logic here
        console.log('Delete', row);
    };

    const renderActions = (row: Species) => (
        <div className="flex justify-center items-center gap-2">
            <a
                className="text-blue-500 cursor-pointer"
                onClick={() => {
                    // handleEdit(row);
                    window.location.href = `/dashboard/species/${row.id}`;
                }}
            >
                {row.id ? 'View' : 'Create'}
            </a>
            <a className="text-red-500 cursor-pointer" onClick={() => handleDelete(row)} >Delete</a>
        </div>
    );

        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchTerm(value);
            if (value.trim() !== '') {
                setIsSearching(true);
                dispatch(searchSpeciesByReference(value));
            } else {
                setIsSearching(false);
                // Optionally clear search results here if needed
            }
        };
    

    useEffect(() => {
        setIsSearching(true);
        dispatch(fetchSpecies());
        setIsSearching(false);
    }, [dispatch]);

    useEffect(() => {
        if (isSearching && searchResults) {
        setIsSearching(false);
        }
    }, [isSearching, searchResults]);


    const displayErrorMessage = speciesError || referencesError;
    const errorMessageText = displayErrorMessage ? (typeof displayErrorMessage === 'object' ? JSON.stringify(displayErrorMessage) : displayErrorMessage) : '';

    return (
        <div className="flex items-center justify-center">
            <div className={`bg-${searchResults !== null && searchTerm.trim() !== '' ? 'gray' : 'white rounded shadow-md w-full p-8' } `}>
                {errorMessageText && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{errorMessageText}</span>
                    </div>
                )}
                <div className="filters mb-6 mt-4 flex gap-4 justify-between">
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search by reference..."
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        onChange={handleSearchChange}
                    />
                     
                    {/* <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Search</button> */}
                </div>
                {isSearching ? (
                <Loader />
                ) : (
                searchResults !== null && searchTerm.trim() !== '' ? (
                    Array.isArray(searchResults.results) && searchResults.results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {searchResults.results.map((specie: SearchedSpecies) => (
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
                    <>
                        <h1 className="text-2xl flex justify-center font-bold mb-8">{t('species.all')}</h1>
                        <Table columns={columns} renderActions={renderActions} data={species} />
                    </>
                )
            )}
            </div>
        </div>
    );
};

export default SpeciesList;