import React from 'react';
import MainLayout from '../components/layouts/MainLayout';

const AboutPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <img src="https://placehold.co/600x400" alt="Our Team" className="rounded-lg shadow-lg"/>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Our mission is to leverage cutting-edge technology to solve complex problems and drive innovation. We are committed to delivering high-quality solutions that exceed our clients' expectations and make a positive impact on the world.
                        </p>
                        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                        <ul className="list-disc list-inside text-lg text-gray-700">
                            <li>Innovation and Excellence</li>
                            <li>Integrity and Transparency</li>
                            <li>Customer-Centric Approach</li>
                            <li>Collaboration and Teamwork</li>
                        </ul>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AboutPage;
