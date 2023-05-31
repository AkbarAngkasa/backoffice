// import { initFlowbite } from "flowbite";
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";
import { faCircleCheck, faWarning, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function ChangePassword() {
    // === Hooks ===
    // const cookies = useMemo(() => new Cookies(), []);
    // const navigate = useNavigate();

    // == UI States ==
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [isLowerCase, setIsLowerCase] = useState(false);
    const [isMinLength, setIsMinLength] = useState(false);

    const [isPasswordMatch, setisPasswordMatch] = useState(false);

    const [isAlert, setisAlert] = useState(false);

    const [isSubmitting, setisSubmitting] = useState(false);

    // ========================
    // == Old Password Input ==
    // ========================
    const oldPassword = useRef("");
    
    const handleOldPasswordInput = (e) => {
        e.preventDefault();
        const oldPasswordInput = e.target.value;

        oldPassword.current = oldPasswordInput;
    }

    // ===============================
    // == End Of Old Password Input ==
    // ===============================

    // ============================
    // == New Password Validator ==
    // ============================
    // Methods
    function hasUppercase(str) {
        return str !== str.toLowerCase();
    }

    function hasLowercase(str) {
        return str !== str.toUpperCase();
    }

    function hasMinLength(str, min) {
        return str.length >= min;
    }

    let newPasswordFirst = useRef(null);
    let newPasswordSecond = useRef(null);

    const handleNewPasswordInput = (e) => {
        e.preventDefault();
        const newPassInput = e.target.value;

        setIsUpperCase(hasUppercase(newPassInput));
        setIsLowerCase(hasLowercase(newPassInput));
        setIsMinLength(hasMinLength(newPassInput, 10));

        newPasswordFirst.current = newPassInput
        if (newPassInput.length === 0) {
            newPasswordFirst.current = null;
        }
    }

    const handleNewPasswordInputSecond = (e) => {
        e.preventDefault();
        const newPassInputSecond = e.target.value;
        newPasswordSecond.current = newPassInputSecond;

        if (newPassInputSecond.length === 0) {
            newPasswordSecond.current = null;
        }
    }

    const handleCheckPasswordMatch = (e) => {
        e.preventDefault();
        setisAlert(false);

        if (newPasswordFirst.current === newPasswordSecond.current) {
            setisPasswordMatch(true);
        }
        if (newPasswordFirst.current !== newPasswordSecond.current) {
            setisPasswordMatch(false);
        }
        if ((newPasswordFirst.current === null) && (newPasswordSecond.current === null)) {
            setisPasswordMatch(false);
        }
    }

    // ===================================
    // == End Of New Password Validator ==
    // ===================================

    // ========================
    // == Fetch New Password ==
    // ========================
    const handleSubmit = (e) => {
        e.preventDefault();
        setisSubmitting(true);
        console.log('Handle Submit');

        console.log("Old Password ", oldPassword.current);
        console.log("New Password", newPasswordSecond.current);
    }

    // ===============================
    // == End Of Fetch New Password ==
    // ===============================

    // == Methods ==
    
    return (
        <div className="flex flex-col justify-center gap-4 select-none">
            {/* Title */}
            <h1 className="font-semibold text-3xl lg:text-4xl pb-2 w-fit">Change Account Password</h1>
            <hr />

            {/* Change & Tips */}
            <div className="flex flex-col lg:flex-row justify-center gap-4 bg-gray-100 w-full p-8 rounded-lg">
                {/* Change */}
                <div className="grow flex flex-col justify-center gap-4">
                    <div>
                        <label htmlFor="old_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">your password</label>
                        <input onChange={(e) => {
                            handleOldPasswordInput(e)
                        }} type="password" id="old_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>
                    <div>
                        <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">new password</label>
                        <input onChange={(e) => {
                            handleNewPasswordInput(e)
                            handleCheckPasswordMatch(e)
                        }} type="password" id="new_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>
                    <div>
                        <label htmlFor="confirm_new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">confirm new password</label>
                        <input onChange={(e) => {
                            handleNewPasswordInputSecond(e)
                            handleCheckPasswordMatch(e)
                        }} type="password" id="confirm_new_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>

                    {/* == Button == */}
                    {!isPasswordMatch && !isAlert && !isSubmitting &&
                        <button type="button" className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Change</button>
                    }
                    {isPasswordMatch && !isAlert && !isSubmitting &&
                        <button onClick={(e) => handleSubmit(e)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Change</button>
                    }
                    {isSubmitting &&
                        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 block animate-pulse disabled" disabled>
                            Please Wait..
                        </button>
                    }
                    {/* == End Of Button == */}

                    {/* {isPasswordMatch ?
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Change</button>
                        :
                        <button type="button" className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Change</button>
                    } */}
                    {/* Alerts */}
                    {isAlert &&
                        <div className="text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400 cursor-not-allowed font-base rounded-lg text-sm px-5 py-2.5 text-start flex flex-row justify-between" disabled>
                            <div>
                                <FontAwesomeIcon icon={faWarning}/>
                                <span className="ml-2">This is an alert</span>
                            </div>
                            <button onClick={() => setisAlert(false)}>
                                <FontAwesomeIcon icon={faXmark}/>
                            </button>
                        </div>
                    }
                </div>

                <div className="grow flex flex-col justify-start gap-2">
                    {/* Tips */}
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
