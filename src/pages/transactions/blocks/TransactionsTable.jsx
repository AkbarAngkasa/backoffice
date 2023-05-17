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
// import { useNavigate } from 'react-router';

export default function TransactionsTable() {
    PrimeReact.appendTo = 'self';

    // == Hooks ==
    const cookies = new Cookies();
    // const navigate = useNavigate();

    // == UI States ==

    // == Datas ==
    const endpoint = process.env.REACT_APP_EMKOP_ENDPOINT_TRANSACTIONS;
    const accessToken = cookies.get('accessToken');

    useEffect(() => {
        initFlowbite();
    });

    // == Fetch Transactions ==
    useEffect(() => {
        console.log(accessToken);
        console.log(endpoint);
        fetch(endpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            return res.json()
        }).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    });

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

    // const actionButtons = (product) => {
        
    //     const openModal = (user_phone_no) => {
    //         let elhModal = document.getElementById(`modal_${user_phone_no}`);
    //         elhModal.classList.toggle('hidden');
    //         return
    //     }

    //     const closeModal = (user_phone_no) => {
    //         let elhModal = document.getElementById(`modal_${user_phone_no}`);
    //         elhModal.classList.toggle('hidden');
    //     }

    //     return (
    //         <>
    //             <div className='flex flex-row'>
    //                 <ButtonFlowbite onClick={() => openModal(product.phone_no)} className='mr-2'>
    //                     Review
    //                 </ButtonFlowbite>
    //                 <ButtonFlowbite onClick={() => openModal(product.phone_no)} className='bg-red-700'>
    //                     Block
    //                 </ButtonFlowbite>
    //                 <div className='absolute hidden justify-center place-items-center z-50 top-0 right-0 bottom-0 left-0 p-[5%] bg-[rgba(0,0,0,0.5)]' id={`modal_${product.phone_no}`}>
    //                     <div className='relative flex flex-col sm:flex-row justify-around w-full h-full overflow-auto sm:h-fit bg-white opacity-100'>
    //                         <div className='absolute top-3 right-3'>
    //                             <FontAwesomeIcon icon={faXmark} className='cursor-pointer' onClick={() => closeModal(product.phone_no)}/>
    //                         </div>
    //                         <div className='w-full flex justify-center place-items-center sm:w-[50%] bg-slate-900'>
    //                             <img src={user_id_card_1} alt={user_id_card_1} className='w-full h-fit' />
    //                         </div>
    //                         <div className='flex flex-col w-full sm:w-[50%]'>
    //                             <div className='flex flex-row p-[5%] bg-slate-50'>
    //                                 <ul className='w-[75%]'>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>Acc No.</span>
    //                                         <span className='text-sm'>EA-1-2345-6789-9</span>
    //                                     </li>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>Username</span>
    //                                         <span className='text-sm'>8123456789012</span>
    //                                     </li>
    //                                 </ul>
    //                                 <div className='w-[25%] pl-2 flex justify-end place-items-end'>
    //                                     <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Active</span>
    //                                 </div>
    //                             </div>
    //                             <div className='p-[5%]'>
    //                                 <form className='w-full'>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>Full Name</span>
    //                                         <input type="text" className='text-sm p-1 border-none text-end placeholder:text-end placeholder:text-slate-900 placeholder:text-sm' placeholder={product.full_name} />
    //                                     </li>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>Username</span>
    //                                         <input type="text" className='text-sm p-1 border-none text-end placeholder:text-end placeholder:text-slate-900 placeholder:text-sm' placeholder='350810425938207' />
    //                                     </li>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>Birthdate</span>
    //                                         <input type="date" className='text-sm p-1 border-none text-end placeholder:text-end placeholder:text-slate-900 placeholder:text-sm' />
    //                                     </li>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>Gender</span>
    //                                         <select className="text-sm p-1 border-none text-end placeholder:text-end placeholder:text-slate-900 placeholder:text-sm' placeholder='350810425938207">
    //                                             <option>Male</option>
    //                                             <option>Female</option>
    //                                         </select>
    //                                     </li>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>Adress</span>
    //                                         <input type="text" className='text-sm p-1 border-none text-end placeholder:text-end placeholder:text-slate-900 placeholder:text-sm' placeholder='Pulinombo No. A11' />
    //                                     </li>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>Village</span>
    //                                         <input type="text" className='text-sm p-1 border-none text-end placeholder:text-end placeholder:text-slate-900 placeholder:text-sm' placeholder='Citrodiwangsan' />
    //                                     </li>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>Subdistrict</span>
    //                                         <input type="text" className='text-sm p-1 border-none text-end placeholder:text-end placeholder:text-slate-900 placeholder:text-sm' placeholder='Lumajang' />
    //                                     </li>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>City</span>
    //                                         <input type="text" className='text-sm p-1 border-none text-end placeholder:text-end placeholder:text-slate-900 placeholder:text-sm' placeholder='Lumajang' />
    //                                     </li>
    //                                     <div className='flex justify-end'>
    //                                         <button type="button" className="px-3 py-2 mt-1 mr-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
    //                                         <button type="button" className="px-3 py-2 mt-1 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
    //                                     </div>
    //                                 </form>
    //                             </div>
    //                             <div className='flex flex-row p-[5%] bg-slate-50'>
    //                                 <ul className='w-[75%]'>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>KYC Status</span>
    //                                         <span className='text-sm'>Pending KYC-1 </span>
    //                                     </li>
    //                                     <li className='flex justify-between mb-1'>
    //                                         <span className='font-semibold text-sm'>User Status</span>
    //                                         <span className='text-sm'>Active</span>
    //                                     </li>
    //                                 </ul>
    //                                 <div className='w-[25%] pl-2 flex flex-wrap justify-end place-items-start'>
    //                                     <button type="button" className="px-3 py-2 mb-2 sm:mr-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify</button>
    //                                     <button type="button" className="px-3 py-2 mb-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Reject</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //             </div>
    //         </>
    //     )
    // }

    return (
        <>
            <div className="card">
                <Tooltip target=".export-buttons>button" position="bottom" />
                <DataTable ref={dt} value={products} header={header} tableStyle={{ minWidth: '50rem' }} paginator rows={10} filters={filters} globalFilterFields={['register_time', 'account_no', 'phone_no', 'full_name', 'nik', 'user_status', 'user_kyc', 'action']} emptyMessage="Query not found." className='h-screen'>
                    <Column field="number" header="#" />
                    <Column field="emkop_transaction_id" header="Emkop Transaction ID" />
                    <Column field="emkop_user_id" header="Emkop User ID" />
                    <Column field="customer_id" header="Customer ID" />
                    <Column field="nominal" header="Nominal" />
                    <Column field="transaction_time" header="Transaction Time" />
                    <Column field="product_value_1" header="Product Value 1" />
                    <Column field="product_value_2" header="Product Value 2" />
                    <Column field="billing_id" header="Billing ID" />
                    <Column field="reference_id" header="Reference ID" />
                    <Column field="status" header="Status" />
                    {/* <Column body={actionButtons} header="Action"></Column> */}
                </DataTable>
            </div>
        </>
    );
}