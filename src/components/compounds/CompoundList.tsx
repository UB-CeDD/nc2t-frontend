import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompounds, deleteCompoundThunk } from '@store/thunks/compoundThunk.ts';
import { RootState } from '@store/store';
import { Compound } from "@/helpers/types.ts";
import { useTranslation } from "react-i18next";
import Table from '@components/commons/Table';
import Loader from '@components/commons/Loader';
import DeleteConfirmationModal from '@components/commons/DeleteConfirmationModal';
import { useNotification } from '@/components/commons/NotificationContext';

interface CompoundListProps {
    compounds?: Compound[];
    onEditCompound: (compound: Compound) => void; // Add this prop
}

const CompoundList: React.FC<CompoundListProps> = ({ compounds: propCompounds, onEditCompound }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { addNotification } = useNotification();
    const { compounds, loading, error } = useSelector((state: RootState) => state.getCompounds);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [compoundForDelete, setCompoundForDelete] = useState<Compound | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const columns = [
            { key: 'name', label: t('compound.form_fields.name') },
            { key: 'compound_class', label: t('compound.form_fields.class') },
            { key: 'subclass', label: t('compound.form_fields.sub_class') },
            { key: 'smiles', label: t('compound.form_fields.smile') },
        ];


            const handleEdit = (row: Compound) => {
               onEditCompound(row);
            };

        const handleDelete = (row: Compound) => {
            setCompoundForDelete(row);
            setShowDeleteModal(true);
        };

        const handleConfirmDelete = async () => {
            if (!compoundForDelete) return;
            
            setIsDeleting(true);
            try {
                await dispatch(deleteCompoundThunk(compoundForDelete.id.toString(), addNotification));
                setShowDeleteModal(false);
                setCompoundForDelete(null);
            } catch (error) {
                console.error('Error deleting compound:', error);
            } finally {
                setIsDeleting(false);
            }
        };

        const renderActions = (row: Compound) => (
            <div className="flex justify-center items-center gap-2">
                <a className="text-blue-500 cursor-pointer" onClick={() => handleEdit(row)} >Edit</a>
                <a className="text-red-500 cursor-pointer" onClick={() => handleDelete(row)} >Delete</a>
            </div>
        );


    useEffect(() => {
        console.log('CompoundList mounted', propCompounds);
        
        if (!propCompounds) { // Only fetch if propCompounds is not provided
            dispatch(fetchCompounds());
        }
    }, [dispatch, propCompounds]);

    const displayCompounds = propCompounds || compounds;

    if (loading && !propCompounds) return <Loader />;
    if (error && !propCompounds) return <p>Error: {error}</p>;

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{t('compound.all')}</h1>
                <Table columns={columns} renderActions={renderActions} data={displayCompounds} />
            </div>

            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setCompoundForDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                itemName={compoundForDelete?.name || ''}
                moduleName={t('compound.module')}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default CompoundList;