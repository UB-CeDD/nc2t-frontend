import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '@/services/userService';
import { useTranslation } from "react-i18next";

import { UserModel } from '@/helpers/types';
import AdminLayout from '@components/layouts/AdminLayout';

const UserDetails: React.FC = () => {
    const { id: userId } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const [user, setUser] = useState<UserModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) {
                setError('User ID not provided');
                setLoading(false);
                return;
            }
            
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
        <AdminLayout>
            <div className="flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md w-full">
                    <h1 className="text-2xl flex justify-center font-bold mb-8">{t('user.details')}</h1>
                    <p><strong>{t('user.form_fields.name')}:</strong> {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}</p>
                    <p><strong>{t('user.form_fields.email')}:</strong> {user.email}</p>
                    <p><strong>{t('user.form_fields.department')}:</strong> {user.department}</p>
                    <p><strong>Active:</strong> {user.is_active ? 'Yes' : 'No'}</p>
                    <p><strong>Staff:</strong> {user.is_staff ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserDetails;