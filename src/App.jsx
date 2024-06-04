import React from 'react';
//import './styles.css'; // Import your CSS file
//////import Logo from './layout/Logo';
//import NavBar from './layout/NavBar';
import Layout from './layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Row } from 'react-bootstrap';
import UserList from './pages/user/UserMaintenance'
import UserLookup from './pages/user/UserLookup'
import BatchAdd from './pages/user/BatchAdd'
import Roles from './pages/user/Roles';
import Login from './pages/login/Login';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import AddUser from './pages/user/AddUser';
import MemberMaintenance from './pages/member/Members';
import Home from './pages/home/Home';
import EditUser from './pages/user/EditUser';

const App = () => {
  return (
    <div  style={{ width: '100%'}}>
    <BrowserRouter>     
        <Routes>  {/* Replaced Switch with Routes in React Router v6 */}
        <Route path="/" element={ <Layout navPathTo='Home' />} />  
        
        <Route path="/login" element={<Login  />} />  
        <Route path="/addUser" element={<AddUser />} /> 
        <Route path="/batchUserAdd" element={<BatchAdd />} /> 
        <Route path="/userList" element={<UserList  />} />
        <Route path="/userRoles" element={<Roles  />} />
        <Route path="/memberList" element={<MemberMaintenance  />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editUser" element={<EditUser />} />
      
      </Routes>  
   
  </BrowserRouter>
      
    </div>
  );
};

export default App;