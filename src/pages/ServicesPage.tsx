import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { FaLaptopCode, FaMobileAlt, FaCloud } from 'react-icons/fa';

const ServicesPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <FaLaptopCode className="text-5xl text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Web Development</h2>
                        <p className="text-gray-700">We build responsive and scalable web applications using modern technologies.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <FaMobileAlt className="text-5xl text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Mobile Development</h2>
                        <p className="text-gray-700">We create beautiful and performant mobile apps for both iOS and Android.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <FaCloud className="text-5xl text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Cloud Solutions</h2>
                        <p className="text-gray-700">We provide cloud infrastructure setup, deployment, and management.</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ServicesPage;
