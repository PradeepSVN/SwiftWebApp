import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import '../../src/global.css'; // Import your CSS file

const CustomCheckbox = ({ props }) => {
     const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Checkbox id={props.id} ></Checkbox>
    </div>
  );
}

export default CustomCheckbox