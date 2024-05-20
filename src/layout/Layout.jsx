import {React,useState,useEffect} from 'react';
//import './styles.css'; // Import your CSS file
import Logo from './Logo';
import NavBar from './NavBar';
import {Grid, Container,Row,Col } from 'react-bootstrap';
import '../styles/layout.css'
import AddUser from '../pages/user/AddUser'
import BatchAdd from '../pages/user/BatchAdd';
import UserRoles from '../pages/user/Roles';
import UserMaintenance from '../pages/user/UserMaintenance';
import { useNavigate } from "react-router-dom"
import { LocalStorageKey } from '../utils/constants';


const options = [
  { key: 1, value: 'Option 1' },
  { key: 2, value: 'Option 2' },
  { key: 3, value: 'Option 4' },
];
const navLinks = [   
    { type:'button', path: 'AddUser', title: 'Single User', isActive:true },
    { type:'button', path: 'BatchAdd', title: 'User Batch Add', isActive:false },
    { type:'button', path: 'UserRoles', title: 'User Roles', isActive:false },
    { type:'button', path: 'UserMaintenance', title: 'User Maintenance', isActive:false },    
    { type:'button', path: 'Logout', title: 'Logout', isActive:false },    
   // { type:'DropdownButton', path: 'UserMaintenance', title: 'User Maintenance', options: options },
  ];

  


const Layout = ({navPathTo}) => {

  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKey.token);
    console.log("====token=====",token);
    if(!token || token == null || token == "")
      {
        navigate("/login");
      }
    
  }, [])


  

  const [contentPage, setContentPage] = useState(navPathTo);
  const changeNavLinkPath = (linkpath) => {
    if(linkpath == "Logout")
      {
        localStorage.removeItem(LocalStorageKey.token);        
        navigate("/login");
      }
      else
      {
        setContentPage(linkpath);
      }
   
  };


  return (
   
      <Container  fluid className="p-0">
        <Row >
        <Logo />
        <NavBar navLinks={navLinks}  changeNavLinkPath={changeNavLinkPath}/>
        </Row>

        <Row className='p-4'>
        {contentPage == undefined?<AddUser />:null}
        {contentPage == "AddUser"?<AddUser />:null}
        {contentPage == "BatchAdd"?<BatchAdd />:null}
        {contentPage == "UserRoles"?<UserRoles />:null}
        {contentPage == "UserMaintenance"?<UserMaintenance />:null}   
      
       
        </Row>
        
      </Container>
     
   
  );
};

export default Layout;