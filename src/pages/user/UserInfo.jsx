import React, { useState,useEffect,useRef } from "react"
import {Grid,Box,Table, TableBody, TableRow, TableCell} from '@mui/material';
import { Form, Container,InputGroup,FormControl } from "react-bootstrap"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import '../../../src/global.css'
import GlobalStyles from '../../theme/GlobalStyles';
import {isObject} from '../../utils/utils';


const UserInfo = ({data}) => {
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
       
        <h1 className="page-title">User Info</h1>
        {/* <Form  ref={formRef} style={{marginTop:'65px'}}> */}
        <Grid style={{ margin:'25px', }} container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 6 }} paddingBottom={5}>
          <Grid item xs={8}>
            <Box className="user-info-box" sx={{ height:'400px'}}>
            <Table>
             <TableBody sx={{border:'none'}}>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>USER NAME</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_UserName}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>PHONE</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_Phone}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>FIRST NAME</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_UserName}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>FAX</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_UserName}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>LAST NAME</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_Last_Name}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>ASSIGNED ROLE</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.role_Name}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>TITLE</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_Title}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>PRACTICE ADMIN</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>N/A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>EMAIL</TableCell>
                <TableCell sx={{border:'none'}}>{data.user_Email}</TableCell>
              </TableRow>             
             </TableBody>
            </Table>
            </Box>
          </Grid>
          <Grid item xs={4} >
          <Box className="user-info-box" sx={{width:'100%', Height:'400px',}}>
          <Table>
             <TableBody sx={{border:'none'}}>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>CREATED</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>Lakshman Kumar Mamidisetti Podalada Razole</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>LAST LOGIN</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>JOHN</TableCell>
              </TableRow>              
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>PASSWORD LAST CHANGED</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>Value</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>PASSWORD EXPIRING</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}></TableCell>
              </TableRow>
             </TableBody>
            </Table>
           </Box>
          </Grid>          
        </Grid>
         <Grid  style={{ margin:'35px', }} container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 8 }} paddingBottom={5}>
             <Grid item xs={6}>
              <label className="user-info-value">ASSIGNED ENTITIES</label>
              <Box className="user-info-box" sx={{height:'200px'}}>

              </Box>
              
             </Grid>
             <Grid item xs={6}>
             <label className="user-info-value">ASSIGNED TINS</label>
             <Box className="user-info-box" sx={{height:'200px'}}>

             </Box>
             </Grid>
         </Grid>
        {/* </Form> */}
      </Container>  
    </>
  )
}

export default UserInfo