import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompounds } from '@store/thunks/compoundThunk.ts';
import { RootState } from '@store/store';
import { Compound } from "@/helpers/types.ts";
import { useTranslation } from "react-i18next";
import Table from '@components/commons/Table';
import Spinner from "@components/commons/Spinner.tsx";

const CompoundList: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { compounds, loading, error } = useSelector((state: RootState) => state.getCompounds);

    const columns = [
            { key: 'compound_class', label: t('compound.form_fields.class') },
            { key: 'subclass', label: t('compound.form_fields.sub_class') },
            { key: 'smiles', label: t('compound.form_fields.smiles') },
        ];

        const renderActions = (row: Compound) => (
            <div className="flex justify-center items-center gap-2">
                <a className="text-blue-500 cursor-pointer" onClick={() => handleEdit(row)} >Edit</a>
                <a className="text-red-500 cursor-pointer" onClick={() => handleDelete(row)} >Delete</a>
            </div>
        );


    useEffect(() => {
        dispatch(fetchCompounds());
    }, [dispatch]);

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{t('compound.all')}</h1>
                <Table columns={columns} renderActions={renderActions} data={compounds} />
            </div>
        </div>
    );
};

export default CompoundList;