import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from 'universal-cookie';

export default function useFetchListMenu() {
     // === Hooks ===
     const cookies = useMemo(() => new Cookies(), []);
     const navigate = useNavigate();

    // === UI States ===
    const [ fetchingListMenu, setFetchingListMenu ] = useState(false);
    const [ listMenu, setListMenu ] = useState(null);
    const [ user, setUser ] = useState(null);

    // Datas
    const endpoint = "https://core-webhook.emkop.co.id/api/v1/user/list-menu";
    const accessToken = cookies.get('accessToken');

    useEffect(() => {
        setFetchingListMenu(true);
        if(accessToken !== null){
            fetch(endpoint, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                return res.json()
            }).then(response => {

                if(response.status === 200){
                    setFetchingListMenu(false);
                    // User Logged in.
                    setListMenu(response.data.menu);
                    setUser(response.data.user);
                    // Stop loading animation
                } else if (response.status === 401){
                    // User is Not Logged in.
                    setFetchingListMenu(false);
                    navigate("/login");
                }

            }).catch(err => {
                console.log(err)
            })
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { fetchingListMenu, listMenu, user }
}