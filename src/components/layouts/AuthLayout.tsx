import React, { ReactNode } from 'react';
import Footer from '../commons/Footer';


interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
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