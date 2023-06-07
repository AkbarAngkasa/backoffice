import { initFlowbite } from 'flowbite';
import { useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, /*faBell, faGrip*/ } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function NavbarBlock({navTitle, user}) {
    // === Hooks ===
    const cookies = useMemo(() => new Cookies(), []);
    const navigate = useNavigate();

    // === UI States ===
    useEffect(() => {
        initFlowbite();
    })
    
    // === Handlers ===
    function logoutHandler(e){
        e.preventDefault();
        // Clear Cache.
        localStorage.clear();
        // Clear Cookies.
        cookies.remove('accessToken', { path: '/' });
        navigate('/login');
    }
    return (
        <header>
            {/* Wrapper */}
            <nav className="py-5 px-5 flex flex-row justify-between align-middle bg-white border-gray-200 dark:bg-gray-800" style={{ margin: 0 }}>

                {/* Wrapper */}
                <div className="flex flex-wrap justify-start">
                    {/* Sidenav Open Btn Mobile */}
                    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="mr-4 text-xl text-gray-500 dark:text-gray-400 dark:focus:ring-gray-600 sm:hidden">
                        <FontAwesomeIcon icon={faBars} />
                    </button>

                    <div className='flex flex-col'>
                        <span className="text-sm font-medium mb-2 text-slate-600 dark:text-white hidden sm:inline-block">Backoffice</span>
                        <span className="text-2xl font-semibold text-slate-600 dark:text-white inline-block capitalize">{navTitle}</span>
                    </div>
                </div>

                {/* Wrapper */}
                <div className='flex flex-wrap justify-end align-middle'>
                    {/* User Button  */}
                    {(user === null) &&
                        <button type="button" aria-expanded="false" id="user-menu-button" className="ml-4 text-xl rounded-lg text-gray-500 dark:text-gray-400 dark:focus:ring-gray-600">
                            <div className="w-8 h-8 rounded-full bg-gray-400 animate-pulse"></div>
                        </button>
                    }
                    {(user !== null) && 
                        <div>
                            <button type="button" data-dropdown-toggle="dropdown" aria-expanded="false" id="user-menu-button" className="ml-4 text-xl rounded-lg text-gray-500 dark:text-gray-400 dark:focus:ring-gray-600">
                                <div className="w-8 h-8 rounded-full">
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                            </button>
                            <div className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
                                <div className="py-3 px-4">
                                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">{user.full_name}</span>
                                    <span className="block text-sm font-light text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                                </div>
                                <ul className="py-1 font-light text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                    <li className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                                        <Link to="/change-password">Change Password</Link>
                                    </li>
                                    <li onClick={(e) => logoutHandler(e)} className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                                        <button>Sign out</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    {/* End Of User Button */}
                </div>
            </nav>
        </header>
    )
}
