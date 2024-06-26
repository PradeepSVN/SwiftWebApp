import {React,useState,useEffect,useContext} from 'react';
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
import Header from '../layout/Header';
import GlobalStyles from '../theme/GlobalStyles';
import COLORS from '../utils/constants';
import {DynamicHeader} from '../utils/dynamicData';
import { roleAPIResponse } from '../utils/apiRequestData';
import MemberList from '../pages/member/Members';
import Home from '../pages/home/Home';
import EditUser from '../pages/user/EditUser';
import UserInfo from '../pages/user/UserInfo';
import MemberInfo from '../pages/member/MemberInfo';
import { isObject } from '../utils/utils';
import ProviderList from '../pages/provider/Providers';
import ProviderInfo from '../pages/provider/ProviderInfo';



const options = [
  { key: 1, value: 'Single User' },
  { key: 2, value: 'Batch Add' },
  { key: 3, value: 'User Role' },
  { key: 3, value: 'User Maintenance' },
];

const menuItems = [
  {name:"Members"},
  {name:"Add Member"},
  {name:"Members Info"},
]

const navLinks = DynamicHeader(roleAPIResponse); /*[   
    { type:'button', path: 'AddUser', title: 'Single User', isActive:true },
    { type:'button', path: 'BatchAdd', title: 'User Batch Add', isActive:false },
    { type:'button', path: 'UserRoles', title: 'User Roles', isActive:false },
    { type:'button', path: 'UserMaintenance', title: 'User Maintenance', isActive:false },    
    // { type:'button', path: 'Logout', title: 'Logout', isActive:false },    
    { type:'DropdownButton', path: 'UserMaintenance', title: 'Member', menuItems: menuItems, options: options },
  ];*/

  


const Layout = ({navPathTo}) => {
  const[data, setData] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem(LocalStorageKey.token);
    //console.log("====contextData=====",contextData);
    console.log("====token=====",token);
    if(!token || token == null || token == "")
      {
        //navigate("/login");
      }
    
  }, [])


  

  const [contentPage, setContentPage] = useState(navPathTo);
  const changeNavLinkPath = (linkpath) => {
    console.log("===layout=changeNavLinkPath===",linkpath);
    if(isObject(linkpath))
    {
      console.log("===layout=changeNavLinkPath=isObject==",linkpath.path);
      setData(linkpath.data);
      setContentPage(linkpath.path);
    }
    else if(linkpath == "Logout")
    {
      localStorage.removeItem(LocalStorageKey.token);        
      navigate("/login");
    }
    else
    {
      console.log("===setContentPage===",linkpath);
      setContentPage(linkpath);
    }
   
  };


  return (
     <div>
      <GlobalStyles/>
      <Header className='header' navLinks={navLinks}  changeNavLinkPath={changeNavLinkPath}></Header>
      <Container  fluid className="p-0">
       
        {/* <Row >
        <Logo />
        <NavBar navLinks={navLinks}  changeNavLinkPath={changeNavLinkPath}/>
        </Row> */}

         {/* <Row className='p-4'> */}
        {contentPage == undefined?<Home />:null}
        {contentPage == "Home"?<Home />:null}
        {contentPage == "AddUser"?<AddUser changeNavLinkPath={changeNavLinkPath} />:null}
        {contentPage == "BatchAdd"?<BatchAdd />:null}
        {contentPage == "UserRoles"?<UserRoles />:null}
        {contentPage == "UserMaintenance"?<UserMaintenance changeNavLinkPath={changeNavLinkPath} />:null}  
        {contentPage == "MemberList"?<MemberList changeNavLinkPath={changeNavLinkPath} />:null}   
        {contentPage == "MemberInfo"?<MemberInfo data={data} changeNavLinkPath={changeNavLinkPath} />:null}   
        {contentPage == "UserInfo"?<UserInfo data={data} changeNavLinkPath={changeNavLinkPath} />:null}   
        {contentPage == "EditUser"?<EditUser data={data} changeNavLinkPath={changeNavLinkPath} />:null}   

        {contentPage == "ProviderList"?<ProviderList changeNavLinkPath={changeNavLinkPath} />:null}  
        {contentPage == "ProviderInfo"?<ProviderInfo data={data} changeNavLinkPath={changeNavLinkPath} />:null}   
       
        {/* </Row>  */}
        
      </Container>
      </div>
   
  );
};

export default Layout;