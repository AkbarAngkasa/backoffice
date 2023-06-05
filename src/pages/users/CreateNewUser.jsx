import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faWarning, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

export default function CreateNewUser() {

    // == UI States ==
    const [isUpperCase, setIsUpperCase] = useState(false);
    const [isLowerCase, setIsLowerCase] = useState(false);
    const [isMinLength, setIsMinLength] = useState(false);

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
                        <input type="password" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user@gmail.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Password</label>
                        <input onChange={(e) => {
                            handleNewPasswordInput(e);
                        }} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>
                    <div>
                        <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Full Name</label>
                        <input type="text" id="full_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
                    </div>
                    <div>
                        <label htmlFor="choose_role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose Role</label>
                        <select id="choose_role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>SUPER_ADMIN</option>
                            <option>ADMIN</option>
                            <option>USER</option>
                            <option>BIGO_ADMIN</option>
                        </select>
                    </div>

                    <button type="button" className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Fill in the Form to Create</button>

                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create</button>

                    <div className="text-green-800 border border-green-500 bg-green-50 dark:bg-gray-800 dark:text-green-400 font-base rounded-lg text-sm px-5 py-2.5 text-start flex flex-row justify-between" disabled>
                        <div>
                            <FontAwesomeIcon icon={faWarning} />
                            <span className="ml-2 font-medium">Message</span>
                        </div>
                        <button>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>

                    <div className="text-red-800 border border-red-500 bg-red-50 dark:bg-gray-800 dark:text-red-400 font-base rounded-lg text-sm px-5 py-2.5 text-start flex flex-row justify-between" disabled>
                        <div>
                            <FontAwesomeIcon icon={faWarning} />
                            <span className="ml-2 font-medium">Message</span>
                        </div>
                        <button>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
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
