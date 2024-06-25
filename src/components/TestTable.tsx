import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { data, TableRowsList } from './makeData';
import { useEffect, useRef, useState } from 'react';


interface TableComponentProps {
  tableData: any;
  _rows: User[];
}

export type User = {
  user_First_Name: string;
  user_Last_Name: string;
  user_Title: string;
  user_Email: string;
  user_Phone: string;
  user_UserName: string;
  user_Active: string;
};

const columnHelper = createMRTColumnHelper();
  const columns = [
    columnHelper.accessor('user_First_Name', {
      header: 'First Name',
      size: 40,
    }),
    columnHelper.accessor('user_Last_Name', {
      header: 'Last Name',
      size: 40,
    }),
    columnHelper.accessor('user_Title', {
      header: 'Title',
      size: 40,
    }),
    columnHelper.accessor('user_Email', {
      header: 'Email',
      size: 120,
    }),
    columnHelper.accessor('user_Phone', {
      header: 'Mobile',
      size: 120,
    }),
    columnHelper.accessor('user_UserName', {
      header: 'User Name',
      size: 120,
    }),
    columnHelper.accessor('user_Active', {
      header: 'Active',
      size: 120,
    }),
    // { id: 'user_First_Name', label: 'First Name',numeric: false, disablePadding: true, minWidth: 170 },
    // { id: 'user_Last_Name', label: 'Last Name',numeric: false, disablePadding: true, minWidth: 170 },
    // { id: 'user_Title', label: 'Title',numeric: false, disablePadding: true, minWidth: 170 },
    // { id: 'user_Email', label: 'Email',numeric: false, disablePadding: true, minWidth: 170 },
    // { id: 'user_Phone', label: 'Phone',numeric: false, disablePadding: true, minWidth: 170 },
    // { id: 'user_UserName', label: 'User Name',numeric: false, disablePadding: true, minWidth: 170 },
    // { id: 'user_Active', label: 'Active',numeric: false, disablePadding: true, minWidth: 170 },  
  ];

const Example: React.FC<{ data: User[] }> = ({data}) => {
  //const columns:any = [];// userTableData.columns;
  const tableRows:User[] = data as User[];
  const rowsdata = TableRowsList();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  const handlePaginationChange = (updater:any) => {
    console.log("======handlePaginationChange====",updater);
    //call the setState as normal, but need to check if using an updater callback with a previous state
    setPagination((prevPagination) =>
      //if updater is a function, call it with the previous state, otherwise just use the updater value
      updater instanceof Function ? updater(prevPagination) : updater,
    );
    //put more code for your side effects here, guaranteed to only run once, even in React Strict Mode
  };

  const table = useMaterialReactTable({
    columns,
    data,
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 20],
      showFirstButton: false,
      showLastButton: false,
    },
    onPaginationChange:handlePaginationChange,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',    
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  

  const handleExportRows = (rows:any) => {
    const doc = new jsPDF();
    const tableData = rows.map((row:any) => Object.values(row.original));
    const tableHeaders = Object.keys(data[0]).map((key) => key);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('mrt-pdf-example.pdf');
  };

  return <MaterialReactTable table={table} 
  />;
};

export default Example;

