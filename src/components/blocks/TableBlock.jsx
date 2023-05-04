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

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBurger } from '@fortawesome/free-solid-svg-icons';

export default function TableBlock() {
    PrimeReact.appendTo = 'self';

    const [products, setProducts] = useState([]);
    const dt = useRef(null);

    const ProductService = [
      {
        register_time: '19/05/22 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Siswanto Nugroho',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
      {
        register_time: '12/12/23 10:43',
        account_no: 'EA-1-2345-6789-9',
        phone_no: 8123456789012,
        full_name: 'Angkasa',
        nik: 3508105425938207,
        user_status: 'Active',
        user_kyc: 'Pending KYC-1',
        action: 
        <div className='flex flex-row'>
            <ButtonFlowbite size="sm" className="mr-2">
                Review
            </ButtonFlowbite>
            <ButtonFlowbite size="sm" className="bg-red-700 mr-2">
                Block
            </ButtonFlowbite>
        </div>
      },
    ]

    const cols = [
        { field: 'register_time', header: 'Register Time' },
        { field: 'account_no', header: 'Account No' },
        { field: 'phone_no', header: 'Phone No' },
        { field: 'full_name', header: 'Full Name' },
        { field: 'nik', header: 'NIK' },
        { field: 'user_status', header: 'User Status' },
        { field: 'user_kyc', header: 'User KYC' },
        { field: 'action', header: 'Action' },
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

    const header = (
        <div className="flex justify-end gap-2">
            <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" className='bg-blue-400 hover:bg-red-800' />
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS"/>
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF"/>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" className='w-32'/>
            </span>
        </div>
    );

    return (
        <div className="card">
            <Tooltip target=".export-buttons>button" position="bottom" />
            <DataTable ref={dt} value={products} header={header} tableStyle={{ minWidth: '50rem' }} paginator rows={4} filters={filters}  globalFilterFields={['register_time', 'account_no', 'phone_no', 'full_name', 'nik', 'user_status', 'user_kyc', 'action']} emptyMessage="Query not found.">
                {cols.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    );
}