import React, { useState,useEffect,useRef } from "react"
import {Button,Grid,Box,Table, TableBody, TableRow, TableCell, List,ListItem,ListItemText} from '@mui/material';
import { Form, Container,InputGroup,FormControl } from "react-bootstrap"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import '../../../src/global.css'
import GlobalStyles from '../../theme/GlobalStyles';
import {isObject} from '../../utils/utils';
import moment from 'moment';
import { useNavigate } from "react-router-dom"
import Link from '@mui/material/Link';
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import PrintIcon from '@material-ui/icons/Print';

const UserInfo = ({data,changeNavLinkPath}) => {
  const [APIRes, setAPIRes] = useState({})
  const [entities, setEntities] = useState([]);
  const [tinList, setTinList] = useState([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate ();

  useEffect(() => {
    console.log("=======userinfo page=",data);
    setLoading(true);
   
    try{
      getUserEntityDetails();
      getUserTinDetails();
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }
   
   
  }, [])

  const getUserEntityDetails = async () => {
    setLoading(true);
    //clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETUSERENTITIES+"/?user_UID="+data.user_UID);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
      {
        setEntities(res.data.result);  
        //let options = [];
        //res.data.result.forEach((item) => (options.push({label: item.role_Name,value:item.role_UID })));
        //setRoleOptions(options);    
      }
      else
      {
        setLoading(false);      
      }
   
  }

  const getUserTinDetails = async () => {
    setLoading(true);
    //clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETUSERTINDETAILS+"/?user_UID="+data.user_UID);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
      {
        setTinList(res.data.result);  
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

  const handleClick = (event) => {
    event.preventDefault();
    console.log("====handleClick====")
    //handleNavigation({path:"EditUser",data:data});
    changeNavLinkPath({path:"EditUser",data:data});
  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
  
     <Container  style={{marginLeft:'55px', marginTop:'20px', maxWidth:'93%', width:'100%'}}>
      <GlobalStyles />
        {/* <h2 className="text-center p-3" >Add Single User</h2> */}
        <header>
      <h1 className="page-title1"> User View</h1> 
      <nav>
      <Button
        style={{backgroundColor:'transparent'}}
        onClick={ () => handleNavLinks("Home")}>Home</Button> /
        &nbsp;<Button
        style={{backgroundColor:'transparent'}}
        onClick={ () => handleNavLinks("UserMaintenance")}>User List</Button> /       
        &nbsp;<label> User View</label>
      </nav>
    </header>
        <div  style={{paddingLeft: '103px',paddingRight: '150px',paddingTop: '33px'}} ref={componentRef}> 
       
        <h4 className="page-title">User Info</h4> 
        {/* <Form  ref={formRef} style={{marginTop:'65px'}}> */}
        <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 6 }} paddingBottom={5}>
          <Grid item xs={8}>
            <Box className="user-info-box1" sx={{ height:'242px'}}>
            <Table>
             <TableBody sx={{border:'none'}}>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>User Name</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_UserName}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Phone</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_Phone}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>First Name</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_First_Name}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Fax</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_Fax}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Last Name</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_Last_Name}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Assigned Role</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.role_Name}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Title</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_Title}</TableCell>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Practice Admn</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_Prac_Admin?'Yes':'No'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Email</TableCell>
                <TableCell className="user-info-value" sx={{border:'none'}}>{data.user_Email}</TableCell>
              </TableRow>             
             </TableBody>
            </Table>
            </Box>
          </Grid>
          <Grid item xs={4} >
          <Box className="user-info-box1" sx={{width:'100%', Height:'242px !importent',}}>
          {/* <Table>
             <TableBody sx={{border:'none'}}>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Created</TableCell>
                <TableCell className="user-info-value1" sx={{border:'none'}}>{moment(data.created_Date).format("MM/DD/YYYY HH:mm A")}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Last Login</TableCell>
                <TableCell className="user-info-value1" sx={{border:'none'}}>{moment(data.created_Date).format("MM/DD/YYYY HH:mm A")}</TableCell>
              </TableRow>              
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Password Last Changed</TableCell>
                <TableCell className="user-info-value1" sx={{border:'none'}}>{moment(data.updated_Date).format("MM/DD/YYYY HH:mm A")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Password Expiring</TableCell>
                <TableCell className="user-info-value1" sx={{border:'none'}}></TableCell>
              </TableRow>
             </TableBody>
            </Table> */}
             <Table>
             <TableBody sx={{border:'none'}}>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Created</TableCell>
                <TableCell className="user-info-value1" sx={{border:'none'}}>{data.created_Date}</TableCell>
              </TableRow>
              <TableRow sx={{border:'none'}}>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Last Login</TableCell>
                <TableCell className="user-info-value1" sx={{border:'none'}}>{data.user_Last_Login_Date}</TableCell>
              </TableRow>              
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Password Last Changed</TableCell>
                <TableCell className="user-info-value1" sx={{border:'none'}}>{data.user_Password_Changed_Date}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="user-info-lable" sx={{border:'none'}}>Password Expiring</TableCell>
                <TableCell className="user-info-value1" sx={{border:'none'}}></TableCell>
              </TableRow>
             </TableBody>
            </Table>
            <br></br>
            <br></br>
            <br></br>
           </Box>
          </Grid>          
        </Grid>
         <Grid   container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 8 }} paddingBottom={5}>
             <Grid item xs={4}>
              <h4 className="page-title">Assigned Entities</h4>
              <Box className="user-info-box3" sx={{height:'200px',display: "flex",
                      flexDirection: "column",
                      //height: 700,
                      overflow: "hidden",
                      overflowY: "scroll",}}>
               <List className="arrow" sx={{ width: '100%', marginLeft:'20px',padding:'0px', listStyleType: 'disc', pl: 2,
                        '& .MuiListItem-root': {
                          display: 'list-item',
                        }, }}>
                {entities && entities.length>0?entities.map((item) => (
                  <ListItem
                    key={item.entity_ID}
                    disableGutters                  
                  >
                    <ListItemText primary={item.entity_Name} />
                  </ListItem>
                )):null}
              </List>               
              </Box>
              
             </Grid>
             <Grid item xs={4}>
             <h4 className="page-title">Assigned Practices</h4>
             <Box className="user-info-box3" sx={{height:'200px',display: "flex",
                      flexDirection: "column",
                      //height: 700,
                      overflow: "hidden",
                      overflowY: "scroll",}}>
             <List className="arrow" sx={{ width: '100%', marginLeft:'20px',padding:'0px', listStyleType: 'disc', pl: 2,
                        '& .MuiListItem-root': {
                          display: 'list-item',
                        }, }}>
                {tinList && tinList.length>0?tinList.map((item) => (
                  <ListItem
                    key={item.tiN_ID}
                    disableGutters                  
                  >
                    <ListItemText primary={item.tiN_Name} />
                  </ListItem>
                )):null}
              </List>                       
             </Box>
             </Grid>
             <Grid item xs={4}>
         <div style={{display: 'flex', justifyContent: 'flex-end'}}>
         <a >
         <Link  variant="link" style={{fontSize:'x-large'}}  onClick={handleClick} >Edit</Link >
         </a>&nbsp; &nbsp;
         <a >
         <Link  variant="link" style={{fontSize:'x-large'}}  onClick={handlePrint} >Print</Link >
         </a>
         {/* <button onClick={handlePrint}>Print </button> */}
      </div>
      </Grid>
            
         </Grid>
         </div> 
        
        {/* </Form> */}
      </Container>  
    </>
  )
}

export default UserInfo