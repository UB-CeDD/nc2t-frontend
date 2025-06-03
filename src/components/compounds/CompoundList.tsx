import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCompounds} from '@store/thunks/compoundThunk.ts';
import {RootState} from '@store/store';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {Compound} from "@/helpers/types.ts";

const CompoundList: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
    const { compounds, error} = useSelector((state: RootState) => state.getCompounds );

    useEffect(() => {
        dispatch(fetchCompounds());
    }, [dispatch]);

    if (error) return <p>Error: {error}</p>;
    console.log(compounds)
    return (
        <div>
            <h1>Compounds</h1>
            <ul>
                {Array.isArray(compounds) && compounds.map((compound: Compound) => (
                    <li key={compound.id}>
                        {compound.subclass} - {compound.compound_class} - {compound.smiles}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompoundList;