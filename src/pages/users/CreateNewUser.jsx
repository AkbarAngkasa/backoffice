import { useRef, useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleCheck, faDeleteLeft, faWarning, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";

export default function CreateNewUser() {
    // === Hooks ===
    const cookies = useMemo(() => new Cookies(), []);
    const accessToken = cookies.get('accessToken');
    const navigate = useNavigate();

    // == UI States ==
    const [isAllFilled, setisAllFilled] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    // == Datas ==
    const userEmail = useRef(null);
    const password = useRef(null);
    const fullName = useRef(null);
    const role = useRef(null);

    // =================
    // == Email Input ==
    // =================

    const handleEmailInput = (e) => {
        e.preventDefault();
        const userEmailInput = e.target.value;

        userEmail.current = userEmailInput;
        if (userEmailInput.length === 0) {
            userEmail.current = null;
        }
    }

    // ====================
    // == Password Input ==
    // ====================
    // == UI States ==
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [isLowerCase, setIsLowerCase] = useState(false);
    const [isMinLength, setIsMinLength] = useState(false);

    function hasUppercase(str) {
        return str !== str.toLowerCase();
    }

    function hasLowercase(str) {
        return str !== str.toUpperCase();
    }

    function hasMinLength(str, min) {
        return str.length >= min;
    }

    const handlePasswordInput = (e) => {
        e.preventDefault();
        const passwordInput = e.target.value;

        setIsUpperCase(hasUppercase(passwordInput));
        setIsLowerCase(hasLowercase(passwordInput));
        setIsMinLength(hasMinLength(passwordInput, 10));

        password.current = passwordInput
        if (passwordInput.length === 0) {
            password.current = null;
        }
    }

    // =====================
    // == Full Name Input ==
    // =====================

    const handleFullNameInput = (e) => {
        e.preventDefault();
        const fullNameInput = e.target.value;

        fullName.current = fullNameInput;
        if (fullNameInput.length === 0) {
            fullName.current = null;
        }
    }

    // =====================
    // == User Role Input ==
    // =====================
    const toggleRoleDropdownHandler = (e) => {
        e.preventDefault();

        let statusDropdown = document.getElementById('status-dropdown');

        let dropDownValue = statusDropdown.getAttribute('value');
        if (dropDownValue === "hidden") {
            statusDropdown.setAttribute("value", "");
            statusDropdown.classList.remove("hidden");
        } else {
            statusDropdown.setAttribute("value", "hidden");
            statusDropdown.classList.add("hidden");
        }
    }

    // == UI States ==
    const [userRole, setUserRole] = useState(null);

    const handleUserRoleInput = (e, roleId, roleName) => {
        e.preventDefault();

        setUserRole(roleName);
        role.current = roleId;
    }

    const handleClearRoleInput = (e) => {
        e.preventDefault();
        setUserRole(null);
        role.current = null;
    }

    // =============
    // == Methods ==
    // =============

    const handleIsAllInputFilled = (e) => {
        e.preventDefault();
        setIsAlert(false);

        if((userEmail.current !== null)&&(password.current !== null)&&(fullName.current !== null)&&(role.current !== null)){
            setisAllFilled(true);
        }
        if((userEmail.current === null)||(password.current === null)||(fullName.current === null)||(role.current === null)){
            setisAllFilled(false);
        }
    }

    // =====================
    // == Fetch User Role ==
    // =====================
    const endpointUserListRole = "https://core-webhook.emkop.co.id/api/v1/user/list-role"; 
    const [userListRole, setUserListRole] = useState(false);
    const [fetchingUserListRole, setfetchingUserListRole] = useState(false);

    useEffect(() => {
        setfetchingUserListRole(true);

        fetch(endpointUserListRole, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(res => {
            return res.json();
        }).then(response => {
            if(response.status === 200){
                setUserListRole(response.data);
                setfetchingUserListRole(false);
            }
            if(response.status === 401){
                setfetchingUserListRole(false);
                navigate("/login");
            }
        }).catch(err => {
            console.log(err);
        });
    }, [accessToken, navigate]);

    // ===================
    // == Handle Submit ==
    // ===================
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchResponse, setFetchResponse] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = {
            email: userEmail.current,
            password: password.current,
            full_name: fullName.current,
            role_id: parseInt(role.current)
        }

        const endpoint = "https://core-webhook.emkop.co.id/api/v1/user/create";

        fetch(endpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        }).then(res => {
            return res.json();
        }).then(response => {
            setIsSubmitting(false);

            // Clean Up
            userEmail.current = null;
            password.current = null;
            fullName.current = null;
            role.current = null;
            setUserRole(null);
            setisAllFilled(false);

            setFetchResponse(response);

            if(response.status === 200){
                setIsAlert(true);
            }
            if(response.status === 400){
                setIsAlert(true);
            }
            if(response.status === 401){
                navigate("/login");
            }
        }).catch(err => {
            console.log(err)
        });
    }

    return (
        <div className="flex flex-col justify-center gap-4 select-none">
            {/* Title */}
            <h1 className="font-semibold text-3xl lg:text-4xl pb-2 w-fit">Create New User</h1>
            <hr />
            {/* Create & Tips */}
            <div className="flex flex-col lg:flex-row justify-center gap-4 bg-gray-100 w-full p-8 rounded-lg">
                {/* Create */}
                <div className="grow flex flex-col justify-center gap-4">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Email</label>
                        {!isSubmitting ?
                            <input onChange={(e) => {
                                handleEmailInput(e);
                                handleIsAllInputFilled(e);
                            }} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user@gmail.com" required />
                        :
                            <div className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed disabled animate-pulse" disabled ></div>
                        }
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Password</label>
                        {!isSubmitting ?
                            <input onChange={(e) => {
                                handlePasswordInput(e);
                                handleIsAllInputFilled(e);
                            }} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                        :
                            <div className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed disabled animate-pulse" disabled ></div>
                        }
                    </div>
                    <div>
                        <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Full Name</label>
                        {!isSubmitting ?
                            <input onChange={(e) => {
                                handleFullNameInput(e)
                                handleIsAllInputFilled(e);
                            }} type="text" id="full_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
                        :
                            <div className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed disabled animate-pulse" disabled ></div>
                        }
                    </div>

                    <div className="relative">
                        <label htmlFor="user_role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Choose Role</label>
                        {!fetchingUserListRole && userListRole ?
                            <>
                                <div className="flex flex-row justify-between">
                                    <button onClick={(e) => {
                                        toggleRoleDropdownHandler(e);
                                    }}
                                    className="flex justify-between text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {userRole === null ? "Choose Role" : userRole}  <FontAwesomeIcon icon={faChevronDown} className="mt-1" />
                                    </button>
                                    <button onClick={(e) => {
                                        handleClearRoleInput(e);
                                        handleIsAllInputFilled(e);
                                        }} className="text-white bg-gray-700 border border-l-0 border-gray-400 hover:bg-gray-800 font-medium rounded-r-lg text-sm px-5 py-2.5 focus:ring-primary-500 focus:border-primary-500 focus:border-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <FontAwesomeIcon icon={faDeleteLeft} />
                                    </button>
                                </div>
                                <div id="status-dropdown" className="hidden absolute top-[68px] z-10 w-full rounded-b-lg bg-white border border-gray-300" value="hidden">
                                    <ul>
                                        {userListRole.map((item) => (
                                            <li key={item.id}>
                                                <button onClick={(e) => {
                                                    handleUserRoleInput(e, item.id, item.name);
                                                    handleIsAllInputFilled(e);
                                                }} value={item.name} className="text-sm text-gray-600 hover:bg-gray-100 p-2.5 font-medium w-full text-left">
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                            :
                            <div className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-not-allowed disabled animate-pulse" disabled ></div>
                        }
                    </div>

                    {/* Submit Buttons */}
                    {!isAlert && !isSubmitting && isAllFilled &&
                        <button onClick={(e) => handleSubmit(e)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>
                    }
                    {!isAlert && isSubmitting &&
                        <button className="w-full text-white bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:focus:ring-primary-800 block animate-pulse cursor-wait disabled" disabled>
                            Creating New User..
                        </button>
                    }
                    {!isAlert && !isAllFilled &&
                        <button type="button" className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Fill in the Form to Create</button>
                    }
                    
                    {/* Alerts */}
                    {isAlert && (fetchResponse.status === 200) &&
                        <div className="text-green-800 border border-green-500 bg-green-50 dark:bg-gray-800 dark:text-green-400 font-base rounded-lg text-sm px-5 py-2.5 text-start flex flex-row justify-between" disabled>
                            <div>
                                <FontAwesomeIcon icon={faWarning} />
                                <span className="ml-2 font-medium">{fetchResponse.message}</span>
                            </div>
                            <button onClick={() => setIsAlert(false)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    }
                    {isAlert && (fetchResponse.status === 400) &&
                        <div className="text-red-800 border border-red-500 bg-red-50 dark:bg-gray-800 dark:text-red-400 font-base rounded-lg text-sm px-5 py-2.5 text-start flex flex-row justify-between" disabled>
                            <div>
                                <FontAwesomeIcon icon={faWarning} />
                                <span className="ml-2 font-medium">{fetchResponse.message}</span>
                            </div>
                            <button onClick={() => setIsAlert(false)}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    }
                </div>

                {/* Tips */}
                <div className="grow flex flex-col justify-start gap-2">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Password recomendation:</h2>
                        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                            <li className="flex items-center">
                                {isUpperCase ?
                                    <FontAwesomeIcon icon={faCircleCheck} className="mr-1 text-sm text-green-500" />
                                    :
                                    <FontAwesomeIcon icon={faXmarkCircle} className="mr-1 text-sm text-gray-500" />
                                }
                                <span>At least one uppercase character</span>
                            </li>
                            <li className="flex items-center">
                                {isLowerCase ?
                                    <FontAwesomeIcon icon={faCircleCheck} className="mr-1 text-sm text-green-500" />
                                    :
                                    <FontAwesomeIcon icon={faXmarkCircle} className="mr-1 text-sm text-gray-500" />
                                }
                                <span>At least one lowercase character</span>
                            </li>
                            <li className="flex items-center">
                                {isMinLength ?
                                    <FontAwesomeIcon icon={faCircleCheck} className="mr-1 text-sm text-green-500" />
                                    :
                                    <FontAwesomeIcon icon={faXmarkCircle} className="mr-1 text-sm text-gray-500" />
                                }
                                <span>At least has 10 characters</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}
