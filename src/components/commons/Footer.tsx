import React from 'react';
import {useSelector} from 'react-redux';

const Footer: React.FC = () => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    return (
        <footer className="bg-gray-800 text-white p-4 text-center">
            {isAuthenticated ? (
                <p>&copy; {new Date().getFullYear()} NC2T Project - Logged in as User</p>
            ) : (
                <p>&copy; {new Date().getFullYear()} NC2T Project - Please log in</p>
            )}
        </footer>
    );
};

export default Footer;