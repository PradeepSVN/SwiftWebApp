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
import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';

const UserMaintenance = () => {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isUserInfo, setIsUserInfo] = useState(false);
  const [contextData, setContextData] = useState({});
  const pageContext = createContext({}); // Default value
  let apiResponse = [];
  useEffect(() => {
    setLoading(true);
    setContextData({pagePath:'UserMaintenance', isUserInfo:false});
    try{
      getUserList();
      //getAllEnties();
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }
   
   
  }, [])

  const getUserList = async () => {
    setLoading(true);
    //clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETUSERLIST);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
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

  const handleBackBtn = () => {   
    setIsUserInfo(false); 
};

  return (
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
         { !isUserInfo && userList && userList.length>0 ? <CustomTable rows={userList} handleUserInfo={handleUserInfo} ></CustomTable> : null } 
         { isUserInfo && userInfo? <UserInfo data={userInfo} handleUserComponent={handleUserComponent} />:null}
        
          {/* <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Title</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Practice Admin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bready</td>
                <td>Bhaskar</td>
                <td>Breddy</td>
                <td>Manager</td>
                <td>b@red.com</td>
                <td>9095551234</td>
                <td>AUTH VIEW</td>
                <td>jsmith</td>
              </tr>
              <tr>
                <td>Scordojo</td>
                <td>Sunil</td>
                <td>Cardozo</td>
                <td>Nurse</td>
                <td>s@car.com</td>
                <td>6305551234</td>
                <td>AUTH SUB</td>
                <td>jsmith</td>
              </tr>

              <tr>
                <td>Jsmith</td>
                <td>John</td>
                <td>Smith</td>
                <td>Admin</td>
                <td>j@smith.com</td>
                <td>5551112346</td>
                <td>ALL ACCESS</td>
                <td>John</td>
              </tr>
            </tbody>
          </Table> */}
        {/* </div> */}
      {/* </Container> */}
    </div>
  )
}

export default UserMaintenance
