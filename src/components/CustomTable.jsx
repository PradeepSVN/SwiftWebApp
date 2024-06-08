import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import GlobalStyles from '../theme/GlobalStyles';
import {useEffect} from 'react'
import '../styles/table.css';



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
  { id: 'user_First_Name', label: 'First Name', minWidth: 170 },
  { id: 'user_Last_Name', label: 'Last Name', minWidth: 170 },
  { id: 'user_Title', label: 'Title', minWidth: 170 },
  { id: 'user_Email', label: 'Email', minWidth: 170 },
  { id: 'user_Phone', label: 'Phone', minWidth: 170 },
  { id: 'user_UserName', label: 'User Name', minWidth: 170 },
  { id: 'user_Active', label: 'Active', minWidth: 170 },  
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

export default function StickyHeadTable({rows,handleUserInfo}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(false);
 // const [rows, setRows] = React.useState([]);

  useEffect(() => {
    console.log("==customtable useEffect=",rows);
   
    
    try{
      //getAllRole();
      //getAllEnties();
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }
   
   
  }, [])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowChange = (event, row) => {
    console.log("=====handleRowChange======",row)
    handleUserInfo(row);
    //const updatedData = [...data];
   // const index = updatedData.findIndex((item) => item.id === id);
   // updatedData[index].value = event.target.value;
    //setData(updatedData);
};

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop:'20px' }}>
      <GlobalStyles />
      <TableContainer sx={{ maxHeight: 740 }}  variant={'solid'}>
        <Table stickyHeader aria-label="sticky table" className='customTable'
        style={{width:'90%', margin:'70px', justifyContent:'center',alignContent:'center',alignItems:'center' }}
       >
          <TableHead>
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
          </TableHead>
          <TableBody>
            <TableRow style={{height:'10px'}} >

            </TableRow>
            {rows && rows.length >0? rows.map((row,index) => 
              {
                return (<>            
                  <TableRow style={{height:'10px'}}></TableRow>
                   <TableRow role="checkbox" tabIndex={-1} key={row.user_ID} className='table-row' onClick={(event) => handleRowChange(event, row)} 
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}