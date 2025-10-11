import { useState, useCallback } from 'react';

interface PubChemLookupResult {
    cid: number | undefined;
    smiles: string | undefined;
    loading: boolean;
    error: string | undefined;
    lookupCompound: (compoundName: string) => Promise<{ cid: number | undefined; smiles: string | undefined }>;
}

const usePubChemLookup = (): PubChemLookupResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const lookupCompound = useCallback(async (compoundName: string) => {
        setLoading(true);
        setError(undefined);
        let fetchedCid: number | undefined = undefined;
        let fetchedSmiles: string | undefined = undefined;

        if (!compoundName) {
            setError('Compound name cannot be empty.');
            setLoading(false);
            return { cid: undefined, smiles: undefined };
        }

        try {
            // Step 1: Get CID from compound name
            const cidResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(compoundName)}/cids/JSON`);
            const cidData = await cidResponse.json();

            if (!cidResponse.ok || !cidData.IdentifierList || !cidData.IdentifierList.CID || cidData.IdentifierList.CID.length === 0) {
                setError('PubChem CID not found for this compound name.');
                setLoading(false);
                return { cid: undefined, smiles: undefined };
            }

            fetchedCid = cidData.IdentifierList.CID[0]; // Take the first CID if multiple are found

            // Step 2: Get SMILES from CID
            const smilesResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${fetchedCid}/property/CanonicalSMILES/JSON`);
            const smilesData = await smilesResponse.json();

            if (!smilesResponse.ok || !smilesData.PropertyTable || !smilesData.PropertyTable.Properties || smilesData.PropertyTable.Properties.length === 0) {
                setError('PubChem SMILES not found for the retrieved CID.');
                setLoading(false);
                return { cid: fetchedCid, smiles: undefined };
            }

            fetchedSmiles = smilesData.PropertyTable.Properties[0].CanonicalSMILES;

            setLoading(false);
            return { cid: fetchedCid, smiles: fetchedSmiles };

        } catch (err) {
            console.error('Error fetching PubChem data:', err);
            setError('Failed to fetch PubChem data. Please try again.');
            setLoading(false);
            return { cid: undefined, smiles: undefined };
        }
    }, []);

    return { cid: undefined, smiles: undefined, loading, error, lookupCompound };
};

export default usePubChemLookup;