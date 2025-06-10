import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import UserList from '@/components/users/UserList';
import AddEditUser from '@/components/users/AddEditUser';
import UserDetails from '@/components/users/UserDetails';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const UsersPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showAddEditUser, setShowAddEditUser] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const handleAddUserClick = () => {
        setShowAddEditUser(true);
        setShowUserDetails(false);
    };

    const handleViewUser = (userId: string) => {
        setSelectedUserId(userId);
        setShowUserDetails(true);
        setShowAddEditUser(false);
    };

    const handleCancel = () => {
        setShowAddEditUser(false);
        setShowUserDetails(false);
    };

    return (
        <AdminLayout>
            <div className="flex flex-col p-4">
                <div className="flex flex-row items-center justify-between w-full mb-4">
                    <h1 className="text-2xl font-bold">{t('user.user')}</h1>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => setShowAddEditUser(!showAddEditUser)}    >
                        {t( showAddEditUser ? 'user.list' : 'user.add')}
                    </button>
                </div>
            
                {showAddEditUser && <AddEditUser onCancel={handleCancel} />}
                {showUserDetails && selectedUserId && (
                    <UserDetails userId={selectedUserId} onCancel={handleCancel} />
                )}
                {!showAddEditUser && !showUserDetails && (
                    <UserList onViewUser={handleViewUser} />
                )}
            </div>
        </AdminLayout>
    );
};

export default UsersPage;