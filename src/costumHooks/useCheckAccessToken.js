import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';

export default function useCheckAccessToken() {
    // === Hooks ===
    const navigate = useNavigate();
    const cookies = useMemo(() => new Cookies(), []);

    const [ userAccessToken, setUserAccessToken ] = useState(null);

    useEffect(() => {
        // #. Check is user have an active accessToken?
        let accessToken =  cookies.get('accessToken');
        if(accessToken === undefined){
            // User Is Not Logged In.
            setUserAccessToken(undefined);
            navigate("/login");
        } else {
            // User Already Logged In.
            navigate("/dashboard");
        }
    }, [userAccessToken, cookies, navigate]);

    return { userAccessToken };
}