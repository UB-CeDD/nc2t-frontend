import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveReferenceThunk } from '@store/thunks/referenceThunk';
import { RootState } from '@store/store';
import { useTranslation } from "react-i18next";
import { formatAuthorsForDisplay } from '@/helpers/authors';

interface ReferenceDetailsProps {
    id: string;
}

const ReferenceDetails: React.FC<ReferenceDetailsProps> = ({ id }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { reference, error } = useSelector((state: RootState) => state.reference);

    useEffect(() => {
        dispatch(retrieveReferenceThunk(id));
    }, [dispatch, id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!reference) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{reference.title}</h1>
            <p>{t('reference.form_fields.author')}: {formatAuthorsForDisplay(reference.author)}</p>
            <p>Year: {reference.year}</p>
        </div>
    );
};

export default ReferenceDetails;