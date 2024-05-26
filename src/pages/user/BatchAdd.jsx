import React, { useState,useEffect,useRef } from "react"
import {Grid,Box,Table, TableBody, TableRow, TableCell} from '@mui/material';
import { Form, Container,InputGroup,FormControl } from "react-bootstrap"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import '../../../src/global.css'
import GlobalStyles from '../../theme/GlobalStyles';
import {isObject} from '../../utils/utils'

const BatchAdd = ({data}) => {
  const [APIRes, setAPIRes] = useState({})
  const [entities, setEntities] = useState([]);
  const [tinList, setTinList] = useState([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    console.log("=======userinfo page=",data);
    setLoading(true);
   
    try{
      //getAllRole();
      //getAllEnties();
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }
   
   
  }, [])

  const getUserDetails = async () => {
    setLoading(true);
    //clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETUSERROLE);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
      {
        //setUserRoles(res.data.result);  
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
     <Container  style={{margin:'15px', maxWidth:'75%', width:'100%'}}>
      <GlobalStyles />
        {/* <h2 className="text-center p-3" >Add Single User</h2> */}
      
        <div></div>
        <h1 className="page-title"></h1>
        {/* <Form  ref={formRef} style={{marginTop:'65px'}}> */}
        
        {/* </Form> */}
      </Container>  
    </>
  )
}

export default BatchAdd