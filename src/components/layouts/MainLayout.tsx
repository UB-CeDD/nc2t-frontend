import React from 'react';
import Navbar from '../commons/Navbar';
import Footer from '../commons/Footer';

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