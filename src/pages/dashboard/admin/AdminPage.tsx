import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';

const AdminPage: React.FC = () => {
    return (
        <AdminLayout>
            <div className="text-center">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="mt-4 text-lg text-gray-600">Welcome to the admin dashboard!</p>
            </div>
        </AdminLayout>
    );
};

export default AdminPage;