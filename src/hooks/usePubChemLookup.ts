import { useState, useCallback } from 'react';
import { openBabelPromise } from '../helpers/openbabel';

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
            console.log('PubChem SMILES fetch response:', smilesData);

            if (!smilesResponse.ok || !smilesData.PropertyTable || !smilesData.PropertyTable.Properties || !smilesData.PropertyTable.Properties[0].ConnectivitySMILES) {
                try {
                    const OpenBabel = await openBabelPromise;
                    const sdfResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${fetchedCid}/SDF`);
                    const sdfData = await sdfResponse.text();

                    const conv = new OpenBabel.ObConversionWrapper();
                    conv.SetInFormat("sdf");
                    const mol = new OpenBabel.OBMol();
                    conv.ReadString(mol, sdfData);
                    conv.SetOutFormat("smi");
                    fetchedSmiles = conv.WriteString(mol).trim();
                    console.log('Generated SMILES with Open Babel:', { cid: fetchedCid, smiles: fetchedSmiles });
                } catch (openBabelError) {
                    console.error('Open Babel generation failed:', openBabelError);
                    setError('PubChem SMILES not found, and Open Babel generation failed.');
                    setLoading(false);
                    return { cid: fetchedCid, smiles: undefined };
                }
            } else {
                fetchedSmiles = smilesData.PropertyTable.Properties[0].ConnectivitySMILES;
                console.log('Fetched from PubChem:', { cid: fetchedCid, smiles: fetchedSmiles });
            }

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