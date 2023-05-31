import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import SidenavBlock from "../components/blocks/SidenavBlock";
import NavbarBlock from "../components/blocks/NavbarBlock";
import useGetLastPath from "../costumHooks/useGetLastPath";
import useGetFullPath from "../costumHooks/useGetFullPath";

// Pages
import Transactions from "./transactions";

// Assets
import whyempty from "../assets/images/miscellaneous/emptypage.jpg";
import ChangePassword from "./ChangePassword";

export default function DashboardLayout() {
    // Hooks 
    // useCheckAccessToken();

    useEffect(() => {
        initFlowbite();
    });

    let currentPage = useGetLastPath();
    let currentPath = useGetFullPath();

    return (
        <div className="w-full flex h-screen overflow-y-scroll">
            {/* Sidenav */}
            <div className="w-0 sm:w-[20%] bg-transparent">
                <SidenavBlock />
            </div>
            {/* Content */}
            <div className="w-full sm:w-[80%] sm:z-50 bg-transparent">
                <NavbarBlock navTitle={currentPage} />
                <div className="p-5">
                    {currentPath === "/dashboard" &&
                        <div>
                            <img src={whyempty} width={400} alt={whyempty}/>
                        </div>
                    }
                    {currentPath === "/change-password" &&
                        <div>
                            <ChangePassword />
                        </div>
                    }
                    {currentPath === "/transactions" &&
                        <div>
                            <Transactions />
                        </div>
                    }
                    {currentPath === "/users" &&
                        <div>
                            Users
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}