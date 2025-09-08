import React, { useEffect, useState } from 'react';
import Table from '../commons/Table';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersThunk } from '@store/thunks/userThunks';
import { UserModel } from '@/helpers/types';
import { useNavigate } from 'react-router-dom';

const UserList: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.getUsers);
    const [searchText, setSearchText] = useState('');

    const filteredUsers = users.filter((user) => {
        return (
            user.username.toLowerCase().includes(searchText.toLowerCase()) ||
            user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const columns = [
        { key: 'first_name', label: t('user.first_name') },
        { key: 'last_name', label: t('user.last_name') },
        { key: 'email', label: t('user.email') },
        { key: 'username', label: t('user.username') },
    ];
    
    const handleView = (row: UserModel) => {
        navigate(`/admin/users/${row.id}`);
    };

    const renderActions = (row: UserModel) => (
        <div className="flex justify-center items-center gap-2">
            <a className="text-blue-500 cursor-pointer" onClick={() => handleView(row)}>{t('user.view')}</a>
            <a className="text-red-500 cursor-pointer" onClick={() => handleDelete(row)}>{t('user.delete')}</a>
        </div>
    );

    useEffect(() => {
        // Dispatch any necessary actions to fetch users if needed
        dispatch(fetchUsersThunk());
    }, [dispatch]);

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                {/* <h1 className="text-2xl flex justify-center font-bold mb-8">{t('')}</h1> */}
                <h1>User List</h1>
                <div className="filters mb-6 mt-4 flex gap-4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <Table data={filteredUsers} columns={columns} renderActions={renderActions} />
            </div>
        </div>
    );
};

export default UserList;