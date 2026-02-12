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
    const [cid, setCid] = useState<number | undefined>(undefined);
    const [smiles, setSmiles] = useState<string | undefined>(undefined);
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
            // Handle multiple compound names separated by "or" or comma—try each one
            const compoundNames = compoundName.split(/\s+or\s+|,/).map(name => name.trim()).filter(Boolean);
            
            for (const singleName of compoundNames) {
                // Step 1: Get CID from compound name
                const cidResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(singleName)}/cids/JSON`);
                const cidData = await cidResponse.json();
                console.log(`CID response for "${singleName}":`, cidData);
                if (cidResponse.ok && cidData && cidData.IdentifierList && Array.isArray(cidData.IdentifierList.CID) && cidData.IdentifierList.CID.length > 0) {
                    fetchedCid = cidData.IdentifierList.CID[0]; // Take the first CID if multiple are found
                    break; // Found a match, exit loop
                }
            }

            if (!fetchedCid) {
                setError('PubChem CID not found for any of the provided compound names.');
                setLoading(false);
                setCid(undefined);
                setSmiles(undefined);
                return { cid: undefined, smiles: undefined };
            }

            // Step 2: Get SMILES from CID
            const smilesResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${fetchedCid}/property/CanonicalSMILES/JSON`);
            const smilesData = await smilesResponse.json();
            // Safely extract Properties array if present
            const properties = smilesData && typeof smilesData === 'object' &&
                smilesData.PropertyTable && Array.isArray(smilesData.PropertyTable.Properties)
                ? smilesData.PropertyTable.Properties
                : null;

            const firstProp = properties && properties.length > 0 ? properties[0] : null;

            if (smilesResponse.ok && properties.length > 0) {
                // Found canonical SMILES directly
                fetchedSmiles = firstProp.ConnectivitySMILES;
            } else {
                // If CanonicalSMILES is missing or response shape is unexpected, try fetching SDF and convert with OpenBabel
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

                } catch (openBabelError) {
                    console.error('Open Babel generation failed or SDF fetch failed:', openBabelError);
                    // If we at least found a CID, return it but indicate SMILES couldn't be generated
                    setError('PubChem SMILES not found, and Open Babel generation failed.');
                    setLoading(false);
                    setCid(fetchedCid);
                    setSmiles(undefined);
                    return { cid: fetchedCid, smiles: undefined };
                }
            }

            // Set final results
            setCid(fetchedCid);
            setSmiles(fetchedSmiles);
            setLoading(false);
            return { cid: fetchedCid, smiles: fetchedSmiles };

        } catch (err) {
            console.error('Error fetching PubChem data:', err);
            setError('Failed to fetch PubChem data. Please try again.');
            setLoading(false);
            setCid(undefined);
            setSmiles(undefined);
            return { cid: undefined, smiles: undefined };
        }
    }, []);

    return { cid, smiles, loading, error, lookupCompound };
};

export default usePubChemLookup;

