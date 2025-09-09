import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '@/store/store';
import { fetchUsersThunk } from '@/store/thunks/userThunks';
import { addSpeciesUserThunk, fetchSpeciesUsersThunk, removeSpeciesUserThunk, updateSpeciesUserRoleThunk } from '@/store/thunks/speciesUserRoleThunk';
import { UserModel } from '@/helpers/types';
import { SpeciesUserRole } from '@/services/speciesUserRoleService';

const SpeciesUserManagement: React.FC = () => {
    const { id: speciesId } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const { users } = useSelector((state: RootState) => state.user);
    const { speciesUsers, loading, error } = useSelector((state: RootState) => state.speciesUserRoles);

    const [selectedUser, setSelectedUser] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<SpeciesUserRole>('author');

    useEffect(() => {
        if (speciesId) {
            dispatch(fetchSpeciesUsersThunk(speciesId));
            dispatch(fetchUsersThunk()); // Fetch all users to select from
        }
    }, [dispatch, speciesId]);

    const handleAddUser = () => {
        if (speciesId && selectedUser && selectedRole) {
            dispatch(addSpeciesUserThunk(speciesId, parseInt(selectedUser), selectedRole));
            setSelectedUser('');
        }
    };

    const handleRemoveUser = (userId: number) => {
        if (speciesId) {
            dispatch(removeSpeciesUserThunk(speciesId, userId));
        }
    };

    const handleRoleChange = (userId: number, newRole: SpeciesUserRole) => {
        if (speciesId) {
            dispatch(updateSpeciesUserRoleThunk(speciesId, userId, newRole));
        }
    };

    if (loading) {
        return <div>Loading user relationships...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Associated Users</h2>
            <div className="mb-4">
                <h3 className="text-lg font-bold">Add User to Species</h3>
                <div className="flex gap-2 mt-2">
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Select User</option>
                        {users.map((user: UserModel) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as SpeciesUserRole)}
                        className="p-2 border rounded"
                    >
                        <option value="author">Author</option>
                        <option value="curator">Curator</option>
                        <option value="publisher">Publisher</option>
                    </select>
                    <button
                        onClick={handleAddUser}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Add User
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold">Current Species Users</h3>
                {speciesUsers.length === 0 ? (
                    <p>No users associated with this species.</p>
                ) : (
                    <ul className="mt-2">
                        {speciesUsers.map((user) => (
                            <li key={user.user.username} className="flex items-center justify-between border-b py-2">
                                <span>{user.user.username} - {user.role}</span>
                                <div className="flex gap-2">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.user.id!, e.target.value as SpeciesUserRole)}
                                        className="p-1 border rounded text-sm"
                                    >
                                        <option value="author">Author</option>
                                        <option value="curator">Curator</option>
                                        <option value="publisher">Publisher</option>
                                    </select>
                                    <button
                                        onClick={() => handleRemoveUser(user.user.id!)}
                                        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SpeciesUserManagement;