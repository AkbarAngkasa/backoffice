import React, { useState, useEffect, useRef } from 'react';
// import { Button as ButtonFlowbite } from 'flowbite-react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import PrimeReact from 'primereact/api';
import { FilterMatchMode } from 'primereact/api';
import { initFlowbite } from 'flowbite';

import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
// import { useNavigate } from 'react-router';

export default function TransactionsTable() {
    PrimeReact.appendTo = 'self';

    // == Hooks ==
    const cookies = new Cookies();
    const navigate = useNavigate();

    // == UI States ==
    const [ fetchingTransactions, setFetchingTransactions ] = useState(false);
    const [ transactionsArr, setTransactionsArr ] = useState(null);

    // == Datas ==
    const endpoint = process.env.REACT_APP_EMKOP_ENDPOINT_TRANSACTIONS;
    const accessToken = cookies.get('accessToken');

    useEffect(() => {
        initFlowbite();
    });

    // == Fetch Transactions ==
    useEffect(() => {
        setFetchingTransactions(true);
        if(accessToken !== null){
            fetch(endpoint, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                return res.json()
            }).then(response => {
                console.log(response)
                if(response.status === 200){
                    // Stop loading animation
                    setFetchingTransactions(false);
                    // User Logged in.
                    setTransactionsArr(response.data.rows);
                } else if (response.status === 401){
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

    // Dummy Data
    const [products, setProducts] = useState([]);
    const dt = useRef(null);

    const ProductService = [
        {
            number: '1',
            emkop_transaction_id: 'TRXBRGxxx',
            emkop_user_id: '<Nomor HP Emkop>',
            customer_id: '<BIGO ID>',
            nominal: 25000,
            transaction_time: '09/05/2023',
            product_value_1: 84,
            product_value_2: 'Reserved For Future',
            billing_id: 'Reserved For Future',
            reference_id: 'Reserved For Future',
            status: '<Default: Success, Complete>',
        },
        {
            number: '1',
            emkop_transaction_id: 'TRXBRGxxx',
            emkop_user_id: '<Nomor HP Emkop>',
            customer_id: '<BIGO ID>',
            nominal: 25000,
            transaction_time: '09/05/2023',
            product_value_1: 84,
            product_value_2: 'Reserved For Future',
            billing_id: 'Reserved For Future',
            reference_id: 'Reserved For Future',
            status: '<Default: Success, Complete>',
        },
    ]
    
    useEffect(() => {
        // ProductService.getProductsMini().then((data) => setProducts(data));
        setProducts(ProductService)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // End Of Dummy Data
    
    // == File Exports Handlers ==
    const cols = [
        { field: 'number', header: '#' },
        { field: 'emkop_transaction_id', header: 'Emkop Transaction ID' },
        { field: 'emkop_user_id', header: 'Emkop User ID' },
        { field: 'customer_id', header: 'Customer ID' },
        { field: 'nominal', header: 'Nominal' },
        { field: 'transaction_time', header: 'Transaction Time' },
        { field: 'product_value_1', header: 'Product Value 1' },
        { field: 'product_value_2', header: 'Product Value 2' },
        { field: 'billing_id', header: 'Billing ID' },
        { field: 'reference_id', header: 'Reference ID' },
        { field: 'status', header: 'Status' },
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));
        
    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, products);
                doc.save('products.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(products);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'products');
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

    // Search
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    // Components
    const header = (
        <div className="flex justify-end gap-2">
            <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" className='bg-blue-400 hover:bg-red-800' />
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" className='w-32' />
            </span>
        </div>
    );

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
            {!fetchingTransactions && transactionsArr &&
                // <div className="card">
                //     <Tooltip target=".export-buttons>button" position="bottom" />
                //     <DataTable ref={dt} value={products} header={header} tableStyle={{ minWidth: '50rem' }} paginator rows={10} filters={filters} globalFilterFields={['register_time', 'account_no', 'phone_no', 'full_name', 'nik', 'user_status', 'user_kyc', 'action']} emptyMessage="Query not found." className='h-screen'>
                //         <Column field="number" header="#" />
                //         <Column field="emkop_transaction_id" header="Emkop Transaction ID" />
                //         <Column field="emkop_user_id" header="Emkop User ID" />
                //         <Column field="customer_id" header="Customer ID" />
                //         <Column field="nominal" header="Nominal" />
                //         <Column field="transaction_time" header="Transaction Time" />
                //         <Column field="product_value_1" header="Product Value 1" />
                //         <Column field="product_value_2" header="Product Value 2" />
                //         <Column field="billing_id" header="Billing ID" />
                //         <Column field="reference_id" header="Reference ID" />
                //         <Column field="status" header="Status" />
                //     </DataTable>
                // </div>
                <div className="card">
                    <Tooltip target=".export-buttons>button" position="bottom" />
                    <DataTable ref={dt} value={transactionsArr} header={header} tableStyle={{ minWidth: '50rem' }} paginator rows={3} filters={filters} globalFilterFields={['id', 'phone_number', 'phone_number_destination', 'amount', 'diamond', 'transaction_date', 'status', 'type']} emptyMessage="Query Not Found." className='h-screen'>
                        <Column field="id" header="#" />
                        <Column field="phone_number" header="Emkop User ID" />
                        <Column field="phone_number_destination" header="Phone Number Destination" />
                        <Column field="amount" header="Amount" />
                        <Column field="diamond" header="Diamond" />
                        <Column field="transaction_date" header="Transaction Date" />
                        <Column field="status" header="Status" />
                        <Column field="type" header="Type" />
                    </DataTable>
                </div>
            }
        </>
    );
}