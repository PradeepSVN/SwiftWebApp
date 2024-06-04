import React, { useState,useEffect,useRef } from "react"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import '../../../src/global.css'
import GlobalStyles from '../../theme/GlobalStyles';
import {isObject} from '../../utils/utils';
import {Grid,Box,Table, TableBody, TableRow, TableCell, List,ListItem,ListItemText} from '@mui/material';
import { Form, Container,InputGroup,FormControl } from "react-bootstrap";
import moment from 'moment';

const MemberInfo = ({data}) => {

  const [loading,setLoading] = useState(false);
  const [memberInfo, setmemberInfo] = useState([]);
  useEffect(() => {
    console.log("=======BatchAdd page=");
    setLoading(true);
    getMemberDetails();
    try{
      //getAllRole();
      //getAllEnties();
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }
   
   
  }, [])

  const getMemberDetails = async () => {
    setLoading(true);
    //clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETMEMBERINFO+"/?memberId="+data.memberid);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
      {
        setmemberInfo(res.data.result);  
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
    <div>
   <Container  style={{margin:'15px', maxWidth:'75%', width:'100%'}}>
      <GlobalStyles />
        {/* <h2 className="text-center p-3" >Add Single User</h2> */}
      
        <div></div> 
       
        
        {/* <Form  ref={formRef} style={{marginTop:'65px'}}> */}
        <Grid style={{ margin:'25px', }} container rowSpacing={2}  columnSpacing={{ xs: 1, sm: 2, md: 6 }} paddingBottom={10}>
          <Grid item xs={8}>
            <Box className="user-info-box" sx={{ height:'350px',paddingBottom:'10px'}}>
            <h2 className="page-title">Contact Info</h2>
            <Table>
             <TableBody sx={{border:'none'}}>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>ADDRESS LINE1</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_ADDRESS_1}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>HOME PHONE</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_PHONE}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>ADDRESS LINE2</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_ADDRESS_2}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>MOBILE PHONE</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_MOBILE}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>CITY</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_CITY}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>WORK PHONE</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_WORK_PHONE}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>ZIP</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_ZIP}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>EMAIL</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_EMAIL}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>STATE</TableCell>
                <TableCell sx={{border:'none'}}>{memberInfo.membeR_STATE}</TableCell>
              </TableRow>             
             </TableBody>
            </Table>
            </Box>
            <Box className="user-info-box" sx={{ height:'350px',paddingTop:'5px'}}>
              <br/>
            <h2 className="page-title">Primary Care</h2>
            <Table>
             <TableBody sx={{border:'none'}}>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>NAME</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_FULLNAME}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>OFFICE PHONE</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_PHONE}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>PRACTICE</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.tiN_NAME}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>FAX</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_FAX}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>ADDRESS LINE1</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_ADDRESS_1}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>EMAIL</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_EMAIL}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>ADDRESS LINE2</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_ADDRESS_2}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>ZIP</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_ZIP}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell className="user-info-lable" sx={{border:'none'}}>CITY</TableCell>
                <TableCell sx={{border:'none'}}>{memberInfo.provideR_CITY}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>STATE</TableCell>
                <TableCell sx={{border:'none'}}>{memberInfo.provideR_STATE}</TableCell>
              </TableRow>             
             </TableBody>
            </Table>
            </Box>
          </Grid>
          <Grid item xs={4} >
          <Box className="user-info-box" sx={{width:'100%', Height:'400px',}}>
            <h2 className="page-title">Member Info</h2>
            <h6>{memberInfo.memberstatus}</h6>
          <Table>
             <TableBody sx={{border:'none'}}>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>MEMBER NAME</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_FULLNAME}</TableCell>
               
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>DOB & AGE</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_DOB} , {memberInfo.membeR_Age} Yrs</TableCell>
                
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>RELATIONSHIP</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_RELATIONSHIP}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>MEMBER ID</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_CLIENT_ID}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>SUBSCRIBER ID</TableCell>
                <TableCell sx={{border:'none'}}>{memberInfo.membeR_SUBSCRIBER_ID}</TableCell>
              </TableRow>      
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>NISURANCE</TableCell>
                <TableCell sx={{border:'none'}}>{memberInfo.insurancE_DESCRIPTION}</TableCell>
              </TableRow>     
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>EFFECTIVE FROM</TableCell>
                <TableCell sx={{border:'none'}}>{memberInfo.membeR_INSURANCE_EFF_DATE}</TableCell>
              </TableRow>   
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>OPTION</TableCell>
                <TableCell sx={{border:'none'}}>{memberInfo.optioN_CLIENT_ID}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>OPTION EFFECTIVE</TableCell>
                <TableCell sx={{border:'none'}}>{memberInfo.membeR_OPTION_EFF_DATE}</TableCell>
              </TableRow>         
             </TableBody>
            </Table>
           </Box>
          </Grid>   
          
        </Grid>
        
        {/* </Form> */}
      </Container>  
    </div>
  )
}

export default MemberInfo