import React from 'react';
import Footer from '../commons/Footer';

const AuthLayout: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default AuthLayout;