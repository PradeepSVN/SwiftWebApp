import {React, useState,useEffect,useRef,createContext  } from "react"
import Table from "react-bootstrap/Table"
import { Container } from "react-bootstrap"
import CustomTable from '../../components/CustomTable'
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import {isObject} from '../../utils/utils'
import { userListAPIResponse } from "../../utils/apiRequestData";
import UserInfo from '../user/UserInfo';
import Layout from '../../layout/Layout';
import { ArrowBack, Padding } from '@mui/icons-material';
import { Button, TextField,Grid } from '@mui/material';
import '../../../src/global.css';
import {searchRequestObject} from '../../utils/apiRequestData'
import { Form } from "react-bootstrap"
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import zIndex from "@mui/material/styles/zIndex";



const UserMaintenance = ({isUserList,changeNavLinkPath}) => {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isUserInfo, setIsUserInfo] = useState(false);
  const [searchPayload, setSearchPayload] = useState(searchRequestObject);
  const [userRoles, setUserRoles] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [roleSelectedValue, setRoleSelectedValue] = useState(null);
  const [contextData, setContextData] = useState({});
  const pageContext = createContext({}); // Default value
  const [tableData, setTableData] = useState({rows:[],totalCount:0,page:0,size:10});

  const customStyles = {
    control: (styles) => ({
      ...styles,     
      fontSize: '16px',
      borderBottom: '1px solid #ccc',
      display: 'inline-block',
      width: '100%',      
      cursor: 'pointer',
      boxShadow: 'none',
      zIndex: 999, // state.isFocused ? 'none' : '0px 0px 0px rgba(0, 0, 0, 0.1)', // Remove focus shadow
    }),
    placeholder: (styles) => ({
      color: '#aaa',
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      color: isSelected ? '#000' : '#333',
      backgroundColor: isSelected ? '#eee' : 'transparent',
      zIndex: 9999, 
    }),
  };
  

  let apiResponse = [];
  useEffect(() => {
    setIsUserInfo(false);
    setLoading(true);
    //setContextData({pagePath:'UserMaintenance', isUserInfo:false});
    try{
      
      getUserList(0,10);
      getAllRole();
      //getAllEnties();
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }
   
   
  }, [])

  const getAllRole = async () => {
    setLoading(true);
    //clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETROLES);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
      {
        //setUserRoles(res.data.result);  
        let options = [];
        res.data.result.forEach((item) => (options.push({label: item.role_Name,value:item.role_UID })));
        setRoleOptions(options);    
      }
      else
      {
        setLoading(false);      
      }
   
  }

  const getUserList = async (page,size) => {
    setLoading(true);
    let payload = searchPayload;
    payload.page = page;
    payload.size = size;
  
    //clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETUSERLIST);
    console.log("======res=======",res);
    if(res &&  isObject(res.data) && res.data.statusCode == 200)
      {
        setLoading(false);    
        setUserList(res.data.result);  
        apiResponse = res.data.result;
        console.log("====API Res Userlist====",apiResponse);        
        setTableData((_payload) => ({ ..._payload, ["rows"]: res.data.result }));
        setTableData((_payload) => ({ ..._payload, ["page"]: payload.page }))
        setTableData((_payload) => ({ ..._payload, ["size"]: payload.size }))
        if(res.data.result.length > 0)
          {          
            setTableData((_payload) => ({ ..._payload, ["totalCount"]: res.data.result.length }))
          }
        //let options = [];
        //res.data.result.forEach((item) => (options.push({label: item.role_Name,value:item.role_UID })));
        //setRoleOptions(options);    
      }
      else
      {
        setLoading(false);   
        console.log("=======No Data Available=========")       
        setUserList([]);  
        setTableData((_payload) => ({ ..._payload, ["rows"]: [] }));
        setTableData((_payload) => ({ ..._payload, ["page"]: 0 }))
        setTableData((_payload) => ({ ..._payload, ["size"]: 10 }))                
        setTableData((_payload) => ({ ..._payload, ["totalCount"]: 0 }))   
      }
   
  }

  const handleUserInfo = (row) => {
    changeNavLinkPath({path:"UserInfo",data:row});
      //setUserInfo(row);
      //setIsUserInfo(true);
   
  };

  const handleUserComponent = (status) => {
    setIsUserInfo(status);
  }

  const handlePagination = (pagenation) => {
    console.log("==handlePagination=",pagenation);
    setSearchPayload((_payload) => ({ ..._payload, ["page"]: pagenation.page }))
    setSearchPayload((_payload) => ({ ..._payload, ["size"]: pagenation.pageSize }))
    getFilteredUserList(pagenation.page,pagenation.pageSize);
  }

  const handleRoleSelectOptions = (newValue) => {
    console.log("==handleSelectOptions=",newValue);
    setRoleSelectedValue(newValue);
    setSearchPayload((_payload) => ({ ..._payload, ["role"]: newValue.value }))
  };

  const handleBackBtn = () => {   
    setIsUserInfo(false); 
};

