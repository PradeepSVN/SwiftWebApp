import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort,headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  /*const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
  ];*/

  return (
    
    <TableHead>
      <TableRow className='table-header'>
        {headCells.map((headCell) => (
          <TableCell
            className='table-th'
            style={{ minWidth: headCell.minWidth }}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            
          >
            <TableSortLabel
               active={true}
              // active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
               <p className='text-wrapper-tableheader'>{headCell.label}</p>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };