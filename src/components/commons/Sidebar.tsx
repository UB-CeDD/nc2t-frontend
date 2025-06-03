import React from 'react';
import {NavLink} from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar bg-gray-800 text-white h-full p-4">
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            isActive ? 'text-blue-400' : 'text-white'
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/admin"
                        className={({isActive}) =>
                            isActive ? 'text-blue-400' : 'text-white'
                        }
                    >
                        Admin Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/compounds"
                        className={({isActive}) =>
                            isActive ? 'text-blue-400' : 'text-white'
                        }
                    >
                        Compounds
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/locations"
                        className={({isActive}) =>
                            isActive ? 'text-blue-400' : 'text-white'
                        }
                    >
                        Locations
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;