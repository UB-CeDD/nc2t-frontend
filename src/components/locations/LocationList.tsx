import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "@components/commons/Spinner";
import Table from "@components/commons/Table";
import { Location } from "@/helpers/types.ts";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchLocationsThunk } from "@store/thunks/locationThunk.ts";

const LocationList: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { locations, error, loading } = useSelector((state) => state.getLocations);

    const [searchText, setSearchText] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const columns = [
        { key: 'place', label: t('location.place') },
        { key: 'city', label: t('location.city') },
        { key: 'State', label: t('location.State') },
        { key: 'country', label: t('location.country') },
        { key: 'country', label: t('location.country') },
        { key: 'zipCode', label: t('location.zipCode') },
        { key: 'gpsCoordinates', label: t('location.gpsCoordinates') }
    ];

    const renderActions = (row: Location) => (
        <div className="flex justify-center items-center gap-2">
            <a className="text-blue-500 cursor-pointer" onClick={() => handleEdit(row)} >Edit</a>
            <a className="text-red-500 cursor-pointer" onClick={() => handleDelete(row)} >Delete</a>
        </div>
    );

    const handleEdit = (row: Location) => {
        alert(`Edit:, ${row}`);
        // Add your edit logic here
    };

    const handleDelete = (row: Location) => {
        alert(`Delete:, ${row}`);
        // Add your delete logic here
    };

    useEffect(() => {
        dispatch(fetchLocationsThunk());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">            
            <h1 className="text-2xl flex justify-center font-bold mb-8">Locations</h1>
                <div className="filters">
                    <input
                        type="text"
                        placeholder={t('locations.search_placeholder')}
                        value={searchText}
                        onChange={(e: { target: { value: string; }; }) => setSearchText(e.target.value)}
                        className="filter-input"
                    />
                    <input
                        type="text"
                        placeholder={t('locations.filter_author_placeholder')}
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        className="filter-input"
                    />
                    <input
                        type="text"
                        placeholder={t('locations.filter_date_placeholder')}
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="filter-input"
                    />
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <Table data={locations} columns={columns} renderActions={renderActions} />
                )}
            </div>
        </div>
    );
};

export default LocationList;