const handleNavigation = (data) => {   
  changeNavLinkPath({path:"UserInfo",data:data});
};

const handleNavLinks = (path) => {
  changeNavLinkPath(path);
};


const handleChange = (e) => {
  console.log("===handleChange====target.id========", e.target.id);
  console.log("===handleChange====e.target========",e.target.value);
  const target = e.target
  setSearchPayload((_payload) => ({ ..._payload, [target.id]: target.value }))
  console.log("===payload==",searchPayload);
}

const handleClick = (event) => {
  event.preventDefault();
  
  getFilteredUserList();
  //localStorage.setItem("token", "23rasdfqwrwqerwqaerfq")
  //navigate("/")
}

const getFilteredUserList = async () => {
  setLoading(true);
  //clearTimeout(timer);
  console.log("======addUserRole==Start=====");
  const res = await postData(APIS.GETALLUSERDETAILSBYSEARCH,searchPayload);
  console.log("======res=======",res);
  if(res &&  isObject(res.data) && res.data.statusCode == 200)
    {
      setLoading(false);    
      setUserList(res.data.result);  
      setTableData((_payload) => ({ ..._payload, ["rows"]: res.data.result }));
      setTableData((_payload) => ({ ..._payload, ["page"]: _payload.page }))
      setTableData((_payload) => ({ ..._payload, ["size"]: _payload.size }))
      if(res.data.result.length > 0)
        {          
          setTableData((_payload) => ({ ..._payload, ["totalCount"]: res.data.result[0].totalCount?res.data.result[0].totalCount:res.data.result.length }))
        }
      apiResponse = res.data.result;
      console.log("====API Res Userlist====",apiResponse);
      //let options = [];
      //res.data.result.forEach((item) => (options.push({label: item.role_Name,value:item.role_UID })));
      //setRoleOptions(options);    
    }
    else
    {
      setLoading(false);      
    }
 
}

  return (
    <>
   <Container style={{marginLeft:'55px' , marginTop:'20px', maxWidth:'93%', width:'100%'}}>
      {/* <Container className="px-4 py-3 my-2 center"> */}
        {/* <div className="col-md-10 offset-md-1"> */}
      {/* {isUserInfo? <Button 
      variant="contained" 
      color="primary" 
      startIcon={<ArrowBack />}
      onClick={handleBackBtn}
      >
        Back
      </Button>:null} */}
         {/* { !isUserInfo ? */}
           <div>
               <header>
      <h1 className="page-title1">User List</h1>
      <nav>
      <Button
        style={{backgroundColor:'transparent'}}
        onClick={ () => handleNavLinks("Home")}>Home</Button> /
        &nbsp;<label> User List</label>
      </nav>
    </header>
            <Form>
           <Grid className="frame-17" style={{marginTop:'50px'}}>
          
            <Grid item xs={10} style={{ display:'flex'}}>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px',width:'150px' }}>
            {/* <label >User Name</label> */}
            <TextField placeholder="User Name" id="user_UserName" className="search-text" onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'8px 8px 8px 8px',width:'150px' }}>
            {/* <label >First Name</label> */}
            <TextField placeholder="First Name" id="user_First_Name" className="search-text" onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px',width:'150px'}}>
            {/* <label>Last Name</label> */}
            <TextField placeholder="Last Name" id="user_Last_Name" className="search-text"  onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px',width:'150px' }}>
            {/* <label>Role Name</label> */}
            <Select
            
            value={roleSelectedValue}
            onChange={handleRoleSelectOptions}
            options={roleOptions}
            placeholder="Select Role"
            styles={customStyles}
            isSearchable
            id="role"
            name="role"
            maxMenuHeight={100}  
            className="react-select__menu"    
              
          />
            {/* <TextField placeholder="Role Name" id="role" className="search-text"  onChange={handleChange} /> */}
            {/* <Select            
              value={roleSelectedValue}
              onChange={handleRoleSelectOptions}
              options={roleOptions}
              placeholder="Select Entity"            
              isSearchable
              id="role"
              name="role"              
              className="search-role-select"
              
            /> */}
            </Form.Group>
          
            <Form.Group style={{margin:'14px',marginLeft:'95px' }}>
            <Button type="button"   onClick={handleClick} disabled={loading} 
            sx={{border:'none',backgroundColor:'transparent',borderRadius:'none'}}><SearchIcon sx={{ fontSize: 40 }} /></Button>
            </Form.Group>
            </Grid>
           </Grid>
           </Form>
          <CustomTable tableData={tableData} handleUserInfo={handleUserInfo} handlePagination={handlePagination} ></CustomTable>  
          </div>
          {/* : null }  */}
         {/* { isUserInfo && userInfo? <UserInfo data={userInfo} handleNavigation={handleNavigation} />:null} */}
        
          
        {/* </div> */}
      {/* </Container> */}
    </Container>
    </>
  )
}

export default UserMaintenance
