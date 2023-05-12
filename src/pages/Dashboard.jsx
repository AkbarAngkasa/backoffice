import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import SidenavBlock from "../components/blocks/SidenavBlock";
import NavbarBlock from "../components/blocks/NavbarBlock";
import useGetLastPath from "../costumHooks/useGetLastPath";
import useGetFullPath from "../costumHooks/useGetFullPath";

// Pages
import FeeManagement from "./FeeManagement/FeeManagement";
import FeeManagementAdd from "./FeeManagement/FeeManagementAdd";

export default function DashboardLayout() {
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
                {currentPath === "/dashboard/configuration/fee-management/add" ?
                    <NavbarBlock navTitle={'Fee Management Add'} />
                    :
                    <NavbarBlock navTitle={currentPage} />
                }
                <div className="p-5">
                    {currentPath === "/dashboard/configuration/fee-management" &&
                        <div>
                            <FeeManagement />
                        </div>
                    }
                    {currentPath === "/dashboard/configuration/fee-management/add" &&
                        <div>
                            <FeeManagementAdd />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}