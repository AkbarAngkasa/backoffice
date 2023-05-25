import React, { useState, useEffect, useRef } from 'react';

// PrimeReact
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import PrimeReact from 'primereact/api';

// Flowbite
import { initFlowbite } from 'flowbite';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faFileExcel, faFilePdf, faSearch, faCalendarDays, faXmark, faSort, faDeleteLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons';

// Miscellaneous
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';

// Costum Hooks
import formatRupiah from '../../../methods/formatRupiah';
import moment from 'moment';


export default function TransactionsTable() {
    PrimeReact.appendTo = 'self';

    // == Hooks ==
    const cookies = new Cookies();
    const navigate = useNavigate();

    // == UI States ==
    const [fetchingTransactions, setFetchingTransactions] = useState(false);
    const [transactionsTable, settransactionsTable] = useState(null);

    // == Datas n States ==
    const [endpoint, setEndpoint] = useState(process.env.REACT_APP_EMKOP_ENDPOINT_TRANSACTIONS);
    const accessToken = cookies.get('accessToken');

    useEffect(() => {
        initFlowbite();
    });
    // == Fetch Transactions ==
    useEffect(() => {
        setFetchingTransactions(true);

        if (accessToken !== null) {
            fetch(endpoint, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                return res.json()
            }).then(response => {
                if (response.status === 200) {
                    // Stop loading animation
                    setFetchingTransactions(false);
                    // User Logged in.
                    settransactionsTable(response.data.rows);
                } else if (response.status === 401) {
                    // User is Not Logged in.
                    setFetchingTransactions(false);
                    navigate("/login");
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            navigate("/login");
        }
        // == End Of List Menu Fetch
    }, [accessToken, endpoint, navigate]);
    // == End Of Fetch Transactions ==

    // == File Exports Handlers ==
    const dt = useRef(null);
    const cols = [
        { field: 'id', header: 'Transaction ID' },
        { field: 'phone_number', header: 'Phone Number User' },
        { field: 'phone_number_destination', header: 'BIGO User ID' },
        { field: 'amount', header: 'Amount' },
        { field: 'diamond', header: 'Diamond' },
        { field: 'transaction_date', header: 'Transaction Date' },
        { field: 'status', header: 'status' },
        { field: 'type', header: 'Type' },
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, transactionsTable);
                doc.save('transactionsTable.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(transactionsTable);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'transactionsTable');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };
    // == End Of Files Exports Handlers ==

    // ===========================
    // == Start Of Fetch Search ==
    // ===========================

    const [sortParam, setSortParam] = useState("transaction_date asc");

    const transactionsParamsHandler = () => {
        // e.preventDefault();
        if (transactionsTable !== null) {

            // Search Param Input.
            let searchInput = document.getElementById(`table-search`).value;

            // Date Param Input.
            let fromDateRawInput = document.getElementById('from-date').value;

            let toDateRawInput = document.getElementById('to-date').value;

            setEndpoint(`${process.env.REACT_APP_EMKOP_ENDPOINT_TRANSACTIONS}?search=${searchInput}&transactionDateFrom=${fromDateRawInput}&transactionDateTo=${toDateRawInput}&sort=${sortParam}`);
        }
    }

    const transactionSortParamHandler = () => {
        // Sort Param Input.
        // 1. To trigger the first time user click. (Prevent Re-rendering)
        let sortParamInput = document.getElementById('sort-param');

        let elhTransactionDateHeader = document.getElementById('transaction-date-header');

        if (sortParamInput.value === "transaction_date desc") {
            sortParamInput.setAttribute("value", "transaction_date asc")
            sortParamInput.classList.add("hidden")
            elhTransactionDateHeader.classList.remove("hidden")
            // Remove The Trigger button
        } else if (sortParamInput.value === "transaction_date asc") {
            sortParamInput.setAttribute("value", "transaction_date desc")
            sortParamInput.classList.add("hidden")
            elhTransactionDateHeader.classList.remove("hidden")
            // Remove The Trigger button
        }

        // 2. The rest of the user click.
        elhTransactionDateHeader.addEventListener('click', () => {
            if (sortParamInput.value === "transaction_date desc") {
                sortParamInput.setAttribute("value", "transaction_date asc")
            } else if (sortParamInput.value === "transaction_date asc") {
                sortParamInput.setAttribute("value", "transaction_date desc")
            }
            setSortParam(sortParamInput.value)
            // setEndpoint(`${process.env.REACT_APP_EMKOP_ENDPOINT_TRANSACTIONS}?sort=${sortParamInput.value}`);

            // Search Param Input.
            let searchInput = document.getElementById(`table-search`).value;

            // Date Param Input.
            let fromDateRawInput = document.getElementById('from-date').value;

            let toDateRawInput = document.getElementById('to-date').value;

            setEndpoint(`${process.env.REACT_APP_EMKOP_ENDPOINT_TRANSACTIONS}?search=${searchInput}&transactionDateFrom=${fromDateRawInput}&transactionDateTo=${toDateRawInput}&sort=${sortParamInput.value}`);
        })
    }

    const clearSearchParamHandler = (e) => {
        e.preventDefault();
        // Search Param Input.
        let searchInput = document.getElementById(`table-search`).value = '';

        // Date Param Input.
        let fromDateRawInput = document.getElementById('from-date').value;

        let toDateRawInput = document.getElementById('to-date').value;

        setEndpoint(`${process.env.REACT_APP_EMKOP_ENDPOINT_TRANSACTIONS}?search=${searchInput}&transactionDateFrom=${fromDateRawInput}&transactionDateTo=${toDateRawInput}&sort=${sortParam}`);
    }

    const clearDateParamHandler = (e) => {
        e.preventDefault();
        // Search Param Input.
        let searchInput = document.getElementById(`table-search`).value;

        // Date Param Input.
        let fromDateRawInput = document.getElementById('from-date').value = '';

        let toDateRawInput = document.getElementById('to-date').value = '';

        setEndpoint(`${process.env.REACT_APP_EMKOP_ENDPOINT_TRANSACTIONS}?search=${searchInput}&transactionDateFrom=${fromDateRawInput}&transactionDateTo=${toDateRawInput}&sort=${sortParam}`);
    }

    const toggleStatusDropdownHandler = (e) => {
        e.preventDefault();
        let statusDropdown = document.getElementById('status-dropdown');
        
        let dropDownValue = statusDropdown.getAttribute('value');
        if(dropDownValue === "hidden"){
            statusDropdown.setAttribute("value", "");
            statusDropdown.classList.remove("hidden");
        } else {
            statusDropdown.setAttribute("value", "hidden");
            statusDropdown.classList.add("hidden");
        }
    }
    
    const [statusParam, setStatusParam] = useState("");

    // =========================
    // == End Of Fetch Search ==
    // =========================

    // Components
    const header = (
        <div className="flex flex-wrap sm:flex-col justify-end sm:justify-end gap-2 p-4 rounded-t-lg w-full h-fit bg-gray-50">
            {/* Export Buttons */}
            <div className='flex flex-wrap justify-end gap-2'>
                <button type="button" className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-base w-14 h-14 text-center flex justify-center items-center py-4 px-[1.30rem] dark:bg-yellow-600 dark:hover:bg-yellow-600 focus:outline-none dark:focus:ring-yellow-700" onClick={() => exportCSV(false)}>
                    <FontAwesomeIcon icon={faFileCsv} />
                </button>
                <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-base w-14 h-14 text-center flex justify-center items-center py-4 px-[1.40rem] dark:bg-green-600 dark:hover:bg-green-600 focus:outline-none dark:focus:ring-green-700" onClick={exportExcel}>
                    <FontAwesomeIcon icon={faFileExcel} />
                </button>
                <button type="button" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-base w-14 h-14 text-center flex justify-center items-center py-4 px-[1.30rem] dark:bg-red-600 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-700" onClick={exportPdf}>
                    <FontAwesomeIcon icon={faFilePdf} />
                </button>
            </div>

            <div className='flex flex-wrap gap-2 justify-end' id='dateRangePickerId'>
                {/* Search */}
                <div className='relative block grow'>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon icon={faSearch} className='text-slate-500' />
                    </div>
                    <input onChange={() => transactionsParamsHandler('search-param')} type="text" id="table-search" className="w-full inline-block pr-4 pl-10 py-2.5 px-[1.30rem] text-sm font-medium text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search by Transaction Id, BIGO User ID" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <FontAwesomeIcon icon={faXmark} className='text-slate-500 cursor-pointer z-50' onClick={(e) => clearSearchParamHandler(e)} />
                    </div>
                </div>
                {/* Date */}
                <div className="flex flex-wrap justify-end gap-2 items-center sm:border sm:border-gray-300 sm:rounded-lg">
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FontAwesomeIcon icon={faCalendarDays} className='bg-gray-50 text-gray-500' />
                        </div>
                        <input onChange={() => transactionsParamsHandler('fromDate-param')} name="start" type="date" id="from-date" className="font-medium sm:border-none border border-slate-300 bg-gray-50 border-transparent text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <span className="mx-1 text-gray-500 font-medium">to</span>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FontAwesomeIcon icon={faCalendarDays} className='bg-gray-50 text-gray-500' />
                        </div>
                        <input onChange={() => transactionsParamsHandler('toDate-param')} name="end" type="date" id="to-date" className="font-medium sm:border-none border border-slate-300 bg-gray-50 border-transparent text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <button className='sm:mr-3'>
                        <FontAwesomeIcon icon={faDeleteLeft} className='text-slate-500 cursor-pointer z-50' onClick={(e) => clearDateParamHandler(e)} />
                    </button>
                </div>
                {/* Status */}
                <div className="relative flex flex-wrap justify-end gap-2 items-center">
                    <button id="status-dropdown-btn" onClick={(e) => toggleStatusDropdownHandler(e)} type="button" className="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-t-lg rounded-b-md text-sm px-5 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">{statusParam === "" ? "Choose Status" : statusParam}<FontAwesomeIcon icon={faChevronDown} className='ml-2'/></button>
                    <div id="status-dropdown" className='hidden absolute top-10 z-10 w-full rounded-b-lg bg-white border border-gray-300' value="hidden">
                        <ul>
                            <li>
                                <button onClick={() => {setStatusParam("SUCCESS")}} className='text-sm text-gray-600 hover:bg-gray-100 p-2.5 font-medium w-full text-left'>
                                    SUCCESS
                                </button>
                            </li>
                            <hr />
                            <li>
                                <button onClick={() => {setStatusParam("FAILED")}} className='text-sm text-gray-600 hover:bg-gray-100 p-2.5 font-medium w-full text-left'>
                                    FAILED
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );

    const amount = (item) => (
        <span>
            {formatRupiah(item.amount, 'Rp.')}
        </span>
    )

    const transactionDateHeader = () => {
        return (
            <span>
                Transaction Date
                {/* Trigger Button */}
                {/* Prevent re-rendering */}
                <button id="sort-param" value={"transaction_date asc"} onClick={() => transactionSortParamHandler()} className='p-1 ml-1' >
                    <FontAwesomeIcon icon={faSort} />
                </button>
                <button id="transaction-date-header" className='p-1 ml-1 hidden'>
                    <FontAwesomeIcon icon={faSort} />
                </button>
            </span>
        )
    }

    const transactionDateBody = (rowData) => {
        return moment(rowData.transaction_date).format('DD MMMM YYYY')
    };

    const rowArr = () => {
        return [1, 2, 3, 4, 5]
    }

    return (
        <>
            {header}
            <div className="card relative w-full">
                <DataTable ref={dt} value={transactionsTable} size='small' tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={rowArr()} className='h-screen'>
                    <Column field="id" header="Transaction ID" />
                    <Column field="phone_number" header="Phone Number User" />
                    <Column field="phone_number_destination" header="BIGO User ID" />

                    <Column body={amount} header="Amount" />

                    <Column field="diamond" header="Diamond" />

                    <Column body={transactionDateBody} field="transaction_date" header={transactionDateHeader} filterField="date" dataType="date" style={{ minWidth: '12rem' }} />

                    <Column field="status" header="Status" />
                    <Column field="type" header="Type" />
                </DataTable>
                {fetchingTransactions &&
                    <div role="status" className="absolute z-50 top-[52px] left-0 right-0 bottom-0 bg-white w-full">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 animate-pulse"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5 animate-pulse"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 animate-pulse"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5 animate-pulse"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5 animate-pulse"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] animate-pulse"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                }
            </div>
            {/* {fetchingTransactions &&
                <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {!fetchingTransactions && transactionsTable &&
                <div className="card">
                    <DataTable ref={dt} value={transactionsTable} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={rowArr()} className='h-screen'>
                        <Column field="id"/>
                        <Column field="phone_number" header="Phone Number User" />
                        <Column field="phone_number_destination" header="BIGO User ID" />

                        <Column body={amount} header="Amount"/>

                        <Column field="diamond" header="Diamond" />

                        <Column field="transaction_date" header={() => transactionDateHeader()} sortable filterField="date" dataType="date" style={{ minWidth: '12rem' }} body={date} />

                        <Column field="status" header="Status" />
                        <Column field="type" header="Type" />
                    </DataTable>
                </div>
            } */}
        </>
    );
}