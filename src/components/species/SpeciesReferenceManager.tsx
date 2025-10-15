import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchReferencesThunk } from "@/store/thunks/referenceThunk";
import { Reference } from "@/helpers/types";

interface SpeciesReferenceManagerProps {
  initialReferences: Reference[];
  onSave: (selectedReferenceIds: number[]) => void;
}

const SpeciesReferenceManager: React.FC<SpeciesReferenceManagerProps> = ({
  initialReferences,
  onSave,
}) => {
  const dispatch = useDispatch();
  const { references, loading, error } = useSelector(
    (state: RootState) => state.getReferences,
  );
  const [selectedReferenceIds, setSelectedReferenceIds] = useState<number[]>(
    [],
  );

  useEffect(() => {
    dispatch(fetchReferencesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (initialReferences) {
      setSelectedReferenceIds(
        initialReferences.map((r) => r.id!).filter((id) => id !== undefined),
      );
    }
  }, [initialReferences]);

  const handleCheckboxChange = (referenceId: number) => {
    setSelectedReferenceIds((prev) =>
      prev.includes(referenceId)
        ? prev.filter((id) => id !== referenceId)
        : [...prev, referenceId],
    );
  };

  const handleSave = () => {
    onSave(selectedReferenceIds);
  };

  if (loading) {
    return <div>Loading references...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Select References</h3>
      <div className="max-h-60 overflow-y-auto border rounded p-2">
        {references.length === 0 ? (
          <p>No references available.</p>
        ) : (
          references.map((reference) => (
            <div key={reference.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`reference-${reference.id}`}
                checked={selectedReferenceIds.includes(reference.id!)}
                onChange={() => handleCheckboxChange(reference.id!)}
                className="mr-2"
              />
              <label htmlFor={`reference-${reference.id}`}>
                {reference.title} ({reference.author}, {reference.year})
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
          onClick={() =>
            onSave(
              initialReferences
                .map((r) => r.id!)
                .filter((id) => id !== undefined),
            )
          }
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SpeciesReferenceManager;
