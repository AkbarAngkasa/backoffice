// import { initFlowbite } from "flowbite";
// import { useEffect } from "react";
// import SidenavBlock from "../components/blocks/SidenavBlock";
// import NavbarBlock from "../components/blocks/NavbarBlock";
// import TableBlock from "../components/blocks/TableBlock";
// import useCheckAccessToken from "../costumHooks/useCheckAccessToken";

// export default function DashboardLayout() {
//     useEffect(() => {
//         initFlowbite();
//     });

//     // === Hooks ===
//     useCheckAccessToken();

//     return (
//         <div className="w-full flex">
//             {/* Sidenav */}
//             <div className="w-0 sm:w-[20%] bg-transparent">
//                 <SidenavBlock />
//             </div>
//             {/* Content */}
//             <div className="w-full sm:w-[80%] sm:z-50 bg-transparent">
//                 <NavbarBlock />
//                 <div className="p-5">
//                     <TableBlock />
//                 </div>
//             </div>
//         </div>
//     )
// }

import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import SidenavBlock from "../components/blocks/SidenavBlock";
import NavbarBlock from "../components/blocks/NavbarBlock";
import useGetLastPath from "../costumHooks/useGetLastPath";
import useGetFullPath from "../costumHooks/useGetFullPath";

// Pages
// import TableBlock from "../components/blocks/TableBlock";
import Table from "./menu/Table";

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
                    {currentPath === "/dashboard" &&
                        <div>
                            Dashboard
                        </div>
                    }
                    {currentPath === "/dashboard/menu" &&
                        <div>
                            <Table />
                        </div>
                    }
                    {/* {currentPath === "/dashboard/menu/list" &&
                        <div>
                            <Table />
                        </div>
                    } */}
                </div>
            </div>
        </div>
    )
}