import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from 'universal-cookie';

export default function FetchMenuPermission(currentPage) {
    // === Hooks ===
    const cookies = useMemo(() => new Cookies(), []);
    const navigate = useNavigate();

    // === UI States ===
    const [fetchingMenuPermission, setFetchingMenuPermission] = useState(false);
    const [menuPermission, setMenuPermission] = useState(null);

    // == Datas ==
    const endpoint = `https://core-webhook.emkop.co.id/api/v1/user/menu-permission?menu_name=${currentPage}`;
    const accessToken = cookies.get('accessToken');

    useEffect(() => {
        setFetchingMenuPermission(true);
        
        if (accessToken !== null) {
            // 1. Check Is currentPage already stored in cache?
            if(localStorage.getItem(currentPage)){
                // console.log("Cache key: ", currentPage ," already exist");
            } else if(currentPage === "*") {
                // console.log("This page is allowed for all user role");
            } else {
                // Value is not exist in cache.
                // 1. Fetch.
                // 2. Store data (menu-permission) in cache.
                fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }).then(res => {
                    return res.json()
                }).then(response => {
                    setFetchingMenuPermission(false);
                    if(response.status !== 401){
                        setMenuPermission(response);
                        // console.log("Storing cache.. key: ", currentPage);
                        localStorage.setItem(currentPage, JSON.stringify(response));
                    }
                    if (response.status === 401) {
                        // User is Not Logged in.
                        navigate("/login");
                    }
                    // console.log(menuPermission)
                }).catch(err => {
                    console.log(err)
                })
            }
        } else {
            navigate("/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint]);

    return { fetchingMenuPermission, menuPermission }
}