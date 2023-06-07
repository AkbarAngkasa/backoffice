import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import SidenavBlock from "../components/blocks/SidenavBlock";
import NavbarBlock from "../components/blocks/NavbarBlock";

import useGetLastPath from "../costumHooks/useGetLastPath";
import useGetFullPath from "../costumHooks/useGetFullPath";
import useFetchListMenu from "../costumHooks/useFetchListMenu";
import useFetchMenuPermission from "../costumHooks/useFetchMenuPermission";
import CheckMenuPermission from "../costumHooks/CheckMenuPermission";

// Pages
import Transactions from "./transactions";
import Users from "./users";
import CreateNewUser from "./users/CreateNewUser";

// Assets
import whyempty from "../assets/images/miscellaneous/emptypage.jpg";
import ChangePassword from "./ChangePassword";
// import { useNavigate } from "react-router";

export default function DashboardLayout() {
    // Hooks 
    let currentPage = useGetLastPath();
    let currentPath = useGetFullPath();
    
    // const navigate = useNavigate();

    useFetchMenuPermission(currentPage);

    const { fetchingListMenu, listMenu, user } = useFetchListMenu();
    
    useEffect(() => {
        initFlowbite();
    });

    // // == Check User menu-permission via cache. ==
    // let currentPagePermission = JSON.parse(localStorage.getItem(currentPage));
    
    // useEffect(() => {
    //     if(currentPagePermission !== null){
    //         if((currentPagePermission.status === 400)&&(currentPage !== "dashboard")){
    //             navigate("/dashboard");
    //         } else {
    //             // User have access in current page.
    //             // console.log(currentPagePermission.data);
    //         }
    //     }
    // }, [currentPage, currentPagePermission, navigate]);
    // // == Check User menu-permission via cache. ==

    return (
        <div className="w-full flex h-screen overflow-y-scroll">
            {/* Sidenav */}
            <div className="w-0 sm:w-[20%] bg-transparent">
                <SidenavBlock 
                    fetchingListMenu={fetchingListMenu}
                    listMenu={listMenu}
                    user={user}
                />
            </div>
            {/* Content */}
            <div className="w-full sm:w-[80%] sm:z-50 bg-transparent">
                <NavbarBlock 
                    navTitle={currentPage} 
                    user={user}
                />
                <div className="p-5">
                    {currentPath === "/dashboard" &&
                        <div>
                            {CheckMenuPermission(currentPage)}    
                            <img src={whyempty} width={400} alt={whyempty}/>
                        </div>
                    }
                    {currentPath === "/change-password" &&
                        <div>
                            {CheckMenuPermission("change password")}
                            <ChangePassword />
                        </div>
                    }
                    {currentPath === "/transactions" &&
                        <div>
                            {CheckMenuPermission(currentPage)}
                            <Transactions />
                        </div>
                    }
                    {currentPath === "/users" &&
                        <div>
                            {CheckMenuPermission(currentPage)}
                            <Users />
                        </div>
                    }
                    {currentPath === "/users/create-new-user" &&
                        <div>
                            {CheckMenuPermission("users")}
                            <CreateNewUser />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}