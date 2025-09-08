import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import UserList from '@/components/users/UserList';
import AddEditUser from '@/components/users/AddEditUser';
import { useTranslation } from "react-i18next";

const UsersPage: React.FC = () => {
    const { t } = useTranslation();
    const [showAddEditUser, setShowAddEditUser] = useState(false);

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
            
                {showAddEditUser && <AddEditUser />}
                {!showAddEditUser && <UserList />}
            </div>
        </AdminLayout>
    );
};

export default UsersPage;