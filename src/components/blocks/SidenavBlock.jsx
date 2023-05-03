import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import { Link } from "react-router-dom"
import logo from '../../assets/images/emkop-logo-transparent-landscape.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function SidenavBlock() {
    useEffect(() => {
        initFlowbite();
    });

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
                                    <Link to="/login" className="font-medium text-sm py-1 px-3 mb-1 rounded-full bg-blue-700 hover:bg-blue-900 text-white">Logout</Link>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faHouse} className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
                            </Link>
                        </li>

                        <li>
                            <button type="button" className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-customer" data-collapse-toggle="dropdown-customer">
                                <FontAwesomeIcon icon={faUsers} className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 text-left whitespace-nowrap">Customer</span>
                                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            <ul id="dropdown-customer" className="hidden py-2 space-y-2">
                                <li>
                                    <Link to="#" className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Pending KYC</Link>
                                </li>
                                <li>
                                    <Link to="#" className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Customer Search</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                                <span className="ml-3">Docs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                                <span className="ml-3">Components</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path></svg>
                                <span className="ml-3">Help</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Sidenav Close Btn Mobile */}
                <div className="bg-transparent w-[30%] sm:w-[80%] sm:hidden" data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"></div>
            </aside>
        </>
    )
}
