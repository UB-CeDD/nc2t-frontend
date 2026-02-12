import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferencesThunk, deleteReferenceThunk } from '@store/thunks/referenceThunk';
import { Reference } from '@/helpers/types';
import { useTranslation } from "react-i18next";
import Spinner from '../commons/Spinner';
import Table from '../commons/Table';
import DeleteConfirmationModal from '@components/commons/DeleteConfirmationModal';
import { useNotification } from '@/components/commons/NotificationContext';
import { formatAuthorsForDisplay } from '@/helpers/authors';

interface ReferenceListProps {
    references?: Reference[];
    onEditReference: (reference: Reference) => void; // Add this prop
}

const ReferenceList: React.FC<ReferenceListProps> = ({ references: propReferences, onEditReference }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { addNotification } = useNotification();
    const { references, error, loading } = useSelector((state) => state.getReferences);

    const [searchText, setSearchText] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [referenceForDelete, setReferenceForDelete] = useState<Reference | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!propReferences) {
            dispatch(fetchReferencesThunk());
        }
    }, [dispatch, propReferences]);

    const displayReferences = propReferences || references;

    const filteredReferences = displayReferences.filter((reference: Reference) => {
        return (
            (reference.title.toLowerCase().includes(searchText.toLowerCase()) ||
                reference.author.toLowerCase().includes(searchText.toLowerCase())) &&
            (authorFilter ? reference.author.toLowerCase().includes(authorFilter.toLowerCase()) : true) &&
            (dateFilter ? reference.year.toString() === dateFilter : true)
        );
    });

    const renderDoi = (row: Reference) => {
        const doi = row.doi;
        if (!doi) return 'N/A';
        const isUrl = doi.startsWith('http://') || doi.startsWith('https://');
        const href = isUrl ? doi : `https://doi.org/${encodeURIComponent(doi)}`;
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{doi}</a>
        );
    };

    const renderAuthor = (row: Reference) => {
        return formatAuthorsForDisplay(row.author);
    };

    const columns = [
        { key: 'type', label: t('reference.form_fields.type') },
        { key: 'title', label: t('reference.form_fields.title') },
        { key: 'author', label: t('reference.form_fields.author'), render: renderAuthor },
        { key: 'doi', label: t('reference.form_fields.doi'), render: renderDoi },
        { key: 'thesis_level', label: t('reference.form_fields.thesis_level') },
    ];

    const renderActions = (row: Reference) => (
        <div className="flex justify-center items-center gap-2">
            <a className="text-blue-500 cursor-pointer" onClick={() => handleEdit(row)} >Edit</a>
            <a className="text-red-500 cursor-pointer" onClick={() => handleDelete(row)} >Delete</a>
        </div>
    );

    const handleEdit = (row: Reference) => {
        onEditReference(row);
    };

    const handleDelete = (row: Reference) => {
        setReferenceForDelete(row);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!referenceForDelete) return;
        
        setIsDeleting(true);
        try {
            await dispatch(deleteReferenceThunk(referenceForDelete.id.toString(), addNotification));
            setShowDeleteModal(false);
            setReferenceForDelete(null);
        } catch (error) {
            console.error('Error deleting reference:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (error && !propReferences) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{t('reference.reference')}</h1>
                <div className="mb-4 mt-4 flex gap-4 filters">
                    <input
                        type="text"
                        placeholder={t('reference.search_placeholder')}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="filter-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {/* <input
                        type="text"
                        placeholder={t('reference.filter_author_placeholder')}
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        className="filter-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    /> */}
                    <input
                        type="text"
                        placeholder={t('reference.date_search_placeholder')}
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="filter-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                {loading && !propReferences ? (
                    <Spinner />
                ) : (
                    <Table data={filteredReferences} columns={columns} renderActions={renderActions} />
                )}
            </div>

            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setReferenceForDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                itemName={referenceForDelete?.title || ''}
                moduleName={t('reference.module')}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default ReferenceList;
