import React, { useState, useEffect, useRef } from 'react';
// import { Button as ButtonFlowbite } from 'flowbite-react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
// import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import PrimeReact from 'primereact/api';
// import { FilterMatchMode } from 'primereact/api';
import { initFlowbite } from 'flowbite';

import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import formatRupiah from '../../../methods/formatRupiah';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFileCsv, faFileExcel, faFilePdf, faSearch, /* faSearch */ } from '@fortawesome/free-solid-svg-icons';

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
        { field: 'id', header: '#' },
        { field: 'phone_number', header: 'Emkop User ID' },
        { field: 'phone_number_destination', header: 'Phone Number Destination' },
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

    // =====================
    // == FrontEnd Search ==
    // =====================
    // const [globalFilterValue, setGlobalFilterValue] = useState('');
    // const [filters, setFilters] = useState({
    //     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    //     name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    //     'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    //     representative: { value: null, matchMode: FilterMatchMode.IN },
    //     status: { value: null, matchMode: FilterMatchMode.EQUALS },
    //     verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    // });

    // const onGlobalFilterChange = (e) => {
    //     const value = e.target.value;
    //     let _filters = { ...filters };

    //     _filters['global'].value = value;

    //     setFilters(_filters);
    //     setGlobalFilterValue(value);
    // };
    // ============================
    // == End Of FrontEnd Search ==
    // ============================

    // ===========================
    // == Start Of Fetch Search ==
    // ===========================
    
    // Fetch Sort.
    const [fetchSort, setFetchSort] = useState("transaction_date desc"); // For Fetch Purpose.

    const [selectedSort, setSelectedSort] = useState("Ascending"); // For UI purpose.

    const selectedSortHandler = (e, selected) => {
        e.preventDefault();
        if(selected === "transaction_date asc"){
            setSelectedSort("Ascending");
            setFetchSort("transaction_date asc");
        } else {
            setSelectedSort("Descending");
            setFetchSort("transaction_date desc");
        }
    }

    // Fetch Search.
    const [fetchSearch, setFetchSearch] = useState("");
    
    const searchHandler = (e) => {
        e.preventDefault();
        let tableSearchInput = document.getElementById('table-search').value;
        setFetchSearch(tableSearchInput);
    }

    // Fetch Submit Handler.
    const fetchSubmitHandler = (e) => {
        e.preventDefault();
        // 1. Fetch
        setEndpoint(`${process.env.REACT_APP_EMKOP_ENDPOINT_TRANSACTIONS}?sort=${fetchSort}&search=${fetchSearch}`);
        // 2. Reset State to its default value.
        setFetchSearch("");
        document.getElementById('table-search').value = ""
    }
    // =========================
    // == End Of Fetch Search ==
    // =========================


    // Components
    const header = (
        <div className="flex flex-row justify-between sm:justify-end gap-2 py-2 px-1 w-full overflow-x-scroll h-fit">
            <button type="button" className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-base w-14 h-14 text-center flex justify-center items-center py-4 px-[1.30rem] dark:bg-yellow-600 dark:hover:bg-yellow-600 focus:outline-none dark:focus:ring-yellow-700" onClick={() => exportCSV(false)}>
                <FontAwesomeIcon icon={faFileCsv} />
            </button>
            <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-base w-14 h-14 text-center flex justify-center items-center py-4 px-[1.40rem] dark:bg-green-600 dark:hover:bg-green-600 focus:outline-none dark:focus:ring-green-700" onClick={exportExcel}>
                <FontAwesomeIcon icon={faFileExcel} />
            </button>
            <button type="button" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-base w-14 h-14 text-center flex justify-center items-center py-4 px-[1.30rem] dark:bg-red-600 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-700" onClick={exportPdf}>
                <FontAwesomeIcon icon={faFilePdf} />
            </button>

            {/* ==================== */}
            {/* === Fetch Search === */}
            {/* ==================== */}
            <div className='flex flex-wrap gap-2 w-full justify-end'>
                {/* Search */}
                <div className='relative block'>
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon icon={faSearch} className='text-slate-500' />
                    </div>
                    <input type="text" onInput={(e) => searchHandler(e)} id="table-search" className="block pr-4 pl-10 w-full py-4 px-[1.30rem] text-sm font-medium text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search Emkop User Id, Amount, etc.."/>
                </div>
                {/* Sort */}
                <button id="selected_sort" data-dropdown-toggle="actionsDropdown" className="flex items-center justify-center py-4 px-[1.30rem] text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                    <FontAwesomeIcon icon={faChevronDown} className="-ml-1 mr-1.5 w-5 h-5 text-xs"/>
                    {selectedSort === "Ascending" ? 
                        "Latest"
                        :
                        "Oldest"
                    }
                </button>

                <div id="actionsDropdown" className="z-[1000] hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="selected_sort">
                        <li>
                            <span onClick={(e) => selectedSortHandler(e, 'transaction_date asc')} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Latest</span>
                        </li>
                        <li>
                            <span onClick={(e) => selectedSortHandler(e, 'transaction_date desc')} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Oldest</span>
                        </li>
                    </ul>
                </div>
                {/* Submit */}
                <button type="button" onClick={(e) => fetchSubmitHandler(e)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-4 px-[1.30rem] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Search</button>

            </div>
            {/* =========================== */}
            {/* === End Of Fetch Search === */}
            {/* =========================== */}
        </div>
    );

    const amount = (item) => (
        <span>
            {formatRupiah(item.amount, 'Rp.')}
        </span>
    )

    const transaction_date = (item) => (
        <span>
            {moment(item.transaction_date).format('DD MMMM YYYY')}
        </span>
    )

    return (
        <>
            {fetchingTransactions &&
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
                    <Tooltip target=".export-buttons>button" position="bottom" />
                    {/* == w/ FrontEnd Search == */}
                    {/* <DataTable ref={dt} value={transactionsTable} header={header} tableStyle={{ minWidth: '50rem' }} paginator rows={3} filters={filters} globalFilterFields={['id', 'phone_number', 'phone_number_destination', 'amount', 'diamond', 'transaction_date', 'status', 'type']} emptyMessage="Query Not Found." className='h-screen'> */}
                    <DataTable ref={dt} value={transactionsTable} header={header} tableStyle={{ minWidth: '50rem' }} paginator rows={3} className='h-screen'>
                        <Column field="id" header="#" />
                        <Column field="phone_number" header="Emkop User ID" />
                        <Column field="phone_number_destination" header="Phone Number Destination" />

                        <Column body={amount} header="Amount" />
                        <Column field="amount" header="Amount" className='hidden' />

                        <Column field="diamond" header="Diamond" />

                        <Column body={transaction_date} header="Transaction Date" />
                        <Column field="transaction_date" header="Transaction Date" className='hidden' />

                        <Column field="status" header="Status" />
                        <Column field="type" header="Type" />
                    </DataTable>
                </div>
            }
        </>
    );
}