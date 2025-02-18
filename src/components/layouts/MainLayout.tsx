// src/layouts/MainLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const MainLayout: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4">
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            <main className="flex-1 p-4">
                {children}
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                &copy; 2023 NCCT Project
            </footer>
        </div>
    );
};

export default MainLayout;