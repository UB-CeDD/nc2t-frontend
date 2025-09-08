import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHerbariumsThunk } from '@store/thunks/herbariumThunk';
import { RootState } from '@store/store';
import { Herbarium } from "@/helpers/types.ts";
import { useTranslation } from "react-i18next";
import Table from '@components/commons/Table';
import Spinner from "@components/commons/Spinner.tsx";

interface HerbariumListProps {
    herbariums?: Herbarium[];
}

const HerbariumList: React.FC<HerbariumListProps> = ({ herbariums: propHerbariums }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { herbariums, loading, error } = useSelector((state: RootState) => state.getHerbariums);

    const columns = [
            { key: 'location.name', label: t('herbarium.form_fields.location_name') },
            { key: 'location.city_town', label: t('herbarium.form_fields.city_town') },
            { key: 'location.country', label: t('herbarium.form_fields.country') },
        ];

        const renderActions = (row: Herbarium) => (
            <div className="flex justify-center items-center gap-2">
                <a className="text-blue-500 cursor-pointer" onClick={() => handleEdit(row)} >Edit</a>
                <a className="text-red-500 cursor-pointer" onClick={() => handleDelete(row)} >Delete</a>
            </div>
        );


    useEffect(() => {
        if (!propHerbariums) { // Only fetch if propHerbariums is not provided
            dispatch(fetchHerbariumsThunk());
        }
    }, [dispatch, propHerbariums]);

    const displayHerbariums = propHerbariums || herbariums;

    if (loading && !propHerbariums) return <Spinner />;
    if (error && !propHerbariums) return <p>Error: {error}</p>;

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{t('herbarium.all')}</h1>
                <Table columns={columns} renderActions={renderActions} data={displayHerbariums} />
            </div>
        </div>
    );
};

export default HerbariumList;
