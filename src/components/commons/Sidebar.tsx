import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/nc2t_logo.png';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar bg-gray-800 text-white h-full p-4 flex flex-col">
            <div className="logo mb-6 flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-17 w-[50%]" />
            </div>
            <ul className="flex-1">
                <li>
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-white text-sky-500 p-2 rounded block'
                                : 'text-white p-2 block hover:bg-gray-700 hover:text-sky-400'
                        }
                    >
                        Admin Dashboard
                    </NavLink>
                </li>
                <li>
                    {/* <div className="group relative"> */}
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-white text-sky-500 p-2 rounded block'
                                : 'text-white p-2 block hover:bg-gray-700 hover:text-sky-400'
                        }
                    >
                        Users
                    </NavLink>
                    {/* <ul className="absolute left-0 top-full mt-2 hidden group-hover:block bg-gray-700 text-white rounded shadow-lg">
                            <li>
                                <NavLink
                                    to="/admin/users/list"
                                    className="block px-4 py-2 hover:bg-gray-600"
                                >
                                    User List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/users/add"
                                    className="block px-4 py-2 hover:bg-gray-600"
                                >
                                    Add User
                                </NavLink>
                            </li>
                        </ul>
                    </div> */}
                </li>
                <li>
                    <NavLink
                        to="/dashboard/compounds"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-white text-sky-500 p-2 rounded block'
                                : 'text-white p-2 block hover:bg-gray-700 hover:text-sky-400'
                        }
                    >
                        Compounds
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/species"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-white text-sky-500 p-2 rounded block'
                                : 'text-white p-2 block hover:bg-gray-700 hover:text-sky-400'
                        }
                    >
                        Species
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/references"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-white text-sky-500 p-2 rounded block'
                                : 'text-white p-2 block hover:bg-gray-700 hover:text-sky-400'
                        }
                    >
                        Reference
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/locations"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-white text-sky-500 p-2 rounded block'
                                : 'text-white p-2 block hover:bg-gray-700 hover:text-sky-400'
                        }
                    >
                        Locations
                    </NavLink>
                </li>
            </ul>
            <div className="text-sm text-gray-400 mt-4">&copy; 2025 UBCeDD</div>
        </div>
    );
};

export default Sidebar;