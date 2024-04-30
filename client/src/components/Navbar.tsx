import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaUser,
    FaSignOutAlt,
    FaSignInAlt,
    FaBars,
    FaProjectDiagram,
    FaTasks,
    FaUsers,
    FaCog,
} from 'react-icons/fa';
import clsx from 'clsx';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies, _, removeCookie] = useCookies(['UserToken']);

    // Toggle sidebar
    const toggleSidebar = () => setIsOpen(!isOpen);

    useEffect(() => {
        const tokenExists = !!cookies.UserToken;
        setIsAuthenticated(tokenExists);
    }, [cookies]);

    const handleLogout = async () => {
        try {
            await axios.post('https://codsoft-projectmanagement-tool-webapp.onrender.com/v2/auth/logout', {}, {
                withCredentials: true,
            });

            removeCookie('UserToken');
            toast.success('Logout successful!', { autoClose: 2000 });

            setIsAuthenticated(false);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Error during logout:', error);
            toast.error('Failed to logout. Please try again.');
        }
    };

    const handleLogin = () => navigate('/login');

    return (
        <div className="flex h-screen">
            <ToastContainer /> {/* Required for toast messages */}
            <div
                className={clsx(
                    'bg-gray-800 text-white transition-transform',
                    isOpen ? 'w-56' : 'w-20',
                )}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <Link to={'/'}>
                        {
                            isOpen ? (<span className="text-lg font-bold">TaskAsin</span>) : (<span className="text-lg font-bold">TA</span>)
                        }
                    </Link>
                    <button onClick={toggleSidebar} className="p-2">
                        <FaBars />
                    </button>
                </div>

                <nav className="mt-4">
                    <ul className='space-y-3'>
                        <li
                            className={clsx(
                                'p-2 hover:bg-gray-700 transition-colors',
                                location.pathname === '/' && 'bg-gray-700',
                            )}
                        >
                            <Link to="/" className="flex items-center space-x-2">
                                <FaHome />
                                {isOpen && <span>Home</span>}
                            </Link>
                        </li>
                        <li
                            className={clsx(
                                'p-2 hover:bg-gray-700 transition-colors',
                                location.pathname === '/protected/profile' && 'bg-gray-700',
                            )}
                        >
                            <Link to="/protected/profile" className="flex items-center space-x-2">
                                <FaUser />
                                {isOpen && <span>Profile</span>}
                            </Link>
                        </li>
                        <li
                            className={clsx(
                                'p-2 hover:bg-gray-700 transition-colors',
                                location.pathname === '/protected/dashboard' && 'bg-gray-700',
                            )}
                        >
                            <Link to="/protected/dashboard" className="flex items-center space-x-2">
                                <FaHome />
                                {isOpen && <span>Dashboard</span>}
                            </Link>
                        </li>
                        <li
                            className={clsx(
                                'p-2 hover:bg-gray-700 transition-colors',
                                location.pathname === '/protected/projects' && 'bg-gray-700',
                            )}
                        >
                            <Link to="/protected/projects" className="flex items-center space-x-2">
                                <FaProjectDiagram />
                                {isOpen && <span>Projects</span>}
                            </Link>
                        </li>
                        <li
                            className={clsx(
                                'p-2 hover:bg-gray-700 transition-colors',
                                location.pathname === '/protected/tasks' && 'bg-gray-700',
                            )}
                        >
                            <Link to="/protected/tasks" className="flex items-center space-x-2">
                                <FaTasks />
                                {isOpen && <span>Tasks</span>}
                            </Link>
                        </li>
                        <li
                            className={clsx(
                                'p-2 hover:bg-gray-700 transition-colors',
                                location.pathname === '/protected/team' && 'bg-gray-700',
                            )}
                        >
                            <Link to="/protected/team" className="flex items-center space-x-2">
                                <FaUsers />
                                {isOpen && <span>Team</span>}
                            </Link>
                        </li>
                        <li
                            className={clsx(
                                'p-2 hover:bg-gray-700 transition-colors',
                                location.pathname === '/protected/settings' && 'bg-gray-700',
                            )}
                        >
                            <Link to="/protected/settings" className="flex items-center space-x-2">
                                <FaCog />
                                {isOpen && <span>Settings</span>}
                            </Link>
                        </li>



                        <li
                            className={clsx(
                                'p-2 hover:bg-gray-700 transition-colors',
                                location.pathname === '/protected/logout' && 'bg-gray-700',
                            )}
                        >
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 text-white"
                                >
                                    <FaSignOutAlt />
                                    {isOpen && <span>Logout</span>}
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="flex items-center space-x-2 text-white"
                                >
                                    <FaSignInAlt />
                                    {isOpen && <span>Login</span>}
                                </button>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
