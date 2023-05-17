import { initFlowbite } from "flowbite";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/images/emkop-logo-transparent-landscape.png';

import Cookies from 'universal-cookie';
import SkeletonLayout from "../layouts/SkeletonLayout";

export default function SidenavBlock() {
    // === Hooks ===
    const cookies = useMemo(() => new Cookies(), []);
    const navigate = useNavigate();

    // === UI States ===
    const [ fetchingListMenu, setFetchingListMenu ] = useState(false);
    const [ listMenu, setListMenu ] = useState(null);
    const [ user, setUser ] = useState(null);

    // Datas
    const endpoint = process.env.REACT_APP_EMKOP_ENDPOINT_LIST_MENU;
    const accessToken = cookies.get('accessToken');
    
    useEffect(() => {
        initFlowbite();
    })
    
    // =====================
    // == Fetch List Menu ==
    // =====================
    useEffect(() => {
        setFetchingListMenu(true);
        if(accessToken !== null){
            fetch(endpoint, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                return res.json()
            }).then(response => {
                if(response.status === 200){
                    // User Logged in.
                    setListMenu(response.data.menu);
                    setUser(response.data.user);
                    // Stop loading animation
                    setFetchingListMenu(false);
                } else if (response.status === 401){
                    // User is Not Logged in.
                    navigate("/login");
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            navigate("/login");
        }
        // == End Of List Menu Fetch
    }, [accessToken, endpoint, navigate]);

    // === Handlers ===
    function logoutHandler(e){
        e.preventDefault();
        cookies.remove('accessToken', { path: '/' });
        navigate('/login');
    }

    return (
        <>
            {/* Wrapper */}
            <aside id="default-sidebar" className="flex flex-row fixed top-0 left-0 z-40 w-full h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidenav">
                {/* Content */}
                <div className="overflow-y-auto py-5 px-3 w-[70%] sm:w-[20%] h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <ul className="space-y-2">
                        {/* Logo */}
                        <li>
                            <img src={logo} alt={logo} />
                        </li>

                        {/* User */}
                        {fetchingListMenu &&
                            <li>
                                <SkeletonLayout />
                            </li>
                        }
                        {!fetchingListMenu && user &&
                            <li>
                                <div className="p-2 flex flex-col">
                                    <span className="font-medium text-sm text-slate-700">You're logged as</span>
                                    <div className="flex flex-wrap justify-between">
                                        <span className="font-semibold text-xl py-0 mb-1 text-slate-700">{user.full_name}</span>
                                        <button onClick={(e) => logoutHandler(e)} className="font-medium text-sm py-1 px-3 mb-1 rounded-full bg-blue-700 hover:bg-blue-900 text-white">Logout</button>
                                    </div>
                                </div>
                            </li>
                        }

                        {/* List Menu */}
                        {fetchingListMenu &&
                            <li>
                                <SkeletonLayout />
                            </li>
                        }

                        {!fetchingListMenu && listMenu &&
                            <li>
                                <Link to={'/dashboard'} id={'dashboard'} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <i className={`fa-solid fa-house flex-shrink-0 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}></i>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
                                </Link>
                            </li>
                        }
                        
                        {!fetchingListMenu && listMenu &&
                            listMenu.map((item) => (
                                <li key={item.navbar_order}>
                                    <Link to={item.navbar_path} id={item.navbar_page} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <i className={`fa-solid ${item.navbar_icon} flex-shrink-0 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}></i>
                                        <span className="flex-1 ml-3 whitespace-nowrap">{item.navbar_label}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {/* Sidenav Close Btn Mobile */}
                <div className="bg-transparent w-[30%] sm:w-[80%] sm:hidden" data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"></div>
            </aside>
        </>
    )
}
