import React from 'react';

interface UserDetailsProps {
    user: {
        id: string;
        name: string;
        position: string;
        role: string;
        department: string;
    };
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{t('user.details')}</h1>
                <h1>User Details</h1>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Position:</strong> {user.position}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Department:</strong> {user.department}</p>
            </div>
        </div>
    );
};

export default UserDetails;