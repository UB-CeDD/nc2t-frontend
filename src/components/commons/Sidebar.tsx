import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/nc2t_logo.png';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Sidebar: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

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
                                ? 'bg-white text-sky-500 pb-2 px-2 rounded block'
                                : 'text-white pb-2 px-2 block hover:bg-gray-700 hover:text-sky-400'
                        }
                    >
                        Admin Dashboard
                    </NavLink>
                </li>
                {user && user.role.toLowerCase() === 'admin' && (
                    <li>
                        <NavLink
                            to="/admin/users"
                            // className={({ isActive }) =>
                            //     isActive
                            //         ? 'bg-white text-sky-500 p-2 rounded block'
                            //         : 'text-white p-2 block hover:bg-gray-700 hover:text-sky-400'
                            // }
                        >
                            Users
                        </NavLink>
                        <ul className="border-l border-gray-700 pl-4 pt-2 mb-2">
                            <li>
                                <NavLink
                                    to="/admin/users"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-white pl-2 text-sky-500 rounded block'
                                            : 'text-white pl-2 block hover:bg-gray-700 hover:text-sky-400'
                                    }
                                >
                                    List All
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/users/add"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-white pl-2 text-sky-500 rounded block'
                                            : 'text-white pl-2 block hover:bg-gray-700 hover:text-sky-400'
                                    }
                                >
                                    Add New
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                )}
                <li>
                        <NavLink
                            to="/dashboard/species"
                            // className={({ isActive }) =>
                            //     isActive
                            //         ? 'bg-white text-sky-500 rounded block'
                            //         : 'text-white block hover:bg-gray-700 hover:text-sky-400'
                            // }
                        >
                            Species
                        </NavLink>
                        <ul className="border-l border-gray-700 pl-4 pt-2 mb-2">
                            <li>
                                <NavLink
                                    to="/dashboard/species"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-white pl-2 text-sky-500 rounded block'
                                            : 'text-white pl-2 block hover:bg-gray-700 hover:text-sky-400'
                                    }
                                >
                                    List All
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/species/add"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-white pl-2 text-sky-500 rounded block'
                                            : 'text-white pl-2 block hover:bg-gray-700 hover:text-sky-400'
                                    }
                                >
                                    Add New
                                </NavLink>
                            </li>
                        </ul>
            
                </li>
                <li>
                    <NavLink
                        to="/dashboard/compounds"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-white text-sky-500 rounded block'
                                : 'text-white block hover:bg-gray-700 hover:text-sky-400'
                        }
                    >
                        Compounds
                    </NavLink>
                    <ul className="border-l border-gray-700 pl-4 pt-2 mb-2">
                            <li>
                                <NavLink
                                    to="/dashboard/compounds"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-white pl-2 text-sky-500 rounded block'
                                            : 'text-white pl-2 block hover:bg-gray-700 hover:text-sky-400'
                                    }
                                >
                                    List All
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink
                                    to="/dashboard/species/add"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-white text-sky-500 rounded block'
                                            : 'text-white block hover:bg-gray-700 hover:text-sky-400'
                                    }
                                >
                                    Add New
                                </NavLink>
                            </li> */}
                        </ul>
                </li>
                
                <li>
                    <NavLink
                        to="/dashboard/references"
                        // className={({ isActive }) =>
                        //     isActive
                        //         ? 'bg-white text-sky-500 rounded block'
                        //         : 'text-white block hover:bg-gray-700 hover:text-sky-400'
                        // }
                    >
                        Reference
                    </NavLink>
                    <ul className="border-l border-gray-700 pl-4 pt-2 mb-2">
                            <li>
                                <NavLink
                                    to="/dashboard/references"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-white pl-2 text-sky-500 rounded block'
                                            : 'text-white pl-2 block hover:bg-gray-700 hover:text-sky-400'
                                    }
                                >
                                    List All
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink
                                    to="/dashboard/species/add"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-white pl-2 text-sky-500 rounded block'
                                            : 'text-white pl-2 block hover:bg-gray-700 hover:text-sky-400'
                                    }
                                >
                                    Add New
                                </NavLink>
                            </li> */}
                        </ul>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/locations"
                        // className={({ isActive }) =>
                        //     isActive
                        //         ? 'bg-white text-sky-500 rounded block'
                        //         : 'text-white block hover:bg-gray-700 hover:text-sky-400'
                        // }
                    >
                        Locations
                    </NavLink>
                    <ul className="border-l border-gray-700 pl-4 pt-2 mb-2">
                            <li>
                                <NavLink
                                    to="/dashboard/locations"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-white pl-2 text-sky-500 rounded block'
                                            : 'text-white pl-2 block hover:bg-gray-700 hover:text-sky-400'
                                    }
                                >
                                    List All
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink
                                    to="/dashboard/species/add"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-white text-sky-500 rounded block'
                                            : 'text-white block hover:bg-gray-700 hover:text-sky-400'
                                    }
                                >
                                    Add New
                                </NavLink>
                            </li> */}
                        </ul>
                </li>
            </ul>
            <div className="text-sm text-gray-400 mt-4">&copy; 2025 UBCeDD</div>
        </div>
    );
};

export default Sidebar;