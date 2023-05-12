import React, { useState, useEffect, useRef } from 'react';
import { Button as ButtonFlowbite } from 'flowbite-react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import PrimeReact from 'primereact/api';
import { FilterMatchMode } from 'primereact/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCsv, faFileExcel, faFilePdf, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function FeeManagement() {
    PrimeReact.appendTo = 'self';

    const [products, setProducts] = useState([]);
    const dt = useRef(null);

    const ProductService = [
        {
            fee_name: 'Bank Transfer Fee',
            transaction_type: 'IBFT',
            bank_issuer_sourceOfFund: 'All',
            channel_name: 'PG Doku',
            emkop_fee: 3000,
            partner_fee: 4000,
            charging_type: 'Per Transaction',
            charge_to_cust: 'No',
            status: 'Inactive',
        },
        {
            fee_name: 'Fee Top Up mandiri',
            transaction_type: 'TOP UP VA',
            bank_issuer_sourceOfFund: 'Mandiri',
            channel_name: 'PG Doku',
            emkop_fee: 3000,
            partner_fee: 4000,
            charging_type: 'Per Transaction',
            charge_to_cust: 'No',
            status: 'Active',
        },
        {
            fee_name: 'Fee Top Up CIMB',
            transaction_type: 'TOP UP VA',
            bank_issuer_sourceOfFund: 'CIMB',
            channel_name: 'PG Doku',
            emkop_fee: 3000,
            partner_fee: 4000,
            charging_type: 'Per Transaction',
            charge_to_cust: 'No',
            status: 'Active',
        },
        {
            fee_name: 'Biaya Bulanan',
            transaction_type: 'Account Admin',
            bank_issuer_sourceOfFund: 'All',
            channel_name: 'Internal',
            emkop_fee: 20000,
            partner_fee: 0,
            charging_type: 'Per Month',
            charge_to_cust: 'Yes',
            status: 'Active',
        },
    ]

    const cols = [
        { field: 'fee_name', header: 'Fee Name' },
        { field: 'transaction_type', header: 'Transanction Type' },
        { field: 'bank_issuer_sourceOfFund', header: 'Bank/Issuer/Source Of Fund' },
        { field: 'channel_name', header: 'Channel Name' },
        { field: 'emkop_fee', header: 'Emkop Fee' },
        { field: 'partner_fee', header: 'Partner Fee' },
        { field: 'charging_type', header: 'Charging Type' },
        { field: 'charging_to_cust', header: 'Charging To Cust' },
        { field: 'status', header: 'Status' },
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    useEffect(() => {
        // ProductService.getProductsMini().then((data) => setProducts(data));
        setProducts(ProductService)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className="flex flex-row justify-between gap-2 py-2 px-1 w-full overflow-auto h-fit">            
            <Link to={"/dashboard/configuration/fee-management/add"} type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base py-4 px-[1.30rem] block dark:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700">
                <FontAwesomeIcon icon={faPlus} />
            </Link>
            <button type="button" className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-base py-4 px-[1.30rem] block dark:bg-yellow-600 dark:hover:bg-yellow-600 focus:outline-none dark:focus:ring-yellow-700" onClick={() => exportCSV(false)}>
                <FontAwesomeIcon icon={faFileCsv} />
            </button>
            <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-base py-4 px-[1.40rem] block dark:bg-green-600 dark:hover:bg-green-600 focus:outline-none dark:focus:ring-green-700" onClick={exportExcel}>
                <FontAwesomeIcon icon={faFileExcel} />
            </button>
            <button type="button" className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-base py-4 px-[1.30rem] block dark:bg-red-600 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-700" onClick={exportPdf}>
                <FontAwesomeIcon icon={faFilePdf} />
            </button>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FontAwesomeIcon icon={faSearch} className='text-slate-500'/>
                </div>
                <input type="search" id="default-search" class="block py-4 pl-10 pr-4 w-40 sm:w-full text-sm font-medium border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search.." value={globalFilterValue} onChange={onGlobalFilterChange} required/>                
            </div>
        </div>
    );

    const actionButtons = () => {
        return (
            <>
                <div className='flex flex-row'>
                    <ButtonFlowbite className='mr-2'>
                        Edit
                    </ButtonFlowbite>
                    <ButtonFlowbite className='bg-red-700'>
                        Delete
                    </ButtonFlowbite>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="card">
                <DataTable ref={dt} value={products} header={header} tableStyle={{ minWidth: '50rem' }} paginator rows={3} filters={filters} globalFilterFields={['fee_name', 'transaction_type', 'bank_issuer_sourceOfFund', 'channel_name', 'emkop_fee', 'partner_fee', 'charging_type', 'charge_to_cust', 'status']} emptyMessage="Query not found." className='h-fit overflow-auto'>
                    <Column field="fee_name" header="Fee Name" />
                    <Column field="transaction_type" header="Transaction Type" />
                    <Column field="bank_issuer_sourceOfFund" header="Bank/Issuer/Source Of Fund" />
                    <Column field="channel_name" header="Channel Name" />
                    <Column field="emkop_fee" header="Emkop Fee" />
                    <Column field="partner_fee" header="Partner Fee" />
                    <Column field="charging_type" header="Charging Type" />
                    <Column field="charge_to_cust" header="Charge To Cust" />
                    <Column field="status" header="Status" />
                    <Column body={actionButtons} header="Action"></Column>
                </DataTable>
            </div>
        </>
    );
}