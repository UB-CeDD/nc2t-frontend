import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <div className="text-center">
                <h1 className="text-4xl font-bold">Home Page</h1>
                <p className="mt-4 text-lg text-gray-600">Welcome to the home page!</p>
            </div>
        </MainLayout>
    );
};

export default HomePage;