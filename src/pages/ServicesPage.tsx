import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
// import { FaLaptopCode, FaMobileAlt, FaCloud } from 'react-icons/fa'; // Removed generic icons, using Font Awesome classes

const ServicesPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="heading-lg text-center mb-10 text-gray-800">Our NCCT Services</h1>
                <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
                    The Natural Compound Curation Tool (NCCT) provides a suite of powerful services designed to empower researchers in biodiversity, natural product discovery, and conservation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Service 1: Species Data Management */}
                    <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                        <i className="fas fa-leaf text-blue-600 text-6xl mb-6"></i>
                        <h2 className="heading text-xl font-bold mb-3 text-gray-800">Species Data Management</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Comprehensive tools for cataloging, organizing, and managing detailed information about various species, including taxonomy, characteristics, and ecological data.
                        </p>
                    </div>

                    {/* Service 2: Compound Discovery & Analysis */}
                    <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                        <i className="fas fa-atom text-green-600 text-6xl mb-6"></i>
                        <h2 className="heading text-xl font-bold mb-3 text-gray-800">Compound Discovery & Analysis</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Advanced features for exploring, analyzing, and linking chemical compounds found in natural sources to their respective species and references.
                        </p>
                    </div>

                    {/* Service 3: Geographic Insights & Mapping */}
                    <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                        <i className="fas fa-map-marker-alt text-yellow-600 text-6xl mb-6"></i>
                        <h2 className="heading text-xl font-bold mb-3 text-gray-800">Geographic Insights & Mapping</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Interactive mapping and visualization tools to understand the geographical distribution and collection locations of species and compounds.
                        </p>
                    </div>

                    {/* Service 4: Scientific Reference Curation */}
                    <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                        <i className="fas fa-book text-red-600 text-6xl mb-6"></i>
                        <h2 className="heading text-xl font-bold mb-3 text-gray-800">Scientific Reference Curation</h2>
                        <p className="text-gray-700 leading-relaxed">
                            A robust system for curating, organizing, and accessing a vast collection of scientific literature and references relevant to natural product research.
                        </p>
                    </div>

                    {/* Service 5: Collaborative Research Platform */}
                    <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                        <i className="fas fa-users text-purple-600 text-6xl mb-6"></i>
                        <h2 className="heading text-xl font-bold mb-3 text-gray-800">Collaborative Research Platform</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Facilitating collaboration among researchers with secure user management, data sharing, and version control for species and compound data.
                        </p>
                    </div>

                    {/* Service 6: Data Export & API Access */}
                    <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                        <i className="fas fa-database text-teal-600 text-6xl mb-6"></i>
                        <h2 className="heading text-xl font-bold mb-3 text-gray-800">Data Export & API Access</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Seamlessly export your curated data in various formats or integrate with other systems via our comprehensive API for advanced analytics and applications.
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ServicesPage;
