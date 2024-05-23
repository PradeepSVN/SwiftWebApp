import React, {useState} from 'react';
import logojpg from '../assets/images/logo.jpg';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Routes, Route, Navigate, Link,useNavigate } from "react-router-dom";
import {Stack, Col,DropdownButton, Dropdown } from 'react-bootstrap';
import '../../src/global.css';
import '../styles/layout.css';
import {COLORS,borderStyles} from '../utils/constants';
// Import other components as needed (e.g., IconButton)
function Header({ navLinks,changeNavLinkPath }) {
    const pages = ['Products', 'Pricing', 'Blog'];
    const [isOpen, setIsOpen] = useState(false);

    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      border:borderStyles.searchBoxBorder,
      borderRadius: '30px',      
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      height:'40px',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      marginTop:'15px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color:'black'
    }));
   
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      width: '100%',
      '& .MuiInputBase-input': {
        color:'black',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
    }));


   

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
  
    const navigate = useNavigate ();
  
    const handleNavigation = (path) => { 
     
      console.log(`path: ${path}`); 
      if(path)
        {
          navLinks.map((link) => {
            link.isActive = false;
            if(link.path == path)
              {
                link.isActive = true;
              }            
          })
          changeNavLinkPath(path);
          //navigate(path);
        }
     
    };
  
   
    const handleSelect = (eventKey) => {
      console.log(`Selected: ${eventKey}`); // Handle selection logic here
    };
  
    const handleBtnClick = (eventKey) => {
      console.log(`Selected: ${eventKey}`); // Handle selection logic here
    };
  
    const renderNavLinks = () => {
      
      return navLinks.map((link) => (
        
       link.type === "button"? <Button className={`p-2 link-btn ${link.isActive && link.path !="Logout" ? 'link-btn-Focus' : ''}`} onClick={() => handleNavigation(link.path)}
      sx={{ my: 2,  display: 'block', textTransform:'none', fontSize:'18px',marginRight:'45px',whiteSpace:'nowrap',overflow:'hidden'  }}>{link.title}</Button>: 
            <DropdownButton 
            //id="dropdown-basic-button"
            title={link.title}
            onSelect={handleSelect}
           
          >
            {/* {link.options.map((option) => (
              <Dropdown.Item key={option.key} eventKey={option.key}>
                {option.value}
              </Dropdown.Item>
            ))} */}
          </DropdownButton> 
          
            
       ));
    };
  

    return (
      <AppBar position="static">       
        <Toolbar  sx={{ borderBottom: '7px solid light grey',backgroundColor:'white',height:'150px' }}>
          <img src={logojpg} component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, width:'10%' }}>
            
          </img>
          <Box sx={{  display: { xs: 'none', md: 'flex' },width:'90%', alignItems:'right', justifyContent:'center'}}>
          {renderNavLinks()} 
          
           {/* {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'red', display: 'block', textTransform:'none', fontSize:'18px',marginRight:'45px'  }}
              >
                {page}
              </Button>
            ))}  */}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              backgroundColor={'red'}
            />
          </Search>
          </Box>
          
          {/* Add other content here, like buttons or icons */}
        </Toolbar>        
      </AppBar>
    );
  }
  
  export default Header;