import React, { useState } from 'react';
    import { useDispatch } from 'react-redux';
    import { createCompoundThunk, updateCompoundThunk } from '@store/thunks/compoundThunk.ts';

    const CompoundForm: React.FC<{ compoundToEdit?: any }> = ({ compoundToEdit }) => {
        const dispatch = useDispatch();
        const [formData, setFormData] = useState({
            subclass: compoundToEdit?.subclass || '',
            compound_class: compoundToEdit?.compound_class || '',
            smiles: compoundToEdit?.smiles || '',
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (compoundToEdit) {
                // Update existing compound
                dispatch(updateCompoundThunk(compoundToEdit.id, formData));
            } else {
                // Create new compound
                dispatch(createCompoundThunk(formData));
            }
        };

        return (
            <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
                <div className="mb-4">
                    <label className="block text-gray-700">Subclass</label>
                    <input
                        type="text"
                        name="subclass"
                        value={formData.subclass}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Compound Class</label>
                    <input
                        type="text"
                        name="compound_class"
                        value={formData.compound_class}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">SMILES</label>
                    <input
                        type="text"
                        name="smiles"
                        value={formData.smiles}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {compoundToEdit ? 'Update Compound' : 'Create Compound'}
                </button>
            </form>
        );
    };

    export default CompoundForm;