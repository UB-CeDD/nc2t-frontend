import React from 'react';
import MainLayout from '../components/layouts/MainLayout';

const AboutPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="heading-lg text-center mb-10 text-gray-800">About the NCCT Project</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white p-8 rounded-lg shadow-xl">
                    <div>
                        <img src="https://placehold.co/600x400/edf2f7/4a5568?text=NCCT+Project" alt="NCCT Project Overview" className="rounded-lg shadow-lg w-full"/>
                    </div>
                    <div>
                        <h2 className="heading mb-6 text-gray-700">Our Mission</h2>
                        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                            The National Center for Chemical and Tropical Conservation (NCCT) project is dedicated to advancing scientific understanding of biodiversity and natural resources. Our mission is to provide a robust platform for researchers, conservationists, and policymakers to access, manage, and analyze critical data related to species, their geographical distribution, associated chemical compounds, and relevant scientific literature.
                        </p>
                        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                            We aim to facilitate interdisciplinary research, support informed decision-making for conservation efforts, and contribute to the sustainable utilization of natural wealth, particularly in tropical regions.
                        </p>
                        <h2 className="heading mb-6 text-gray-700">Our Values</h2>
                        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                            <li><strong>Scientific Rigor:</strong> Upholding the highest standards of data accuracy and research methodology.</li>
                            <li><strong>Collaboration:</strong> Fostering partnerships across institutions and disciplines to maximize impact.</li>
                            <li><strong>Innovation:</strong> Continuously seeking new technologies and approaches to data management and analysis.</li>
                            <li><strong>Conservation:</strong> Committing to the protection and sustainable management of global biodiversity.</li>
                            <li><strong>Accessibility:</strong> Ensuring that valuable scientific data is discoverable and usable by the global community.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AboutPage;
