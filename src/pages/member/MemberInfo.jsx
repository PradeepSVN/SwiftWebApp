import React, { useState,useEffect,useRef } from "react"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import '../../../src/global.css'
import GlobalStyles from '../../theme/GlobalStyles';
import {isObject} from '../../utils/utils';
import {Grid,Box,Table, TableBody, TableRow, TableCell, List,ListItem,ListItemText, Button} from '@mui/material';
import { Form, Container,InputGroup,FormControl } from "react-bootstrap";
import moment from 'moment';

const MemberInfo = ({data,changeNavLinkPath}) => {

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

  const handleNavLinks = (path) => {
    changeNavLinkPath(path);
  };

  return (
    <div>
    <Container  style={{marginLeft:'55px', marginTop: '20px', maxWidth:'95%', width:'100%'}}>
       <GlobalStyles />
       <header>
      <h1 className="page-title1" >Member View</h1>
      <nav>
      <Button
        style={{backgroundColor:'transparent'}}
        onClick={ () => handleNavLinks("Home")}>Home</Button>/    
         <Button
        style={{backgroundColor:'transparent'}}
        onClick={ () => handleNavLinks("MemberList")}>Member List</Button>/
        &nbsp;<label> Member View</label>
      </nav>
    </header>
    <div style={{paddingLeft: '103px',paddingRight: '150px',paddingTop: '33px'}}>
    <section className="page-title">
      <h4>ENTITY : {memberInfo.entitY_DESCRIPTION}</h4>
    </section>
         {/* <h2 className="text-center p-3" >Add Single User</h2> */}
       
         <div></div> 
        
         
         {/* <Form  ref={formRef} style={{marginTop:'65px'}}> */}
         <Grid container rowSpacing={2}  columnSpacing={{ xs: 1, sm: 2, md: 6 }} >
         <Grid item xs={4} >
           <Box className="user-info-box" sx={{width:'100%', Height:'750px !importent'}}>
             <h3 className="page-title">Member Info</h3>
             <h6 style={{margin:'20px'}}>{memberInfo.memberstatus}</h6>
           <Table>
              <TableBody sx={{border:'none'}}>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Member Name</TableCell>
                 <TableCell className="user-info-value1" sx={{border:'none'}}>{memberInfo.membeR_FULLNAME}</TableCell>
                
               </TableRow>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>DOB & Age</TableCell>
                 <TableCell className="user-info-value1" sx={{border:'none'}}>{memberInfo.membeR_DOB} , {memberInfo.membeR_Age} Yrs</TableCell>
                 
               </TableRow>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Relationship</TableCell>
                 <TableCell className="user-info-value1" sx={{border:'none'}}>{memberInfo.membeR_RELATIONSHIP}</TableCell>
               </TableRow>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Member Id</TableCell>
                 <TableCell className="user-info-value1" sx={{border:'none'}}>{memberInfo.membeR_CLIENT_ID}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Subscriber Id</TableCell>
                 <TableCell className="user-info-value1" sx={{border:'none'}}>{memberInfo.membeR_SUBSCRIBER_ID}</TableCell>
               </TableRow>      
               <TableRow>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Insurance</TableCell>
                 <TableCell className="user-info-value1" sx={{border:'none'}}>{memberInfo.insurancE_DESCRIPTION}</TableCell>
               </TableRow>     
               <TableRow>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Effective From</TableCell>
                 <TableCell className="user-info-value1" sx={{border:'none'}}>{memberInfo.membeR_INSURANCE_EFF_DATE}</TableCell>
               </TableRow>   
               <TableRow>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Option</TableCell>
                 <TableCell className="user-info-value1" sx={{border:'none'}}>{memberInfo.optioN_CLIENT_ID}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Option Effective</TableCell>
                 <TableCell className="user-info-value1" sx={{border:'none'}}>{memberInfo.membeR_OPTION_EFF_DATE}</TableCell>
               </TableRow>         
              </TableBody>
             </Table>
             <br></br>
             <br></br>
             <br></br><br></br><br></br><br></br>
            </Box>
           </Grid>   
           <Grid item xs={8}>
             <Box className="user-info-box" sx={{ height:'315px',paddingBottom:'20px'}}>
             <h3 className="page-title">Contact Info</h3>
             <Table>
              <TableBody sx={{border:'none'}}>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Address Line1</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_ADDRESS_1}</TableCell>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Home Phone</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_PHONE}</TableCell>
               </TableRow>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Address Line2</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_ADDRESS_2}</TableCell>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Mobile Phone</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_MOBILE}</TableCell>
               </TableRow>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>City</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_CITY}</TableCell>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Work Phone</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_WORK_PHONE}</TableCell>
               </TableRow>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Zip</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_ZIP}</TableCell>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Email</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_EMAIL}</TableCell>
               </TableRow>
               <TableRow>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>State</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.membeR_STATE}</TableCell>
               </TableRow>             
              </TableBody>
             </Table>
             {/* <div className="line"></div> */}
             </Box>
             <br></br>
             <Box className="user-info-box" sx={{ height:'320px',paddingTop:'5px'}}>
           
             <h3 className="page-title">Primary Care info</h3>
             <Table>
              <TableBody sx={{border:'none'}}>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Name</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_FULLNAME}</TableCell>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Office Phone</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_PHONE}</TableCell>
               </TableRow>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Practice</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.tiN_NAME}</TableCell>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Fax</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_FAX}</TableCell>
               </TableRow>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Address Line1</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_ADDRESS_1}</TableCell>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Email</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_EMAIL}</TableCell>
               </TableRow>
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Address Line2</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_ADDRESS_2}</TableCell>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Zip</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_ZIP}</TableCell>
               </TableRow>
               <TableRow>
               <TableCell className="user-info-lable" sx={{border:'none'}}>City</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_CITY}</TableCell>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>State</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{memberInfo.provideR_STATE}</TableCell>
               </TableRow>             
              </TableBody>
             </Table>
             </Box>
           </Grid>
          <br></br>
           
         </Grid>
         </div>
         {/* </Form> */}
       </Container>  
     </div>

  )
}

export default MemberInfo