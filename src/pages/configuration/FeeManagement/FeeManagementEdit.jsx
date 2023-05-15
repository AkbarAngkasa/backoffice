import { Link } from "react-router-dom"

export default function FeeManagementEdit() {
    return (
        <div>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li>
                        <div className="flex items-center">
                            <Link to={"/dashboard/configuration/fee-management"} className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">Fee Management</Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            <span className="ml-1 text-sm font-medium md:ml-2 text-gray-500 dark:text-gray-400">Edit</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="mt-4">
                <h2 className="mb-4 text-3xl font-medium text-gray-700 dark:text-white">Edit Fee Management</h2>
                <form>
                    <div className="mb-6">
                        <label for="fee_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fee name</label>
                        <input type="fee_name" id="fee_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <div className="mb-6">
                        <label for="transaction_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transaction Type</label>
                        <select id="transaction_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Account Admin</option>
                            <option>Balance Inquiry</option>
                            <option>IBFT</option>
                            <option>PPOB</option>
                            <option>TOP UP VA</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label for="bank_issuer_sourceOfFund" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bank/Issuer/Source of fund</label>
                        <select id="bank_issuer_sourceOfFund" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>All</option>
                            <option>BCA</option>
                            <option>BNI</option>
                            <option>BRI</option>
                            <option>BSI</option>
                            <option>CIMB</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label for="bank_issuer_sourceOfFund" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Channel Name</label>
                        <select id="bank_issuer_sourceOfFund" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Direct</option>
                            <option>Internal</option>
                            <option>PG DOKU</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label for="emkop_fee" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Emkop Fee</label>
                        <input type="emkop_fee" id="emkop_fee" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-6">
                        <label for="partner_fee" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Partner Fee</label>
                        <input type="partner_fee" id="partner_fee" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <div className="mb-6">
                        <label for="charging_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Charging Type</label>
                        <select id="charging_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Per Bulan</option>
                            <option>Per Hari</option>
                            <option>Per Transaksi</option>
                        </select>
                    </div>


                    <fieldset className="mb-6">
                        <label for="charging_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Charge to Customer</label>

                        <div className="flex items-center mb-4">
                            <input id="charging_type_1" type="radio" name="charge_to_customer" value="true" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked />
                            <label for="charging_type_1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Yes
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="charging_type_2" type="radio" name="charge_to_customer" value="false" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="charging_type_2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                No
                            </label>
                        </div>
                    </fieldset>
                    
                    <fieldset className="mb-6">
                        <label for="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>

                        <div className="flex items-center mb-4">
                            <input id="status_1" type="radio" name="status" value="true" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked />
                            <label for="status_1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Active
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input id="status_2" type="radio" name="status" value="false" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="status_2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Non-Active
                            </label>
                        </div>
                    </fieldset>


                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Data</button>
                </form>
            </div>
        </div>
    )
}
