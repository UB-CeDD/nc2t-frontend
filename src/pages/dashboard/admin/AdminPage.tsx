import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/components/commons/Loader';
import { RootState, AppDispatch } from '@/store/store';
import { fetchSpecies, searchSpeciesByReference } from '@/store/thunks/speciesThunk';
import { fetchCompounds } from '@/store/thunks/compoundThunk';
import { fetchUsersThunk } from '@/store/thunks/userThunks';
import { fetchLocationsThunk } from '@/store/thunks/locationThunk';
import { fetchReferencesThunk } from '@/store/thunks/referenceThunk';
import { fetchHerbariumsThunk } from '@/store/thunks/herbariumThunk';
import { Species, Compound, UserModel, LocationModel, Reference, Herbarium, SearchedSpecies } from '@/helpers/types';
import { FaLeaf, FaFlask, FaUsers, FaMapMarkerAlt, FaBook, FaBuilding } from 'react-icons/fa';
import MapComponent from '@/components/commons/MapComponent';
import AdminLayout from '@components/layouts/AdminLayout';
import SpeciesCard from '@components/species/SpeciesCard';
import { getSpeciesByReference } from '@/services/speciesService';
import { useNavigate } from 'react-router-dom';
import SpeciesByKingdomChart from '@components/charts/SpeciesByKingdomChart';
import CompoundsByClassChart from '@components/charts/CompoundsByClassChart';
import ReferencesByTypeChart from '@components/charts/ReferencesByTypeChart';
import UsersByRoleChart from '@components/charts/UsersByRoleChart';

const AdminPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state: RootState) => state.loading);

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { species, searchResults } = useSelector((state: RootState) => state.getSpecies) as {
        species: Species[] | null;
        error: string | null;
        searchResults: {
            [x: string]: number; results: SearchedSpecies[]; message?: string 
};
    };

    const { compounds } = useSelector((state: RootState) => state.getCompounds) as {
        compounds: Compound[] | null;
        error: string | null;
    };

    const { users } = useSelector((state: RootState) => state.getUsers) as {
        users: UserModel[] | null;
        error: string | null;
    };

    const { locations } = useSelector((state: RootState) => state.getLocations) as {
        locations: LocationModel[] | null;
        error: string | null;
    };

    const { references } = useSelector((state: RootState) => state.getReferences) as {
        references: Reference[] | null;
        error: string | null;
    };

    const { herbariums } = useSelector((state: RootState) => state.getHerbariums) as {
        herbariums: Herbarium[] | null;
        error: string | null;
    };

    
    useEffect(() => {
        dispatch(fetchSpecies());
        dispatch(fetchCompounds());
        dispatch(fetchUsersThunk());
        dispatch(fetchLocationsThunk());
        dispatch(fetchReferencesThunk());
        dispatch(fetchHerbariumsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (isSearching && searchResults) {
            setIsSearching(false);
        }
    }, [isSearching, searchResults]);

    const getSpeciesByKingdom = () => {
        if (!species) return [];
        const data: { [key: string]: number } = species.reduce((acc: { [key: string]: number }, s: Species) => {
            const kingdom = s.kingdom || 'Unknown';
            acc[kingdom] = (acc[kingdom] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(data).map(key => ({ name: key, value: data[key] }));
    };

    const getCompoundsByClass = () => {
        if (!compounds) return [];
        const data: { [key: string]: number } = compounds.reduce((acc: { [key: string]: number }, c: Compound) => {
            const compoundClass = c.compound_class || 'Unknown';
            acc[compoundClass] = (acc[compoundClass] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(data).map(key => ({ name: key, value: data[key] }));
    };

    const getUsersByRole = () => {
        if (!users) return [];
        const data: { [key: string]: number } = users.reduce((acc: { [key: string]: number }, u: UserModel) => {
            const role = u.role || 'Unknown';
            acc[role] = (acc[role] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(data).map(key => ({ name: key, value: data[key] }));
    };

    const getReferencesByType = () => {
        if (!references) return [];
        const data: { [key: string]: number } = references.reduce((acc: { [key: string]: number }, r: Reference) => {
            const type = r.type || 'Unknown';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(data).map(key => ({ name: key, value: data[key] }));
    };

    const getLocationsForMap = () => {
        if (!locations) return [];
        return locations.map((loc: LocationModel) => ({
            latitude: loc.gps_latitude,
            longitude: loc.gps_longitude,
            popupText: `${loc.name}, ${loc.city_town}, ${loc.country}`,
        }));
    };

    const speciesByKingdomData = getSpeciesByKingdom();
    const compoundsByClassData = getCompoundsByClass();
    const usersByRoleData = getUsersByRole();
    const referencesByTypeData = getReferencesByType();
    const locationsMapData = getLocationsForMap();

    const allEntities = [
        ...(species || []).map(s => ({ ...s, type: 'species', createdAt: s.created_at })),
        ...(compounds || []).map(c => ({ ...c, type: 'compound', createdAt: c.created_at })),
        ...(users || []).map(u => ({ ...u, type: 'user', createdAt: u.created_at })),
        ...(locations || []).map(l => ({ ...l, type: 'location', createdAt: l.created_at })),
        ...(references || []).map(r => ({ ...r, type: 'reference', createdAt: r.created_at })),
        ...(herbariums || []).map(h => ({ ...h, type: 'herbarium', createdAt: h.created_at })),
    ];

    const recentActivity = allEntities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() !== '') {
            setIsSearching(true);
            dispatch(searchSpeciesByReference(value));
        } else {
            setIsSearching(false);
            // Optionally clear search results here if needed
        }
    };

    const handleEdit = async (row: Species | SearchedSpecies | Reference) => {
        if ('kingdom' in row) {
            navigate(`/dashboard/species/add`, { state: { specie: row } });
        } else {
            const existingSpecies = await getSpeciesByReference(row.id);
            if (existingSpecies) {
                navigate(`/dashboard/species/${existingSpecies.id}/edit`, { state: { specie: existingSpecies } });
            } else {
                navigate(`/dashboard/species/add`, { state: { specie: { reference: row } } });
            }
        }
    };

    const handleDelete = (row: Species) => {
        console.log('Delete', row);
    };
    console.log({ searchResults });

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
                    <div className="filters mb-6 mt-4 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search by reference..."
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className='w-full'>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {isSearching ? (
                        <Loader />
                    ) : (
                        searchTerm.trim() !== '' && searchResults && searchResults.results ? (
                            searchResults.results.length > 0 ? (
                                <>
                                    <h3 className="text-center text-gray-700">{searchResults.message}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                                                        {searchResults.results.map((result: SearchedSpecies | Reference, index: number) => {
                                                                            const specie: SearchedSpecies = 'kingdom' in result ? result : {
                                                                                ...(result as Reference),
                                                                                id: undefined,
                                                                                name: result.title,
                                                                                recent_name: '',
                                                                                kingdom: '',
                                                                                family: '',
                                                                                trad_uses: '',
                                                                                part_used: '',
                                                                                administration: '',
                                                                                effects: '',
                                                                                notes: '',
                                                                                references: [result as Reference],
                                                                                compound_codes: [],
                                                                                compounds: [],
                                                                                sites: [],
                                                                                collection_date: '',
                                                                                storage_locations: [],
                                                                                harvest_sites: [],
                                                                                collection_data: [],
                                                                            };
                                                                            return (
                                                                                <SpeciesCard
                                                                                    key={index}
                                                                                    specie={specie}
                                                                                    onEdit={handleEdit}
                                                                                    onDelete={handleDelete}
                                                                                />
                                                                            );
                                                                        })}                                    </div>
                                </>
                            ) : (
                                <p className="text-center text-gray-500 mb-8">
                                    {searchResults.message || 'No results found.'}
                                </p>
                            )
                        ) : (
                            <>
                                {/* Overview Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                                    <StatCard title="Species" count={species?.length || 0} icon={<FaLeaf className="text-green-500" />} />
                                    <StatCard title="Compounds" count={compounds?.length || 0} icon={<FaFlask className="text-blue-500" />} />
                                    <StatCard title="Users" count={users?.length || 0} icon={<FaUsers className="text-purple-500" />} />
                                    <StatCard title="Harvest Sites" count={locations?.length || 0} icon={<FaMapMarkerAlt className="text-red-500" />} />
                                    <StatCard title="References" count={references?.length || 0} icon={<FaBook className="text-yellow-500" />} />
                                    <StatCard title="Herbariums" count={herbariums?.length || 0} icon={<FaBuilding className="text-teal-500" />} />
                                </div>

                                {/* Charts Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Species by Kingdom</h2>
                                        <SpeciesByKingdomChart data={speciesByKingdomData} />
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Compounds by Class</h2>
                                        <CompoundsByClassChart data={compoundsByClassData} />
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Users by Role</h2>
                                        <UsersByRoleChart data={usersByRoleData} />
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-semibold mb-4 text-gray-700">References by Type</h2>
                                        <ReferencesByTypeChart data={referencesByTypeData} />
                                    </div>
                                </div>

                                {/* ... (rest of the component code) ... */}

                                {/* Locations Map */}
                                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Locations Overview</h2>
                                    <div className="h-150 w-full">
                                        {locationsMapData.length > 0 ? (
                                            <MapComponent locations={locationsMapData} />
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-gray-500">No location data available for map.</div>
                                        )}
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Activity</h2>
                                    {recentActivity.length === 0 ? (
                                        <p className="text-gray-500">No recent activity.</p>
                                    ) : (
                                        <ul className="divide-y divide-gray-200">
                                            {recentActivity.map((item, index) => (
                                                <li key={item.id || index} className="py-3 flex items-center">
                                                    <span className="mr-3 text-lg">
                                                        {item.type === 'species' && <FaLeaf className="text-green-500" />}
                                                        {item.type === 'compound' && <FaFlask className="text-blue-500" />}
                                                        {item.type === 'user' && <FaUsers className="text-purple-500" />}
                                                        {item.type === 'location' && <FaMapMarkerAlt className="text-red-500" />}
                                                        {item.type === 'reference' && <FaBook className="text-yellow-500" />}
                                                        {item.type === 'herbarium' && <FaBuilding className="text-teal-500" />}
                                                    </span>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{item.name || item.username || item.title || item.city_town || 'Unnamed Item'}</p>
                                                        <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </>
                        )
                    )}
                </>
            )}
            </div>
        </AdminLayout>
    );
};

const StatCard: React.FC<{ title: string; count: number; icon: React.ReactNode }> = ({ title, count, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
            <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
            <p className="text-4xl font-bold text-gray-800 mt-2">{count}</p>
        </div>
        <div className="text-5xl opacity-75">
            {icon}
        </div>
    </div>
);

export default AdminPage;