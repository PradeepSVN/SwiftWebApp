import React, { useState,useEffect,useRef } from "react"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import '../../../src/global.css'
import GlobalStyles from '../../theme/GlobalStyles';
import {isObject} from '../../utils/utils';
import {Grid,Box,Table, TableBody, TableRow, TableCell, List,ListItem,ListItemText} from '@mui/material';
import { Form, Container,InputGroup,FormControl } from "react-bootstrap";
import moment from 'moment';

const ProviderInfo = ({data}) => {

  const [loading,setLoading] = useState(false);
  const [providerInfo, setProviderInfo] = useState([]);
  const [specialtyList, setSpecialtyList] = React.useState([]);

  const [insuranceList, setInsuranceList] = React.useState([]);
  const [tinList, setTinList] = React.useState([]);

  useEffect(() => {
    console.log("=======BatchAdd page=");
    setLoading(true);
    getProviderViewDetails();
    try{
      //getAllRole();
      //getAllEnties();
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }
   
   
  }, [])

  const getProviderViewDetails = async () => {
    setLoading(true);
    //clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    // const res = await getData(APIS.GETPROVIDERINFO+"/?providerUid="+data.provider_uid);
      const res = await getData(APIS.GETPROVIDERINFO+"/?providerUid=76F0A7EF-1DFB-41D1-A063-23AA77E132ED");
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
      {
        setProviderInfo(res.data.result);  
        //let options = [];
        //res.data.result.forEach((item) => (options.push({label: item.role_Name,value:item.role_UID })));
        //setRoleOptions(options);    
        setSpecialtyList(JSON.parse(res.data.result.provideR_SPECIALTY_LIST));
        setInsuranceList(JSON.parse(res.data.result.provideR_INSURANCE_LIST));
        setTinList(JSON.parse(res.data.result.provideR_TIN_LIST));
      }
      else
      {
        setLoading(false);      
      }
   
  }

  return (
    <div>
    <Container  style={{marginLeft:'55px', maxWidth:'95%', width:'100%'}}>
       <GlobalStyles />
       <header>
      <h1 className="page-title1" >View Provider</h1>
      <nav>
        <a href="/">Home</a> /
        <a href="/">Provider List</a> /
        &nbsp;<label> View Provider</label>
      </nav>
    </header>
    <section className="page-title">
      <h4>ENTITY - {providerInfo.entitY_DESCRIPTION}</h4>
    </section>
         {/* <h2 className="text-center p-3" >Add Single User</h2> */}
       
         <div></div> 
        
         
         {/* <Form  ref={formRef} style={{marginTop:'65px'}}> */}
         <Grid container rowSpacing={2}  columnSpacing={{ xs: 1, sm: 2, md: 6 }} >
         <Grid item xs={6}>
             <Box className="user-info-box" sx={{ height:'200px',paddingBottom:'20px'}}>
             <h3 className="page-title">Provider Info</h3>
             <Table>
              <TableBody sx={{border:'none'}}>
              <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>Name</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_FULLNAME}</TableCell>
               </TableRow>
               
               <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>NPI</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_NPI}</TableCell>
               </TableRow>
                         
              </TableBody>
             </Table>
             {/* <div className="line"></div> */}
             </Box>
             <br></br>
             <Box className="user-info-box2" sx={{width:'100%', Height:'150px !importent',overflowY: 'scroll'}}>
             {/* <h3 className="page-title">Practices</h3> */}
             <div className="col-sm-12 clsdisplay" >
             <div className="col-sm-5">
           <Table>
              <TableBody sx={{border:'none'}}>   
              <TableRow sx={{border:'none'}}>
                 <TableCell className="" sx={{border:'none',overflow:'wrap'}}><h3 className="page-title2">Specialty</h3></TableCell></TableRow>           
              {specialtyList && specialtyList.length >0? specialtyList.map((row,index) => 
              {
                return (<>   
                <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none',overflow:'wrap'}}>{row.PROVIDER_SPECIALTY_TYPE}</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none',overflow:'wrap'}}>{row.PROVIDER_CLIENT_SPECIALTY_DESCRIPTION}</TableCell>
                  </TableRow>
                  </> 
                );

              }):null}                      
              </TableBody>
             </Table>
             </div>
             <div className="col-sm-1">
             <div class="seperator">
             </div>
             </div>
             <div className="col-sm-6">
           <Table>
              <TableBody sx={{border:'none'}}>  
              <TableRow sx={{border:'none'}}>
              <TableCell className="" sx={{border:'none',overflow:'wrap' }}><h3 className="page-title2">Tin</h3></TableCell></TableRow>                 
              {tinList && tinList.length >0? tinList.map((row3,index) => 
              {
                return (<>   
                <TableRow sx={{border:'none'}}>
                 {/* <TableCell className="user-info-lable" sx={{border:'none'}}>{row3.TIN_CLIENT_ID}</TableCell> */}
                 <TableCell className="user-info-value" sx={{border:'none',overflow:'wrap'}}>{row3.TIN_NAME}</TableCell>
                  </TableRow>
                  </> 
                );

              }):null}                      
              </TableBody>
             </Table>
             </div>
             </div>
            </Box>
           </Grid>
         <Grid item xs={6} >
         <Box className="user-info-box" sx={{ height:'200px',paddingTop:'5px',overflowY: 'scroll'}}>
           
           <h3 className="page-title">Contact Info</h3>
           <Table>
            <TableBody sx={{border:'none'}}>
            {/* <TableRow sx={{border:'none'}}>
               <TableCell className="user-info-lable" sx={{border:'none'}}>Client Address Type</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_CLIENT_ADDRESS_TYPE}</TableCell>
             </TableRow> */}
             <TableRow sx={{border:'none'}}>
               <TableCell className="user-info-lable" sx={{border:'none'}}><b>Primary:</b></TableCell>           
               <TableCell className="user-info-value" sx={{border:'none',overflow:'wrap'}}>{providerInfo.provideR_ADDRESS_1},{providerInfo.provideR_CITY},{providerInfo.provideR_STATE}-{providerInfo.provideR_ZIP} (p) {providerInfo.provideR_PHONE} (f) {providerInfo.provideR_FAX}</TableCell>     
             </TableRow>
             <TableRow sx={{border:'none'}}>
               <TableCell className="user-info-lable" sx={{border:'none'}}><b>Secondary:</b></TableCell>           
               <TableCell className="user-info-value" sx={{border:'none',overflow:'wrap'}}>{providerInfo.provideR_ADDRESS_2},{providerInfo.provideR_CITY},{providerInfo.provideR_STATE}-{providerInfo.provideR_ZIP} (p) {providerInfo.provideR_PHONE} (f) {providerInfo.provideR_FAX}</TableCell>     
             </TableRow>
            {/* <TableRow sx={{border:'none'}}>
               <TableCell className="user-info-lable" sx={{border:'none'}}>Address Line1</TableCell>
               <TableCell className="user-info-value" sx={{border:'none',overflow:'wrap'}}>{providerInfo.provideR_ADDRESS_1}</TableCell>
             </TableRow>
             <TableRow>
             <TableCell className="user-info-lable" sx={{border:'none'}}>City</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_CITY}</TableCell>
             </TableRow>
             <TableRow>
             <TableCell className="user-info-lable" sx={{border:'none'}}>State</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_STATE}</TableCell>
             </TableRow>  
             <TableRow>  
             <TableCell className="user-info-lable" sx={{border:'none'}}>Phone</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_PHONE}</TableCell>
             </TableRow>
             <TableRow>  
             <TableCell className="user-info-lable" sx={{border:'none'}}>Fax</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_FAX}</TableCell>
             </TableRow>
             <TableRow>  
             <TableCell className="user-info-lable" sx={{border:'none'}}>Zip</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_ZIP}</TableCell>
             </TableRow>
             <TableRow sx={{border:'none'}}>
               <TableCell className="user-info-lable" sx={{border:'none'}}><b>Secondary:</b></TableCell>                
             </TableRow> 
            <TableRow sx={{border:'none'}}>
               <TableCell className="user-info-lable" sx={{border:'none'}}>Address Line2</TableCell>
               <TableCell className="user-info-value" sx={{border:'none',overflow:'wrap'}}>{providerInfo.provideR_ADDRESS_2}</TableCell>
             </TableRow>
             <TableRow>
             <TableCell className="user-info-lable" sx={{border:'none'}}>City</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_CITY}</TableCell>
             </TableRow>
             <TableRow>
             <TableCell className="user-info-lable" sx={{border:'none'}}>State</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_STATE}</TableCell>
             </TableRow>  
             <TableRow>  
             <TableCell className="user-info-lable" sx={{border:'none'}}>Phone</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_PHONE}</TableCell>
             </TableRow>
             <TableRow>  
             <TableCell className="user-info-lable" sx={{border:'none'}}>Fax</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_FAX}</TableCell>
             </TableRow>
             <TableRow>  
             <TableCell className="user-info-lable" sx={{border:'none'}}>Zip</TableCell>
               <TableCell className="user-info-value" sx={{border:'none'}}>{providerInfo.provideR_ZIP}</TableCell>
             </TableRow>   */}        
            </TableBody>
           </Table>
           </Box>
          <br></br>
            <Box className="user-info-box1" sx={{width:'100%', Height:'440px !importent',overflowY: 'scroll'}}>
             
             <h3 className="page-title">Insurance Info</h3>
            
           <Table className="table-info-height" sx={{border:'none', Height:'440px !important',overflowY: 'scroll'}}>
              <TableBody sx={{border:'none'}}>              
              {insuranceList && insuranceList.length >0? insuranceList.map((row1,index) => 
              {
                return (<>   
                <TableRow sx={{border:'none'}}>
                 <TableCell className="user-info-lable" sx={{border:'none'}}>{row1.INSURANCE_CLIENT_ID}</TableCell>
                 <TableCell className="user-info-value" sx={{border:'none'}}>{row1.INSURANCE_DESCRIPTION}</TableCell>
                  </TableRow>
                  </> 
                );

              }):null}                      
              </TableBody>
             </Table>
             
            </Box>
           </Grid>   
          
          <br></br>
           
         </Grid>
         
         {/* </Form> */}
       </Container>  
     </div>

  )
}

export default ProviderInfo