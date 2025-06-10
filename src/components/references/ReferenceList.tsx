import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferencesThunk } from '@store/thunks/referenceThunk';
import { Reference } from '@/helpers/types';
import { useTranslation } from "react-i18next";
import Spinner from '../commons/Spinner';
import Table from '../commons/Table';
// import { FaEdit, FaTrash } from 'react-icons/fa';

const ReferenceList: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { references, error, loading } = useSelector((state) => state.getReferences);

    const [searchText, setSearchText] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        dispatch(fetchReferencesThunk());
    }, [dispatch]);

    const filteredReferences = references.filter((reference: Reference) => {
        return (
            (reference.title.toLowerCase().includes(searchText.toLowerCase()) ||
                reference.author.toLowerCase().includes(searchText.toLowerCase())) &&
            (authorFilter ? reference.author.toLowerCase().includes(authorFilter.toLowerCase()) : true) &&
            (dateFilter ? reference.year.toString() === dateFilter : true)
        );
    });

    const columns = [
        { key: 'title', label: t('reference.form_fields.type') },
        { key: 'title', label: t('reference.form_fields.title') },
        { key: 'author', label: t('reference.form_fields.author') },
        { key: 'year', label: t('reference.form_fields.year') },
    ];

    const renderActions = (row: Reference) => (
        <div className="flex justify-center items-center gap-2">
            <a className="text-blue-500 cursor-pointer" onClick={() => handleEdit(row)} >Edit</a>
            <a className="text-red-500 cursor-pointer" onClick={() => handleDelete(row)} >Delete</a>
        </div>
    );

    const handleEdit = (row: Reference) => {
        alert(`Edit: ${row}`);
        // Add your edit logic here
    };

    const handleDelete = (row: Reference) => {
        alert(`Delete: ${row}`);
        // Add your delete logic here
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{t('reference.reference')}</h1>
                <div className="filters">
                    <input
                        type="text"
                        placeholder={t('reference.search_placeholder')}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="filter-input"
                    />
                    <input
                        type="text"
                        placeholder={t('reference.filter_author_placeholder')}
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        className="filter-input"
                    />
                    <input
                        type="text"
                        placeholder={t('reference.filter_date_placeholder')}
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="filter-input"
                    />
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <Table data={filteredReferences} columns={columns} renderActions={renderActions} />
                )}
            </div>
        </div>
    );
};

export default ReferenceList;