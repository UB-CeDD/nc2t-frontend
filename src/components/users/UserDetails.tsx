import React, { useEffect, useState } from 'react';
import { getUserDetails } from '@/services/userService';
import { useTranslation } from "react-i18next";

import { UserModel } from '@/helpers/types';

interface UserDetailsProps {
    userId: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const data = await getUserDetails(userId);
                setUser(data);
                setError(null);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message || 'Failed to fetch user details');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    if (loading) return <div>{t('common.loading')}</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return null;

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">{t('user.details')}</h1>
                <p><strong>{t('user.form_fields.name')}:</strong> {user.name || user.username}</p>
                <p><strong>{t('user.form_fields.position')}:</strong> {user.position}</p>
                <p><strong>{t('user.form_fields.role')}:</strong> {user.role}</p>
                <p><strong>{t('user.form_fields.department')}:</strong> {user.department}</p>
                <p><strong>{t('user.form_fields.email')}:</strong> {user.email}</p>
            </div>
        </div>
    );
};

export default UserDetails;