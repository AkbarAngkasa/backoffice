import { initFlowbite } from "flowbite";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/images/emkop-logo-transparent-landscape.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie';
import SkeletonLayout from "../layouts/SkeletonLayout";

export default function SidenavBlock() {
    // === Hooks ===
    const cookies = useMemo(() => new Cookies(), []);
    const navigate = useNavigate();

    // === UI States ===
    const [ fetchingListMenu, setFetchingListMenu ] = useState(false);
    // const [ listMenu, setListMenu ] = useState(null);

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
                console.log(response);
                setFetchingListMenu(false);
                // setListMenu(response);
            }).catch(err => {
                console.log(err)
            })
        }
        // == End Of List Menu Fetch
    }, [accessToken, endpoint]);

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
                        <li>
                            <img src={logo} alt={logo} />
                        </li>
                        <li>
                            <div className="p-2 flex flex-col">
                                <span className="font-medium text-sm text-slate-700">You're logged as</span>
                                <div className="flex flex-wrap justify-between">
                                    <span className="font-semibold text-xl py-0 mb-1 text-slate-700">User's name</span>
                                    <button onClick={(e) => logoutHandler(e)} className="font-medium text-sm py-1 px-3 mb-1 rounded-full bg-blue-700 hover:bg-blue-900 text-white">Logout</button>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Link to="/dashboard" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faHouse} className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
                            </Link>
                        </li>
                       
                        {fetchingListMenu &&
                            <li>
                                <SkeletonLayout />
                            </li>
                        }

                        {

                        }

                    </ul>

                </div>
                {/* Sidenav Close Btn Mobile */}
                <div className="bg-transparent w-[30%] sm:w-[80%] sm:hidden" data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"></div>
            </aside>
        </>
    )
}
