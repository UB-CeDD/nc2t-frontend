import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from './../components/layouts/MainLayout';
import { fetchTotalSpeciesCount } from '@/store/thunks/speciesThunk';
import { fetchTotalCompoundCount } from '@/store/thunks/compoundThunk';
import { fetchTotalLocationCount } from '@/store/thunks/locationThunk';
import { fetchTotalReferenceCount } from '@/store/thunks/referenceThunk';
import { RootState, AppDispatch } from '@/store/store'; // Import AppDispatch

const HomePage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch(); // Explicitly type useDispatch
    const totalSpeciesCount = useSelector((state: RootState) => state.getSpecies.totalSpeciesCount);
    const totalCompoundCount = useSelector((state: RootState) => state.getCompounds.totalCompoundCount);
    const totalLocationCount = useSelector((state: RootState) => state.getLocations.totalLocationCount);
    const totalReferenceCount = useSelector((state: RootState) => state.getReferences.totalReferenceCount);

    useEffect(() => {
        dispatch(fetchTotalSpeciesCount());
        dispatch(fetchTotalCompoundCount());
        dispatch(fetchTotalLocationCount());
        dispatch(fetchTotalReferenceCount());
    }, [dispatch]);

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 md:py-32 text-center shadow-lg">
                <div className="container mx-auto px-4">
                    <h1 className="heading-xl mb-4 leading-tight">
                        NCCT Project: Unlocking Biodiversity and Chemical Insights
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                        A comprehensive platform for managing species, their geographic locations, associated chemical compounds, and scientific references.
                    </p>
                    <div className="space-x-4">
                        <Link to="/species" className="btn-primary text-lg px-8 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                            Explore Species
                        </Link>
                        <Link to="/compounds" className="bg-white text-blue-700 text-lg px-8 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100">
                            Discover Compounds
                        </Link>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="heading-lg text-center mb-12 text-gray-800">Our Impact in Numbers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow-md">
                            <i className="fas fa-leaf text-blue-600 text-5xl mb-4"></i> {/* Placeholder Icon */}
                            <p className="text-5xl font-bold text-blue-700">{totalSpeciesCount}</p>
                            <p className="text-lg text-gray-600 mt-2">Species Cataloged</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-green-50 rounded-lg shadow-md">
                            <i className="fas fa-atom text-green-600 text-5xl mb-4"></i> {/* Placeholder Icon */}
                            <p className="text-5xl font-bold text-green-700">{totalCompoundCount}</p>
                            <p className="text-lg text-gray-600 mt-2">Unique Compounds</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-yellow-50 rounded-lg shadow-md">
                            <i className="fas fa-map-marker-alt text-yellow-600 text-5xl mb-4"></i> {/* Placeholder Icon */}
                            <p className="text-5xl font-bold text-yellow-700">{totalLocationCount}</p>
                            <p className="text-lg text-gray-600 mt-2">Locations Documented</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-red-50 rounded-lg shadow-md">
                            <i className="fas fa-book text-red-600 text-5xl mb-4"></i> {/* Placeholder Icon */}
                            <p className="text-5xl font-bold text-red-700">{totalReferenceCount}</p>
                            <p className="text-lg text-gray-600 mt-2">Scientific References</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Sections */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="heading-lg text-center mb-12">Our Core Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* Species Management */}
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Species Data Management</h3>
                            <p className="text-gray-600 mb-4">
                                Catalog and manage detailed information about various species, including taxonomy,
                                characteristics, and ecological data.
                            </p>
                            <Link to="/species" className="text-blue-600 hover:text-blue-800 font-medium">Learn More &rarr;</Link>
                        </div>

                        {/* Compound Discovery */}
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Chemical Compound Insights</h3>
                            <p className="text-gray-600 mb-4">
                                Explore and analyze chemical compounds associated with different species,
                                facilitating drug discovery and natural product research.
                            </p>
                            <Link to="/compounds" className="text-blue-600 hover:text-blue-800 font-medium">Learn More &rarr;</Link>
                        </div>

                        {/* Geographic Insights */}
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Geographic Distribution</h3>
                            <p className="text-gray-600 mb-4">
                                Visualize and manage the collection locations and habitats of species,
                                offering valuable ecological insights.
                            </p>
                            <Link to="/locations" className="text-blue-600 hover:text-blue-800 font-medium">View Locations &rarr;</Link>
                        </div>

                        {/* Research & References */}
                        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Scientific References</h3>
                            <p className="text-gray-600 mb-4">
                                Organize and access a vast collection of scientific literature and references
                                pertinent to biodiversity and chemical research.
                            </p>
                            <Link to="/references" className="text-blue-600 hover:text-blue-800 font-medium">Browse References &rarr;</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About the Project Section */}
            <section className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="heading-lg mb-6">About the NCCT Project</h2>
                    <p className="text-lg mb-8 opacity-90">
                        The National Center for Chemical and Tropical Conservation (NCCT) project aims to create a centralized
                        database and analytical tools for researchers, conservationists, and policymakers. By integrating
                        diverse data points, we strive to foster a deeper understanding of natural resources and
                        support sustainable development initiatives.
                    </p>
                    <Link to="/about" className="bg-white text-blue-700 px-6 py-3 rounded-full font-medium transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100">
                        Learn More About Us
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
};

export default HomePage;