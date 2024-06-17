import React, { useState } from 'react';
import {Stack, Col,DropdownButton, Dropdown } from 'react-bootstrap';
import '../styles/layout.css';
import { Routes, Route, Navigate, Link,useNavigate } from "react-router-dom";

const NavBar = ({ navLinks,changeNavLinkPath }) => {
  const [isOpen, setIsOpen] = useState(false);

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

  /* const options = [
    { key: 1, value: 'Option 1' },
    { key: 2, value: 'Option 2' },
    { key: 3, value: 'Option 3' },
  ];

 const navLinks = [   
    { type:'button', path: '/user', title: 'Single User' },
    { type:'button', path: '/user', title: 'User Batch Add' },
    { type:'DropdownButton', path: '/user', title: 'User Maintenance', options: options },
  ];*/

  

  const handleSelect = (eventKey) => {
    console.log(`Selected: ${eventKey}`); // Handle selection logic here
  };

  const handleBtnClick = (eventKey) => {
    console.log(`Selected: ${eventKey}`); // Handle selection logic here
  };

  const renderNavLinks = () => {
    
    return navLinks.map((link) => (
      
     link.type === "button"? <button className={`p-2 navBtn ${link.isActive && link.path !="Logout" ? 'btnFocus' : ''}`} onClick={() => handleNavigation(link.path)}>{link.title}</button>: 
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
    <Col className="justify-content-center" >
    <Stack direction="horizontal" gap={0} className='stackCenter'>
      {renderNavLinks()} 
    </Stack>
    </Col>
   
  );
};

export default NavBar;