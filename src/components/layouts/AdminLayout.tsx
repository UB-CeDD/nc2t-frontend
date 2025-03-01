// ncct_backend/components/layouts/AdminLayout.tsx
import React from 'react';
import Footer from '@components/commons/Footer';

const AdminLayout: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default AdminLayout;