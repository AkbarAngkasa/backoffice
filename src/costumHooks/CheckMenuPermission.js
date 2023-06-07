import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

export default function CheckMenuPermission(currentPage) {
    let navigate = useNavigate();

    // == Check User menu-permission via cache. ==
    let currentPagePermission = JSON.parse(localStorage.getItem(currentPage));

    let whiteList = useMemo(() => ["dashboard", "change password"], []);

    useEffect(() => {
        if (currentPagePermission !== null) {
            if ((currentPagePermission.status === 400) && (!whiteList.includes(currentPage))) {
                console.log("User dont have permission on this page ", currentPage)
                navigate("/dashboard");

            } else {
                // User have access in current page.
                console.log("User have access on this page: ", currentPage)
                console.log(currentPagePermission.data);
            }
        }
    }, [currentPage, currentPagePermission, navigate, whiteList]);

    // == Check User menu-permission via cache. ==
}