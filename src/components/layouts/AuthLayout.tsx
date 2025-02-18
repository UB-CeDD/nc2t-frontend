// src/layouts/AuthLayout.tsx
import React from 'react';

const AuthLayout: React.FC = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;