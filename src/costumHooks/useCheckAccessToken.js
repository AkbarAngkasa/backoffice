import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import useGetFullPath from './useGetFullPath';

export default function useCheckAccessToken() {
    // === Hooks ===
    const navigate = useNavigate();
    const cookies = useMemo(() => new Cookies(), []);
    const currentPath = useGetFullPath();

    const [ userAccessToken, setUserAccessToken ] = useState(null);

    useEffect(() => {
        // #. Check is user have an active accessToken?
        let accessToken =  cookies.get('accessToken');
        if(accessToken === undefined){
            // User Is Not Logged In.
            setUserAccessToken(undefined);
            navigate("/login");
        } else {
            // User Already Logged In, redirect back to its current path.
            setUserAccessToken(accessToken);
            navigate(currentPath);
        }
    }, [userAccessToken, cookies, navigate, currentPath]);

    return { userAccessToken };
}