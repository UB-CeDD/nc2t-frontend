import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "@components/commons/Spinner";
import Table from "@components/commons/Table";
import { Location } from "@/helpers/types.ts";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchLocationsThunk } from "@store/thunks/locationThunk.ts";

interface LocationListProps {
    locations?: Location[];
}

const LocationList: React.FC<LocationListProps> = ({ locations: propLocations }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { locations, error, loading } = useSelector((state) => state.getLocations);

    const [searchText, setSearchText] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const columns = [
        { key: 'name', label: t('location.name') },
        { key: 'city_town', label: t('location.city') },
        { key: 'country', label: t('location.country') },
        { key: 'gps_latitude', label: t('location.gps_latitude') },
        { key: 'gps_longitude', label: t('location.gps_longitude') }
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
        if (!propLocations) {
            dispatch(fetchLocationsThunk());
        }
    }, [dispatch, propLocations]);

    const displayLocations = propLocations || locations;

    if (error && !propLocations) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">            
            <h1 className="text-2xl flex justify-center font-bold mb-8">{t('location.all')}</h1>
                <div className="mb-4 mt-4 flex gap-4">
                    <input
                        type="text"
                        placeholder={t('location.search_placeholder')}
                        value={searchText}
                        onChange={(e: { target: { value: string; }; }) => setSearchText(e.target.value)}
                        className="filter-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {/* <input
                        type="text"
                        placeholder={t('locations.filter_author_placeholder')}
                        value={authorFilter}
                        onChange={(e) => setAuthorFilter(e.target.value)}
                        className="filter-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    /> */}
                    <input
                        type="date"
                        placeholder={t('location.date_search_placeholder')}
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="filter-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                {loading && !propLocations ? (
                    <Spinner />
                ) : (
                    <Table data={displayLocations} columns={columns} renderActions={renderActions} />
                )}
            </div>
        </div>
    );
};

export default LocationList;
