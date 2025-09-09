import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from '@/components/layouts/AdminLayout';
import { RootState, AppDispatch } from '@/store/store';
import { fetchSpecies } from '@/store/thunks/speciesThunk';
import { fetchCompounds } from '@/store/thunks/compoundThunk';
import { fetchUsersThunk } from '@/store/thunks/userThunks';
import { fetchLocationsThunk } from '@/store/thunks/locationThunk';
import { fetchReferencesThunk } from '@/store/thunks/referenceThunk';
import { fetchHerbariumsThunk } from '@/store/thunks/herbariumThunk';
import { Species, Compound, UserModel, LocationModel, Reference, Herbarium } from '@/helpers/types';
import { FaLeaf, FaFlask, FaUsers, FaMapMarkerAlt, FaBook, FaBuilding } from 'react-icons/fa';
import MapComponent from '@/components/commons/MapComponent';

const AdminPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    // const { species, loading: speciesLoading } = useSelector((state: RootState) => state.species);
    // const { compounds, loading: compoundsLoading } = useSelector((state: RootState) => state.compounds);
    // const { users, loading: usersLoading } = useSelector((state: RootState) => state.user);
    // const { locations, loading: locationsLoading } = useSelector((state: RootState) => state.locations);
    // const { references, loading: referencesLoading } = useSelector((state: RootState) => state.references);
    // const { herbariums, loading: herbariumsLoading } = useSelector((state: RootState) => state.herbariums);
    const [species, setSpecies] = React.useState<Species[] | null>([]);
    // const [speciesLoading, setSpeciesLoading] = React.useState<boolean>(true);
    const [compounds, setCompounds] = React.useState<Compound[] | null>([]);
    // const [compoundsLoading, setCompoundsLoading] = React.useState<boolean>(true);
    const [users, setUsers] = React.useState<UserModel[] | null>([]);
    // const [usersLoading, setUsersLoading] = React.useState<boolean>(true);
    const [locations, setLocations] = React.useState<LocationModel[] | null>([]);
    // const [locationsLoading, setLocationsLoading] = React.useState<boolean>(true);
    const [references, setReferences] = React.useState<Reference[] | null>([]);
    // const [referencesLoading, setReferencesLoading] = React.useState<boolean>(true);
    const [herbariums, setHerbariums] = React.useState<Herbarium[] | null>([]);
    // const [herbariumsLoading, setHerbariumsLoading] = React.useState<boolean>(true);

    // const { species: speciesData, loading: speciesLoading } = useSelector((state: RootState) => state.species);

    useEffect(() => {
        dispatch(fetchSpecies());
        dispatch(fetchCompounds());
        dispatch(fetchUsersThunk());
        dispatch(fetchLocationsThunk());
        dispatch(fetchReferencesThunk());
        dispatch(fetchHerbariumsThunk());
    }, [dispatch]);

    // const allLoading = speciesLoading || compoundsLoading || usersLoading || locationsLoading || referencesLoading || herbariumsLoading;

    const allLoading: any = false;

    // --- Statistics Calculations ---

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
            // Assuming UserModel has a 'role' property
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

    // --- Recent Activity ---
    const allEntities = [
        ...(species || []).map(s => ({ ...s, type: 'species', createdAt: s.created_at })),
        ...(compounds || []).map(c => ({ ...c, type: 'compound', createdAt: c.created_at })),
        ...(users || []).map(u => ({ ...u, type: 'user', createdAt: u.created_at })),
        ...(locations || []).map(l => ({ ...l, type: 'location', createdAt: l.created_at })),
        ...(references || []).map(r => ({ ...r, type: 'reference', createdAt: r.created_at })),
        ...(herbariums || []).map(h => ({ ...h, type: 'herbarium', createdAt: h.created_at })),
    ];

    const recentActivity = allEntities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

            {allLoading ? (
                <div className="text-center text-lg text-gray-600">Loading dashboard data...</div>
            ) : (
                <>
                    {/* Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                        <StatCard title="Species" count={species?.length || 0} icon={<FaLeaf className="text-green-500" />} />
                        <StatCard title="Compounds" count={compounds?.length || 0} icon={<FaFlask className="text-blue-500" />} />
                        <StatCard title="Users" count={users?.length || 0} icon={<FaUsers className="text-purple-500" />} />
                        <StatCard title="Locations" count={locations?.length || 0} icon={<FaMapMarkerAlt className="text-red-500" />} />
                        <StatCard title="References" count={references?.length || 0} icon={<FaBook className="text-yellow-500" />} />
                        <StatCard title="Herbariums" count={herbariums?.length || 0} icon={<FaBuilding className="text-teal-500" />} />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Species by Kingdom</h2>
                            {/* Recharts PieChart goes here */}
                            <div className="h-64 flex items-center justify-center text-gray-500">Chart Placeholder</div>
                            <pre className="text-xs bg-gray-100 p-2 rounded mt-2">{JSON.stringify(speciesByKingdomData, null, 2)}</pre>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Compounds by Class</h2>
                            {/* Recharts BarChart goes here */}
                            <div className="h-64 flex items-center justify-center text-gray-500">Chart Placeholder</div>
                            <pre className="text-xs bg-gray-100 p-2 rounded mt-2">{JSON.stringify(compoundsByClassData, null, 2)}</pre>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Users by Role</h2>
                            {/* Recharts PieChart goes here */}
                            <div className="h-64 flex items-center justify-center text-gray-500">Chart Placeholder</div>
                            <pre className="text-xs bg-gray-100 p-2 rounded mt-2">{JSON.stringify(usersByRoleData, null, 2)}</pre>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">References by Type</h2>
                            {/* Recharts PieChart goes here */}
                            <div className="h-64 flex items-center justify-center text-gray-500">Chart Placeholder</div>
                            <pre className="text-xs bg-gray-100 p-2 rounded mt-2">{JSON.stringify(referencesByTypeData, null, 2)}</pre>
                        </div>
                    </div>

                    {/* Locations Map */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Locations Overview</h2>
                        <div className="h-96 w-full">
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
                                            <p className="text-sm text-gray-500">{item.type} added on {new Date(item.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

// Simple StatCard Component
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