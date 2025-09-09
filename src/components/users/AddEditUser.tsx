import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserModel } from '@/helpers/types';
import { fetchUserThunk, updateUserThunk, createUserThunk } from '@store/thunks/userThunks';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { useNotification } from '@/components/commons/NotificationContext';
import Spinner from '@/components/commons/Spinner';
import { RootState } from '@/store/store';


interface AddEditUserProps {
    user?: UserModel; // The user data for editing
    onClose: () => void; // Function to call when form is closed/submitted
}

const AddEditUser: React.FC<AddEditUserProps> = ({ user, onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const { userDetails, loading } = useSelector((state: RootState) => state.user);
    const { addNotification } = useNotification();

    const [formData, setFormData] = useState<UserModel>({
        email: '',
        username: '',
        department: '',
        password: '',
    });

    useEffect(() => {
        if (user) { // If user prop is provided, use it directly
            setFormData({
                email: user.email || '',
                username: user.username || '',
                password: user.password || '',
                department: user.department || '',
            });
        } else if (id) { // Otherwise, if id is in params, fetch user details
            dispatch(fetchUserThunk(id));
        }
    }, [user, id, dispatch]);

    useEffect(() => {
        if (userDetails && id && !user) { // Only update from fetched userDetails if no user prop and id exists
            setFormData({
                email: userDetails.email || '',
                username: userDetails.username || '',
                password: userDetails.password || '',
                department: userDetails.department || '',
            });
        }
    }, [userDetails, id, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (user?.id) { // Use user.id if user prop is present
                await dispatch(updateUserThunk(user.id, formData));
                addNotification(t('user.update_success'), 'success');
            } else {
                await dispatch(createUserThunk(formData));
                addNotification(t('user.create_success'), 'success');
            }
            onClose(); // Call onClose after successful submission
        } catch (error) {
            addNotification(t('user.action_failed'), 'error');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-2xl flex justify-center font-bold mb-8">
                    {id ? t('user.edit') : t('user.add')}
                </h1>
                <form onSubmit={handleSubmit}>
                    {/* ... form fields ... */}
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                            {t('user.form_fields.username')}
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={t('user.form_fields.username')}
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                            {t('user.form_fields.email')}
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={t('user.form_fields.email')}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                            {t('user.form_fields.department')}
                        </label>
                        <input
                            type="text"
                            name="department"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={t('user.form_fields.department')}
                            value={formData.department}
                            onChange={handleChange}
                        />
                    </div>
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                            {t('user.form_fields.department')}
                        </label>
                        <input
                            type="text"
                            name="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={t('user.form_fields.password')}
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? <Spinner size={5} /> : t('common.save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditUser;