import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import SidenavBlock from "../components/blocks/SidenavBlock";
import NavbarBlock from "../components/blocks/NavbarBlock";
import TableBlock from "../components/blocks/TableBlock";
import useGetLastPath from "../costumHooks/useGetLastPath";
import useGetFullPath from "../costumHooks/useGetFullPath";

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
                <NavbarBlock navTitle={currentPage} />
                <div className="p-5">
                    {currentPath === "/dashboard/customer/pending-kyc" &&
                        <div>
                            <TableBlock />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}