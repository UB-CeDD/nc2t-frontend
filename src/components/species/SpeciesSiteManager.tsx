import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchLocationsThunk } from '@/store/thunks/locationThunk';
import { Site } from '@/helpers/types';

interface SpeciesSiteManagerProps {
    initialSites: Site[];
    onSave: (selectedSiteIds: number[]) => void;
}

const SpeciesSiteManager: React.FC<SpeciesSiteManagerProps> = ({ initialSites, onSave }) => {
    const dispatch = useDispatch();
    const { locations, loading, error } = useSelector((state: RootState) => state.getLocations);
    const [selectedSiteIds, setSelectedSiteIds] = useState<number[]>([]);

    useEffect(() => {
        dispatch(fetchLocationsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (initialSites) {
            setSelectedSiteIds(initialSites.map(s => s.id!).filter(id => id !== undefined));
        }
    }, [initialSites]);

    const handleCheckboxChange = (siteId: number) => {
        setSelectedSiteIds(prev =>
            prev.includes(siteId)
                ? prev.filter(id => id !== siteId)
                : [...prev, siteId]
        );
    };

    const handleSave = () => {
        onSave(selectedSiteIds);
    };

    if (loading) {
        return <div>Loading sites...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Select Sites</h3>
            <div className="max-h-60 overflow-y-auto border rounded p-2">
                {locations.length === 0 ? (
                    <p>No sites available.</p>
                ) : (
                    locations.map(site => (
                        <div key={site.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`site-${site.id}`}
                                checked={selectedSiteIds.includes(site.id!)}
                                onChange={() => handleCheckboxChange(site.id!)}
                                className="mr-2"
                            />
                            <label htmlFor={`site-${site.id}`}>
                                {site.name} ({site.city_town}, {site.country})
                            </label>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                >
                    Save
                </button>
                <button
                    onClick={() => onSave(initialSites.map(s => s.id!).filter(id => id !== undefined))}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SpeciesSiteManager;
