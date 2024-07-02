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
import EnhancedTableHead from './EnhancedTableHead'
import {stableSort,getComparator} from './EnhancedTableHead'



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
  { id: 'entitY_CLIENT_ID', label: 'Entity',orderBy:'asc', minWidth: 170 },
  { id: 'provideR_NPI', label: 'Provider NPI',orderBy:'asc', minWidth: 170 },
  { id: 'provideR_FULLNAME', label: 'Prov Name',orderBy:'asc', minWidth: 150 },
  { id: 'tiN_NAME', label: 'Practice', minWidth: 90,orderBy:'asc', maxWidth:100 },
  { id: 'entitY_DESCRIPTION', label: 'Entity Name',orderBy:'asc', minWidth: 170 },
  { id: 'provideR_ADDRESS_1', label: 'Address1',orderBy:'asc', minWidth: 170 },
  { id: 'provideR_ADDRESS_2', label: 'Address2',orderBy:'asc', minWidth: 170 },  
  { id: 'provideR_CITY', label: 'City',orderBy:'asc', minWidth: 170 },  
  { id: 'provideR_STATE', label: 'State',orderBy:'asc', minWidth: 170 },  
  { id: 'provideR_ZIP', label: 'Zip',orderBy:'asc', minWidth: 130 },  
];



export default function StickyHeadTable({tableData,handleProviderInfo,handlePagination}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = React.useState(2000);
  const [loading, setLoading] = React.useState(false);
  const [order, setOrder] = React.useState('asc');  //asc
  const [orderBy, setOrderBy] = React.useState('id');

  // const [rows, setRows] = React.useState([]);

  useEffect(() => {
    console.log("==provider table useEffect=",tableData.rows);
   
    
    try{
      //getAllRole();
      //getAllEnties();
    }catch (error) {
      console.log("==Provider Component Error=",error);
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
   
  };

  const handleRowChange = (event, row) => {
    console.log("=====handleRowChange======",row)
    handleProviderInfo(row);
    //const updatedData = [...data];
   // const index = updatedData.findIndex((item) => item.id === id);
   // updatedData[index].value = event.target.value;
    //setData(updatedData);
};

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop:'125px' }}>
      <GlobalStyles />
      {/* <TableContainer sx={{ maxHeight: 740 }}> */}

      <TableContainer >
      <Table stickyHeader aria-label="sticky table" className='customTable'
        style={{width:'100%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
          {/* <TableHead>
            <TableRow className='table-header'>
              {columns.map((column) => (
                <TableCell className='table-th'
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,maxWidth: column.minWidth }}
                >
                  {column.label}
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
          <TableRow style={{height:'10px'}} >

</TableRow>
      {tableData.rows && tableData.rows.length >0? stableSort(tableData.rows, getComparator(order, orderBy)).map((row,index) => 
        {
          return (<>            
            <TableRow style={{height:'10px'}}></TableRow>
            <TableRow style={{height: '60px !important'}} role="checkbox" tabIndex={-1} key={row.user_ID} className='table-row1' onClick={(event) => handleRowChange(event, row)} >
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