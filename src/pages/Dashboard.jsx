import { initFlowbite } from "flowbite";
import { useEffect, useMemo, useState } from "react";
import SidenavBlock from "../components/blocks/SidenavBlock";
import NavbarBlock from "../components/blocks/NavbarBlock";
import TableBlock from "../components/blocks/TableBlock";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

export default function DashboardLayout() {
    useEffect(() => {
        initFlowbite();
    });

    // === Hooks ===
    const navigate = useNavigate();
    const cookies = useMemo(() => new Cookies(), []);

    // === Handlers ===
    const [ userAccessToken, setUserAccessToken ] = useState(null);

    useEffect(() => {
        initFlowbite();
        
        // #. Check is user have an active accessToken?
        let accessToken =  cookies.get('accessToken');
        console.log('dashboard accessToken: ', accessToken);
        if(accessToken === undefined){
            // User Is Not Logged In.
            setUserAccessToken(undefined);
            navigate("/login");
        } else {
            // User Already Logged In.
            setUserAccessToken(accessToken);
            navigate("/dashboard");
        }
    }, [userAccessToken, cookies, navigate]);

    return (
        <div className="w-full flex">
            {/* Sidenav */}
            <div className="w-0 sm:w-[20%] bg-transparent">
                <SidenavBlock />
            </div>
            {/* Content */}
            <div className="w-full sm:w-[80%] sm:z-50 bg-transparent">
                <NavbarBlock />
                <div className="p-5">
                    <TableBlock />
                </div>
            </div>
        </div>
    )
}