// ncct_backend/components/layouts/MainLayout.tsx
import React from 'react';
import Navbar from '@components/commons/Navbar';
import Footer from '@components/commons/Footer';

const MainLayout: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header>
                <Navbar />
            </header>
            <main className="flex-1 p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;