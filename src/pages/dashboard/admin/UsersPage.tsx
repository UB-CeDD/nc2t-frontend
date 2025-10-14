import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import UserList from '@/components/users/UserList';
import AddEditUser from '@/components/users/AddEditUser';
import { useTranslation } from "react-i18next";
import { UserModel } from '@/helpers/types';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';
import Loader from '@components/commons/Loader';
import { useNavigate } from 'react-router-dom';

const UsersPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state: RootState) => state.loading);

    const [showAddEditUser, setShowAddEditUser] = useState(false);
    const [editingUser, setEditingUser] = useState<UserModel | undefined>(undefined);

    const handleEditUser = (user: UserModel) => {
        setEditingUser(user);
        setShowAddEditUser(true);
    };

    const handleCloseForm = () => {
        setEditingUser(undefined);
        setShowAddEditUser(false);
    };

    return (
        <AdminLayout>
        { isLoading ? ( <Loader /> ) : (
            <div className="flex flex-col p-4">
                <div className="flex flex-row items-center justify-between w-full mb-4">
                    <h1 className="text-2xl font-bold">{t('user.user')}</h1>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => navigate('/admin/users/add')}>
                    </button>
                </div>
            
                {/* {showAddEditUser && <AddEditUser user={editingUser} onClose={handleCloseForm} />} */}
                <UserList onEditUser={handleEditUser} />
            </div>
        )}
        </AdminLayout>
    );
};

export default UsersPage;