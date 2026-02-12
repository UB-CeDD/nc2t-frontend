import React from 'react';
import { SearchedSpecies } from "@/helpers/types";
import { formatAuthorsForDisplay } from '@/helpers/authors';

interface SpeciesCardProps {
    specie: SearchedSpecies;
    onEdit: (specie: SearchedSpecies) => void;
    onDelete: (specie: SearchedSpecies) => void;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({ specie, onEdit, onDelete }) => {

    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold mb-2">{specie.title}</h2>
                <p className="text-gray-700">Author: {formatAuthorsForDisplay(specie.author)}</p>
                <p className="text-gray-700">DOI: {specie.doi}</p>
                <p className="text-gray-700">Link: <a href={specie.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{specie.link ?? "#"}</a></p>
                <p className="text-gray-700">Brief Text: {specie.brief_text || 'N/A'}</p>
            </div>
            <div className="flex justify-end items-center gap-2 mt-4">
                <a className="text-blue-500 cursor-pointer" onClick={() => onEdit({...specie, name: specie.title})} >{specie.id ? 'Edit' : 'Create'}</a>
                <a className="text-red-500 cursor-pointer" onClick={() => onDelete(specie)} >Delete</a>
            </div>
        </div>
    );
};

export default SpeciesCard;
