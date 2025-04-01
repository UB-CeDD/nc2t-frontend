// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4 text-xl font-semibold">Admin Panel</div>
            <nav>
                <Link to="/dashboard" className="block p-4 hover:bg-gray-200">
                    Dashboard
                </Link>
                <Link to="/settings" className="block p-4 hover:bg-gray-200">
                    Settings
                </Link>
                {/* Add more navigation links as needed */}
            </nav>
        </div>
    );
};

export default Sidebar;
