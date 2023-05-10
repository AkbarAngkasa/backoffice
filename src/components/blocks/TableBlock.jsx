import React, { useState, useEffect, useRef } from 'react';
import { Button as ButtonFlowbite } from 'flowbite-react';
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
// import user_id_card_1 from '../../assets/images/user_id_card/user_id_card_1.jpg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function PrimeTableEOD() {
    PrimeReact.appendTo = 'self';

    const [products, setProducts] = useState([]);
    const dt = useRef(null);

    const ProductService = [
        {
            batch_id: '1294',
            batch_date: '23/05/17',
            batch_time: '23:45',
            finish_time: '--',
            status: 'running',
        },
        {
            batch_id: '1293',
            batch_date: '23/05/16',
            batch_time: '23:45',
            finish_time: '00:18',
            status: 'success',
        },
    ]

    const cols = [
        { field: 'batch_id', header: 'Batch ID' },
        { field: 'batch_date', header: 'Batch Date' },
        { field: 'batch_time', header: 'Batch Time' },
        { field: 'full_name', header: 'Full Name' },
        { field: 'finish_time', header: 'Finish Time' },
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

    const actionButtons = (product) => {
        const openModal = (user_phone_no) => {
            let elhModal = document.getElementById(`modal_${user_phone_no}`);
            elhModal.classList.toggle('hidden');
            return
        }

        const closeModal = (user_phone_no) => {
            let elhModal = document.getElementById(`modal_${user_phone_no}`);
            elhModal.classList.toggle('hidden');
        }

        // Data should be retrieve via fetch when user click the details button
        // Dummy data
        let transactions = [
            {
                tranx_type: 'Balance Top-Up (Indirect)',
                tranx_counts: 1391,
                total_volume: 575905000,
                reconciled: 4,
                unresolved: '-'
            },
            {
                tranx_type: 'Inter-Banks Funds Transfer (IBFT)',
                tranx_counts: 638,
                total_volume: 381842350,
                reconciled: '-',
                unresolved: 2
            },
            {
                tranx_type: 'P2P Funds Transfer',
                tranx_counts: 742,
                total_volume: 421748500,
                reconciled: 1,
                unresolved: '-'
            },
            {
                tranx_type: 'Membership Fee',
                tranx_counts: 1083,
                total_volume: 21660000,
                reconciled: '-',
                unresolved: '-'
            },
        ];

        // Dummy data
        let accounts = [
            {
                account_type: 'Costumer Savings',
                account_counts: 1083,
                total_balance: 742871950
            },
            {
                account_type: 'Partner Pools',
                account_counts: 9,
                total_balance: 1352520
            },
            {
                account_type: 'Internal Pools',
                account_counts: 2,
                total_balance: 952520
            },
        ];

        return (
            <>
                <div className='flex flex-row'>
                    {product.status === 'success' ?
                        <ButtonFlowbite onClick={() => openModal(product.phone_no)} className='mr-2'>
                            Details
                        </ButtonFlowbite>
                        :
                        <ButtonFlowbite onClick={() => openModal(product.phone_no)} className='mr-2' disabled>
                            Details
                        </ButtonFlowbite>
                    }
                    <div className='absolute hidden justify-center place-items-center z-50 top-0 right-0 bottom-0 left-0 p-[5%] bg-[rgba(0,0,0,0.5)] h-screen overflow-x-scroll' id={`modal_${product.phone_no}`}>
                        {/* Container */}
                        <div className='relative flex flex-col bg-white'>
                            {/* Close Button */}
                            <div className='absolute top-3 right-3'>
                                <FontAwesomeIcon icon={faXmark} className='cursor-pointer text-slate-500' onClick={() => closeModal(product.phone_no)}/>
                            </div>
                            {/* Header */}
                            <div className='p-[2%]'>
                                <h3 className='font-bold text-2xl text-slate-700'>EOD Batch</h3>
                            </div>
                            {/* Body */}
                            <div className='flex flex-col justify-start'>
                                
                                {/* Container */}
                                <div className='flex flex-col sm:flex-row justify-between p-[5%] sm:p-[2%] border-t-[1px] bg-gray-100 border-slate-400'>
                                    <div className='flex flex-col w-full mb-4 sm:mr-4 sm:mb-0'>
                                        <div className='flex flex-row justify-between'>
                                            <span className='inline-block mb-2 text-sm font-medium text-slate-600'>Batch Date</span>
                                            <span className='inline-block text-sm font-medium text-slate-800'>23/05/17</span>
                                        </div>
                                        <div className='flex flex-row justify-between'>
                                            <span className='inline-block mb-2 text-sm font-medium text-slate-600'>No.</span>
                                            <span className='inline-block text-sm font-medium text-slate-800'>1294</span>
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-full mb-4 sm:mr-4 sm:mb-0'>
                                        <div className='flex flex-row justify-between'>
                                            <span className='inline-block mb-2 text-sm font-medium text-slate-600'>Batch Time</span>
                                            <span className='inline-block text-sm font-medium text-slate-800'>23:45</span>
                                        </div>
                                        <div className='flex flex-row justify-between'>
                                            <span className='inline-block mb-2 text-sm font-medium text-slate-600'>Finish Time</span>
                                            <span className='inline-block text-sm font-medium text-slate-800'>-</span>
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-full mb-4 sm:mr-4 sm:mb-0'>
                                        <div className='flex flex-row justify-between'>
                                            <span className='inline-block mb-2 text-sm font-medium text-slate-600'>Status</span>
                                            <span className='inline-block text-sm font-medium text-slate-800'>Success</span>
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-full mb-4 sm:mr-4 sm:mb-0'>
                                        <div className='flex flex-row justify-end'>
                                            <ButtonFlowbite size={"xs"}>
                                                Retry
                                            </ButtonFlowbite>
                                            {/* <span className='inline-block mb-2 text-sm font-medium text-slate-600'>Retry</span> */}
                                        </div>
                                    </div>    
                                </div>
                                {/* End Of Container */}
                                <div className='flex flex-col sm:flex-row justify-between p-[1%] border-t-[1px] bg-white border-slate-400'>
                                    <DataTable value={transactions} className='w-full'>
                                        <Column field="tranx_type" header="Tranx Type"></Column>
                                        <Column field="tranx_counts" header="Tranx Counts"></Column>
                                        <Column field="total_volume" header="Total Volume"></Column>
                                        <Column field="reconciled" header="Reconciled"></Column>
                                        <Column field="unresolved" header="Unresolved"></Column>
                                        <Column body={
                                            <ButtonFlowbite>
                                                Download
                                            </ButtonFlowbite>
                                        } header="Report"></Column>
                                    </DataTable>
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between p-[1%] border-t-[1px] bg-white border-slate-400'>
                                    <DataTable value={accounts} className='w-full'>
                                        <Column field="account_type" header="Account Type"></Column>
                                        <Column field="account_counts" header="Account Counts"></Column>
                                        <Column field="total_balance" header="Total Balance"></Column>
                                        <Column body={
                                            <ButtonFlowbite>
                                                Download
                                            </ButtonFlowbite>
                                        } header="Report"></Column>
                                    </DataTable>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const statusField = (product) => {
        console.log(product);

        return (
            <>
                {product.status === 'success' ?
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 capitalize">{product.status}</span>
                    :
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 capitalize">{product.status}</span>
                }
            </>
        )
    }


    return (
        <>
            <div className="card">
                <Tooltip target=".export-buttons>button" position="bottom" />
                <DataTable ref={dt} value={products} header={header} tableStyle={{ minWidth: '50rem' }} paginator rows={10} filters={filters} globalFilterFields={['batch_id', 'batch_date', 'batch_time', 'finish_time', 'status']} emptyMessage="Query not found." className='h-fit'>
                    <Column field="batch_id" header="Batch ID" />
                    <Column field="batch_date" header="Batch Date" />
                    <Column field="batch_time" header="Batch Time" />
                    <Column field="finish_time" header="Finish Time" />
                    <Column body={statusField} header="Status" />
                    <Column body={actionButtons} header="Action"></Column>
                </DataTable>
            </div>
        </>
    );
}