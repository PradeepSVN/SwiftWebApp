import React, { useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel'
import Button from '@mui/material/Button'
import GlobalStyles from '../theme/GlobalStyles';
import {useEffect} from 'react'
import '../styles/table.css';
import EnhancedTableHead from './EnhancedTableHead'
import {stableSort,getComparator} from './EnhancedTableHead'
import jsPDF from 'jspdf';
import * as jsPDFAutoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import {generatePdfTable} from './GeneratePdfTable'


const tableStyle = {
  backgroundColor:  'white',
};



const Column = {
  id: 'user_First_Name' |
      'user_Last_Name' | 
      'user_Title' | 
      'user_Email' |
      'user_Phone' |
      'user_UserName' |
      'user_Active' ,
  label: '',
  minWidth: 0,
  align: 'right',
  format:''
}

const columns = [
  { id: 'user_UserName', label: 'User Name',numeric: false, disablePadding: true,orderBy:'asc', minWidth: 250 },
  { id: 'user_First_Name', label: 'First Name',numeric: false, disablePadding: true,orderBy:'asc', minWidth: 220 },
  { id: 'user_Last_Name', label: 'Last Name',numeric: false, disablePadding: true,orderBy:'asc', minWidth: 203},
  { id: 'user_Title', label: 'Title',numeric: false, disablePadding: true,orderBy:'asc', minWidth: 200 },
  { id: 'user_Email', label: 'Email',numeric: false, disablePadding: true,orderBy:'asc', minWidth: 250 },
  { id: 'user_Phone', label: 'Phone',numeric: false, disablePadding: true,orderBy:'asc', minWidth: 200 },
  { id: 'role_Name', label: 'Role Name',numeric: false, disablePadding: true,orderBy:'asc', minWidth: 200 },
  { id: 'user_Active', label: 'Active',numeric: false, disablePadding: true,orderBy:'asc', minWidth: 200 },

];

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
];

/*interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}*/

/*const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];*/

export default function StickyHeadTable({tableData,handleUserInfo,handlePagination}) { 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = React.useState(2000);
  const [loading, setLoading] = React.useState(false);

  const [order, setOrder] = React.useState('asc');  //asc
  const [orderBy, setOrderBy] = React.useState('id');
  //cosnt [orderByList, setOrderByList] = React.useState()
  const [firstTimeOrderBy, setFirstTimeOrderBy] = React.useState(true);
  const [dynamicTable, setDynamicTable] = React.useState(generatePdfTable(tableData))
 // const [rows, setRows] = React.useState([]);
 const contentRef = useRef();

  useEffect(() => {
    console.log("==customtable useEffect=",tableData.rows);
   
    
    try{
      //getAllRole();
      //getAllEnties();
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }
   
   
  }, [])


  const handleChangePage = (event, newPage) => {
    console.log("====handleChangePage=======",newPage)
    handlePagination({page:newPage,pageSize:rowsPerPage});
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("====handleChangeRowsPerPage=======",event.target.value)
    handlePagination({page:0,pageSize:event.target.value});
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    console.log("===handleRequestSort=property==",property);
    console.log("===handleRequestSort=order==",order);
    setOrderBy(property);
    columns.map((item) => 
      { 
        if(item.id == property)
          {
            item.orderBy = item.orderBy == 'asc'?'desc':'asc';
            setOrder(item.orderBy);
            console.log("===item.orderBy==",item.orderBy);
          }

      });
   
    /*const isAsc = orderBy === property && order === 'asc';
    if(firstTimeOrderBy)
    {
      setOrder('desc');//isAsc ? 'desc' : 'asc');
      setFirstTimeOrderBy(false);
    }
    else
    {
        setOrder(isAsc ? 'desc' : 'asc');
    }
   
    console.log("===handleRequestSort=isAsc==",isAsc);
    setOrderBy(property);*/
  };

  const handleRowChange = (event, row) => {
    console.log("=====handleRowChange======",row)
    handleUserInfo(row);
    //const updatedData = [...data];
   // const index = updatedData.findIndex((item) => item.id === id);
   // updatedData[index].value = event.target.value;
    //setData(updatedData);
};

const downloadPDF = async () => {
  tableData.columns = columns; 
  const tableHtml = generatePdfTable(tableData);
  console.log("tablehtml=",tableHtml);
  //const doc = new jsPDF();
  //const docTitle = "My Dynamic Content"; // Set a title for the PDF
  //doc.text(docTitle, 14, 16); // Add the title

  const htmlString = generatePdfTable(tableData);

  let iframe = document.createElement("iframe");
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);
  let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
  iframedoc.body.innerHTML = htmlString;
  
  let canvas = await html2canvas(iframedoc.body, {});
  
  // Convert the iframe into a PNG image using canvas.
  let imgData = canvas.toDataURL("image/png");

  // Create a PDF document and add the image as a page.
  const doc = new jsPDF({
    format: "a4",
    unit: "mm",
  });
  doc.addImage(imgData, "PNG", 0, 0, 410, 497);

  // Get the file as blob output.
  let blob = doc.output("blob");


  const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0,200,0);
    pdf.save('table.pdf');
  // Remove the iframe from the document when the file is generated.
  document.body.removeChild(iframe);

  //doc.autoTable({ html: tableHtml, startY: 30 });
  //doc.save("dynamic_table.pdf");
  /*const input = document.getElementById('user-table');
  const originalBackground = input.style.backgroundColor;

  // Apply styles before capturing
  input.style.backgroundColor = 'white';
  input.style.color = 'black';
  input.querySelectorAll('th,TableBody, TableRow,TableCell').forEach(cell => {
    cell.style.padding = '8px';
    cell.style.border = '1px solid #ccc';
    cell.style.color = 'black';
    cell.style.backgroundColor='white';
  });
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('table.pdf');
  });*/
};

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop:'71px' }}>
      <GlobalStyles />

      {/* <TableContainer sx={{ maxHeight: 740 }}  variant={'solid'}> */}
      <TableContainer >
        <Table stickyHeader aria-label="sticky table" className='customTable'
        style={{width:'99%', marginRight:'5px', justifyContent:'center',alignContent:'center',alignItems:'center'}}>

       
          {/* <TableHead>
            <TableRow className='table-header'
            >
              {columns.map((column) => (
                <TableCell className='table-th'
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <p className='text-wrapper-tableheader'>{column.label}</p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead> */}
          <EnhancedTableHead
          headCells={columns}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          
        />
          <TableBody>
          {/* {stableSort(rows, getComparator(order, orderBy)).map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell>{row.address}</TableCell>
            </TableRow>
          ))}  tableData.rows.map */}


            <TableRow style={{height:'10px'}} >

            </TableRow>
            {tableData.rows && tableData.rows.length >0? stableSort(tableData.rows, getComparator(order, orderBy)).map((row,index) => 
              {
                return (<>            
                  <TableRow style={{height:'10px'}}></TableRow>
                   <TableRow style={{height: '60px !important'}} role="checkbox" tabIndex={-1} key={row.user_ID} className='table-row1' onClick={(event) => handleRowChange(event, row)} 
                     >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} className='table-td customTable-td' >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  </> 
                );

              }):null}
           {/* {rows
              //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row:any) => {
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={row.code} className='table-row'>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} className='table-td customTable-td'>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.totalCount}
        rowsPerPage={tableData.size}
        page={tableData.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: dynamicTable }}
        style={{ display: 'none' }}
      />
    </Paper>
  );
}