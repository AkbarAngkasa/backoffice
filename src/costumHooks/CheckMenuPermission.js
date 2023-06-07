import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

// Function ini hanya mengecek apakah User setidaknya Mempunyai Akses atau dengan kata lain apakah user !== 400.
export default function CheckMenuPermission(currentPage) {
    let navigate = useNavigate();

    // == Check User menu-permission via cache. ==
    let currentPagePermission = JSON.parse(localStorage.getItem(currentPage));

    let whiteList = useMemo(() => ["dashboard", "*"], []);

    useEffect(() => {
        if (currentPagePermission !== null) {
            if ((currentPagePermission.status === 400) && (!whiteList.includes(currentPage))) {
                navigate("/dashboard");
            } else {
                // User have access in current page.
            }
        }
    }, [currentPage, currentPagePermission, navigate, whiteList]);    
    // == Check User menu-permission via cache. ==
}
