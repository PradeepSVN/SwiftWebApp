import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import '../../src/global.css'; // Import your CSS file
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const NestedMenu = ({ data,changeNavLinkPath,handleIsActiveNavigation }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [subMenuItems, setSubMenuItems] = useState([]);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [authSubmenuAnchorEl, setAuthSubmenuAnchorEl] = useState(null);
  const [provSubmenuAnchorEl, setProvSubmenuAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
  };

  const handleSubMenuClose = (item) => {
    setAnchorEl(null);
    setSubmenuAnchorEl(null);
    changeNavLinkPath(item.path);
    handleIsActiveNavigation(data.path);
  };

  const handleSubmenuClick = (event) => {
    console.log("==handleSubmenuClick=",event);
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleSubMenuClick = (data) => (event) => {
    console.log("==handleSubmenuClick data=",data);
    console.log("==handleSubmenuClick event=",event);
    setSubMenuItems(data.subMenuItems);
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleProvSubmenuClick = (event) => {
    console.log("==handleSubmenuClick=",event);
    setProvSubmenuAnchorEl(event.currentTarget);
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
      {data.isMenu?    
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
       
      </Menu>:
      <>
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
          <MenuItem style={{minWidth:'200px'}} value={item.name} primaryText={item.name} onClick={item.isSubmenu?handleSubMenuClick(item): () => handleClose(item)} >{item.name}{item.isSubmenu?<ArrowRightIcon sx={{float:'right'}}  />:null}</MenuItem>
        )}
     
    </Menu>
    <Menu
        id="submenu"
        anchorEl={submenuAnchorEl}
        open={Boolean(submenuAnchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        { subMenuItems.map((item) => 
         <MenuItem value={item.name} primaryText={item.name}  onClick={() => handleSubMenuClose(item)}>{item.name}</MenuItem>
        ) } 
         {/* <MenuItem onClick={handleClose}> { data.subMenuItems.length}</MenuItem>
        <MenuItem onClick={handleClose}>Subitem 2</MenuItem>  */}
      </Menu>
    </>
      
      }
       
    </div>
  );
};

export default NestedMenu;
