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


const UserMaintenance = () => {
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


  

  let apiResponse = [];
  useEffect(() => {
    setLoading(true);
    //setContextData({pagePath:'UserMaintenance', isUserInfo:false});
    try{
      getAllRole();
      getUserList();
      //getAllEnties();
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }
   
   
  }, [])

  const getAllRole = async () => {
    setLoading(true);
    //clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETUSERROLE);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
      {
        setUserRoles(res.data.result);  
        let options = [];
        res.data.result.forEach((item) => (options.push({label: item.role_Name,value:item.role_UID })));
        setRoleOptions(options);    
      }
      else
      {
        setLoading(false);      
      }
   
  }

  const getUserList = async () => {
    setLoading(true);
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
        //let options = [];
        //res.data.result.forEach((item) => (options.push({label: item.role_Name,value:item.role_UID })));
        //setRoleOptions(options);    
      }
      else
      {
        setLoading(false);      
      }
   
  }

  const handleUserInfo = (row) => {
      setUserInfo(row);
      setIsUserInfo(true);
   
  };

  const handleUserComponent = (status) => {
    setIsUserInfo(status);
  }

  const handleRoleSelectOptions = (newValue) => {
    console.log("==handleSelectOptions=",newValue);
    setRoleSelectedValue(newValue);
    setSearchPayload((_payload) => ({ ..._payload, ["role"]: newValue.value }))
  };

  const handleBackBtn = () => {   
    setIsUserInfo(false); 
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
    <div className="justify-content-center align-items-center vh-100" style={{margin:'30px'}}>
      {/* <Container className="px-4 py-3 my-2 center"> */}
        {/* <div className="col-md-10 offset-md-1"> */}
      {isUserInfo? <Button 
      variant="contained" 
      color="primary" 
      startIcon={<ArrowBack />}
      onClick={handleBackBtn}
      >
        Back
      </Button>:null}
         { !isUserInfo ?
           <div>
            <Form>
           <Grid>
            <Grid item xs={8} style={{marginLeft:'100px', display:'flex'}}>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'10px' }}>
            <label >User Name</label>
            <TextField placeholder="User Name" id="user_UserName" className="search-text" onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'10px'  }}>
            <label >First Name</label>
            <TextField placeholder="First Name" id="user_First_Name" className="search-text" onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'10px' }}>
            <label>Last Name</label>
            <TextField placeholder="Last Name" id="user_Last_Name" className="search-text"  onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'10px' }}>
            <label>Role Name</label>
            <TextField placeholder="Role Name" id="role" className="search-text"  onChange={handleChange} />
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
          
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'10px' }}>
            <Button type="button" className="search-btn" onClick={handleClick} disabled={loading} >Search</Button>
            </Form.Group>
            </Grid>
           </Grid>
           </Form>
          <CustomTable rows={userList} handleUserInfo={handleUserInfo} ></CustomTable>  
          </div>: null 
         
          } 
         { isUserInfo && userInfo? <UserInfo data={userInfo} handleUserComponent={handleUserComponent} />:null}
        
          
        {/* </div> */}
      {/* </Container> */}
    </div>
    </>
  )
}

export default UserMaintenance
