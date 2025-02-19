import React from 'react';
import { Link } from 'react-router-dom';

const AdminLayout: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen flex">
            <aside className="w-64 bg-gray-800 text-white p-4">
                <nav>
                    <ul>
                        <li><Link to="/admin" className="block py-2 px-4 hover:bg-gray-700">Dashboard</Link></li>
                        <li><Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700">Users</Link></li>
                        <li><Link to="/admin/settings" className="block py-2 px-4 hover:bg-gray-700">Settings</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;