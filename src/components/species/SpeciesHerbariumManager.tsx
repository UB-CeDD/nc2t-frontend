import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchHerbariumsThunk } from '@/store/thunks/herbariumThunk';
import { Herbarium } from '@/helpers/types';

interface SpeciesHerbariumManagerProps {
    initialHerbariums: Herbarium[];
    onSave: (selectedHerbariumIds: number[]) => void;
}

const SpeciesHerbariumManager: React.FC<SpeciesHerbariumManagerProps> = ({ initialHerbariums, onSave }) => {
    const dispatch = useDispatch();
    const { herbariums, loading, error } = useSelector((state: RootState) => state.getHerbariums);
    const [selectedHerbariumIds, setSelectedHerbariumIds] = useState<number[]>([]);

    useEffect(() => {
        dispatch(fetchHerbariumsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (initialHerbariums) {
            setSelectedHerbariumIds(initialHerbariums.map(h => h.id!).filter(id => id !== undefined));
        }
    }, [initialHerbariums]);

    const handleCheckboxChange = (herbariumId: number) => {
        setSelectedHerbariumIds(prev =>
            prev.includes(herbariumId)
                ? prev.filter(id => id !== herbariumId)
                : [...prev, herbariumId]
        );
    };

    const handleSave = () => {
        onSave(selectedHerbariumIds);
    };

    if (loading) {
        return <div>Loading herbariums...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Select Herbariums</h3>
            <div className="max-h-60 overflow-y-auto border rounded p-2">
                {herbariums.length === 0 ? (
                    <p>No herbariums available.</p>
                ) : (
                    herbariums.map(herbarium => (
                        <div key={herbarium.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`herbarium-${herbarium.id}`}
                                checked={selectedHerbariumIds.includes(herbarium.id!)}
                                onChange={() => handleCheckboxChange(herbarium.id!)}
                                className="mr-2"
                            />
                            <label htmlFor={`herbarium-${herbarium.id}`}>
                                {herbarium.location.name} ({herbarium.location.city_town}, {herbarium.location.country})
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
                    onClick={() => onSave(initialHerbariums.map(h => h.id!).filter(id => id !== undefined))}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SpeciesHerbariumManager;
