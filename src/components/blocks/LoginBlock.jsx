import { initFlowbite } from 'flowbite';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/emkop-logo-transparent-landscape.png';
import { useEffect, useMemo, useState } from 'react';
import useDate from '../../costumHooks/useDate';
import useGenerateGreet from '../../costumHooks/useGenerateGreet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';
import useCheckAccessToken from '../../costumHooks/useCheckAccessToken';

export default function LoginBlock() {    
    useEffect(() => {
        initFlowbite();
    })

    // === Hooks ===
    const { userAccessToken } = useCheckAccessToken();
    const navigate = useNavigate();
    const cookies = useMemo(() => new Cookies(), []);
    const greet = useGenerateGreet();
    const currentDate = useDate();
    
    // === UI States ===
    const [ fetching, setFetching ] = useState(false);
    const [ resCode, setResCode ] = useState(false);
    const [ resMessage, setResMessage ] = useState(false);
    const [ alertUuid, setAlertUuid ] = useState(false);
    
    // === Handlers ===
    const handleSubmit = (e) => {
        e.preventDefault();
        // == Set State ==
        setFetching(true);

        // == Datas ==
        let emailInput = document.getElementById('email').value;
        let passwordInput = document.getElementById('password').value;
        let userInput = {
            email: emailInput,
            password: passwordInput
        };

        // == Fetch Login ==
        const endpoint = process.env.REACT_APP_EMKOP_ENDPOINT_LOGIN;
        
        let formData = new FormData();
        formData.append("email", userInput.email);
        formData.append("password", userInput.password);
        
        fetch(endpoint, {
            method: 'POST',
            body: formData
        }).then(res => {
            return res.json()
        }).then(response => {
            console.log(response)
            // == Set State ==
            setFetching(false);
            setResCode(response.responseCode);
            setResMessage(response.responseMessage);
            
            // Success
            if(response.responseCode === 200){
                // Handle Login
                // 1. Save AccessToken in cookies
                cookies.set('accessToken', response.accessToken, { path: '/', maxAge: response.expiresIn });
                // 2. Redirect user to /dashboard
                navigate("/dashboard");
            }

            // Failed
            let uuid = uuidv4();
            if((response.responseCode === 400)||(response.responseCode === 403)){
                setAlertUuid(uuid);
            }
        }).catch(err => {
            console.log(err)
        });
        // == End Of Fetch Login ==
    }

    const closeAlert = (e, alertUuid) => {
        e.preventDefault();
        const elhAlert = document.getElementById(alertUuid);
        elhAlert.classList.add('hidden');
        setAlertUuid(false);
    }

    return (
        <>
            {!userAccessToken &&
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-auto h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            {/* Header */}
                            <div>
                                <div className='flex flex-row justify-around'>
                                    <div>
                                        <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                            <img className="w-44" src={logo} alt={logo} />
                                        </Link>
                                    </div>
                                    <div>
                                        <h1 className="my-2 text-2xl font-bold leading-tight tracking-tight text-blue-800 dark:text-white md:text-3xl">
                                            Login
                                        </h1>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex flex-row justify-between">
                                    <h2 className="my-2 font-semibold text-sm w-[70%]">
                                        {greet}
                                    </h2>
                                    <h2 className="my-2 font-semibold text-sm">
                                        <span className="ml-1">{currentDate}</span>
                                    </h2>
                                </div>
                            </div>

                            {/* === Toast === */}
                            {resCode === 400 && alertUuid &&
                                <div id={alertUuid} className="flex p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    <span className="sr-only">Info</span>
                                    <div className="ml-3 text-sm font-medium capitalize">
                                        {resMessage}
                                    </div>
                                    <button type="button" className="items-center justify-center ml-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" onClick={(e) => closeAlert(e, alertUuid)}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                                </div>
                            }
                            {resCode === 403 && alertUuid &&
                                <div id={alertUuid} className="flex p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    <span className="sr-only">Info</span>
                                    <div className="ml-3 text-sm font-medium capitalize">
                                        {resMessage}
                                    </div>
                                    <button type="button" className="items-center justify-center ml-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" onClick={(e) => closeAlert(e, alertUuid)}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                                </div>
                            }

                            {/* ================== */}
                            {/* === Login Form === */}
                            {/* ================== */}
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>

                                {fetching ? 
                                    <button type="submit" onClick={(e) => handleSubmit(e)} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 block animate-pulse disabled" disabled>
                                        Please wait..
                                    </button>
                                    :
                                    <button type="submit" onClick={(e) => handleSubmit(e)} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 block">Login</button>
                                }

                                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p> */}
                            </div>
                            {/* ========================= */}
                            {/* === End Of Login Form === */}
                            {/* ========================= */}
                        </div>
                    </div>
                </div>
            </section>
            }
        </>
    )
}
