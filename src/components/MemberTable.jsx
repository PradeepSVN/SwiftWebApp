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
  id: 'entity' |
      'insurance' | 
      'optioncid' | 
      'effective' |
      'term' |
      'pcp' |
      'memberid' |
      'firstname'|
      'lastname'|
      'dob',
  label: '',
  minWidth: 0,
  align: 'right',
  format:''
}

const columns = [
  { id: 'entity', label: 'Entity', minWidth: 170 },
  { id: 'insurance', label: 'Insurance', minWidth: 170 },
  { id: 'optioncid', label: 'Option', minWidth: 150 },
  { id: 'effective', label: 'Effective', minWidth: 130 },
  { id: 'term', label: 'Term', minWidth: 130 },
  { id: 'pcp', label: 'PCP', minWidth: 170 },
  { id: 'memberid', label: 'Member ID', minWidth: 170 },  
  { id: 'firstname', label: 'First Name', minWidth: 170 },  
  { id: 'lastname', label: 'Last Name', minWidth: 170 },  
  { id: 'dob', label: 'DOB', minWidth: 130 },  
];



export default function StickyHeadTable({tableData,handleMemberInfo,handlePagination}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = React.useState(2000);
  const [loading, setLoading] = React.useState(false);
 // const [rows, setRows] = React.useState([]);

  useEffect(() => {
    console.log("==member table useEffect=",tableData.rows);
   
    
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

  const handleRowChange = (event, row) => {
    console.log("=====handleRowChange======",row)
    handleMemberInfo(row);
    //const updatedData = [...data];
   // const index = updatedData.findIndex((item) => item.id === id);
   // updatedData[index].value = event.target.value;
    //setData(updatedData);
};

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop:'150px' }}>
      <GlobalStyles />
      <TableContainer sx={{ maxHeight: 740 }}>
        <Table stickyHeader aria-label="sticky table" className='customTable'
        style={{width:'99%', marginRight:'5px', justifyContent:'center',alignContent:'center',alignItems:'center'}}>
          <TableHead>
            <TableRow className='table-header'>
              {columns.map((column) => (
                <TableCell className='table-th'
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.rows && tableData.rows.length >0? tableData.rows.map((row) => 
              {
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={row.user_ID} className='table-row' onClick={(event) => handleRowChange(event, row)} >
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
                );

              }):null}
          
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
    </Paper>
  );
}