import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../../src/global.css'; // Import your CSS file
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const Dropdown = ({ data,changeNavLinkPath,handleIsActiveNavigation }) => {
     const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigation = (event) => {
    console.log("==handleNavigation==",event.currentTarget);
  };
  const handleClose = (event) => {   
      console.log("--event.currentTarget--",event);
 
    setAnchorEl(null);
    changeNavLinkPath(event.path);
    handleIsActiveNavigation(data.path);
  };

  return (
    <div>
     
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}       
        className={`p-2 link-btn ${data.isActive && data.path !="Logout" ? 'link-btn-Focus' : ''}`}
        sx={{ my: 2,  display: 'block', textTransform:'none', fontSize:'18px',marginRight:'45px',whiteSpace:'nowrap',overflow:'hidden'  }}
      >
        {data.title} <ArrowDropDownIcon  />
      </Button>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className={'p-2 link-btn'}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
         {data.menuItems.map((item, index) =>
            <MenuItem key={index} value={item.name} primaryText={item.name} onClick={() => handleClose(item)} >{item.name}</MenuItem>
          )}
       
      </Menu>
    </div>
  );
}

export default Dropdown