import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { fetchCompounds } from '@/store/thunks/compoundThunk';
import { Compound } from '@/helpers/types';

interface SpeciesCompoundManagerProps {
    initialCompounds: Compound[];
    onSave: (selectedCompoundIds: number[]) => void;
}

const SpeciesCompoundManager: React.FC<SpeciesCompoundManagerProps> = ({ initialCompounds, onSave }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { compounds, loading, error } = useSelector((state: RootState) => state.getCompounds);
    const [selectedCompoundIds, setSelectedCompoundIds] = useState<number[]>([]);

    useEffect(() => {
        dispatch(fetchCompounds());
    }, [dispatch]);

    useEffect(() => {
        if (initialCompounds) {
            setSelectedCompoundIds(initialCompounds.map(c => c.id!).filter(id => id !== undefined));
        }
    }, [initialCompounds]);

    const handleCheckboxChange = (compoundId: number) => {
        setSelectedCompoundIds(prev =>
            prev.includes(compoundId)
                ? prev.filter(id => id !== compoundId)
                : [...prev, compoundId]
        );
    };

    const handleSave = () => {
        onSave(selectedCompoundIds);
    };

    if (loading) {
        return <div>Loading compounds...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Select Compounds</h3>
            <div className="max-h-60 overflow-y-auto border rounded p-2">
                {Array.isArray(compounds) && compounds.length === 0 ? (
                    <p>No compounds available.</p>
                ) : Array.isArray(compounds) ? (
                    compounds.map(compound => (
                        <div key={compound.id} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`compound-${compound.id}`}
                                checked={selectedCompoundIds.includes(compound.id!)}
                                onChange={() => handleCheckboxChange(compound.id!)}
                                className="mr-2"
                            />
                            <label htmlFor={`compound-${compound.id}`}>
                                {compound.name} ({compound.compound_class} - {compound.subclass})
                            </label>
                        </div>
                    ))
                ) : (
                    <p>No compounds available.</p>
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
                    onClick={() => onSave(initialCompounds.map(c => c.id!).filter(id => id !== undefined))}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SpeciesCompoundManager;
