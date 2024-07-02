import React, { useState,useEffect,useRef } from "react"
import { Form, Container,InputGroup,FormControl } from "react-bootstrap"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import { ArrowBack, FilterList, Padding } from '@mui/icons-material';
import { Button, TextField,Grid } from '@mui/material';
import '../../../src/global.css'
import GlobalStyles from '../../theme/GlobalStyles';
import {isObject} from '../../utils/utils';
import {searchMemberRequestObject} from '../../utils/apiRequestData';
import MemberInfo from "./MemberInfo";
import MemberTable from '../../components/MemberTable';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ClearIcon from '@mui/icons-material/Clear';

const Members = ({changeNavLinkPath}) => {

  const [loading, setLoading] = useState(true);
  const [memberList, setMemberList] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});
  const [isMemberInfo, setIsMemberInfo] = useState(false);
  const [searchPayload, setSearchPayload] = useState(searchMemberRequestObject);
  const [entities, setEntities] = useState([]);
  const [entityOptions, setEntityOptions] = useState([]);
  const [entitySelectedOptions, setEntitySelectedOptions] = useState([]);
  const [insuranceOptions, setInsuranceOptions] = useState([]);
  const [insuranceSelectedOptions, setInsuranceSelectedOptions] = useState([]);
  const [tableData, setTableData] = useState({rows:[],totalCount:0,page:0,size:10});

  const customStyles = {
    control: (styles) => ({
      ...styles,     
      fontSize: '16px',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      width: '100%',
      cursor: 'pointer',
      boxShadow: 'none', // state.isFocused ? 'none' : '0px 0px 0px rgba(0, 0, 0, 0.1)', // Remove focus shadow
    }),
    placeholder: (styles) => ({
      color: '#aaa',
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      color: isSelected ? '#000' : '#333',
      backgroundColor: isSelected ? '#eee' : 'transparent',
    }),
  };

  useEffect(() => {
    console.log("=======Members page=");
    //setLoading(true);
   
    try{     
      getFilteredUserList(0,10);
      getAllEnties();
      //getAllEnties();
    }catch (error) {
      console.log("==Members Component Error=",error);
    }
   
   
  }, [])

  const handleNavLinks = (path) => {
        changeNavLinkPath(path);
  };
  const handleMemberInfo = (row) => {
    setMemberInfo(row);
    setIsMemberInfo(true);
    changeNavLinkPath({path:'MemberInfo',data:row})
 
};

const handleDateChange = (e) => {
  try{
    let date = dayjs(e.toISOString()).format('MM/DD/YYYY'); // dayjs(e.toISOString(),'MM/dd/yyyy')
    console.log("===handleChange====target.id========", date);
    setSearchPayload((_payload) => ({ ..._payload, ["dob"]: date }))
  }catch(e)
  {

  }
 
}

const handleInsuranceSelectOptions = (newValue) => {
  console.log("==handleSelectOptions=",newValue);
  setInsuranceSelectedOptions(newValue);    
  setSearchPayload((_payload) => ({ ..._payload, ["insurance"]: newValue.value }))
  
};

const handleMemberComponent = (status) => {
  setIsMemberInfo(status);
}

const handleBackBtn = () => {   
  setIsMemberInfo(false); 
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
  
  getFilteredUserList(0,10);
  //localStorage.setItem("token", "23rasdfqwrwqerwqaerfq")
  //navigate("/")
}

const handleEntitySelectOptions = (newValue) => {
  console.log("==handleSelectOptions=",newValue);
  

  if(newValue && newValue.value != 0 && newValue.value != "0")
    {
      setEntitySelectedOptions(newValue);    
      setSearchPayload((_payload) => ({ ..._payload, ["entitY_UID"]: newValue.value }));
      getInsuranceListByEntityId(newValue.value);   
    }
    else
    {
      setEntitySelectedOptions(newValue);    
      setSearchPayload((_payload) => ({ ..._payload, ["entitY_ID"]: "" }))
      setInsuranceOptions([]);
      setInsuranceSelectedOptions([]);
     
    }
};

const getAllEnties = async () => {
  setLoading(true);
  //clearTimeout(timer);
  console.log("======addUserRole==Start=====");
  const res = await getData(APIS.GETALLENTITIES);
  console.log("======res=======",res);
  if(res && isObject(res.data) && res.data.result)
    {
      setLoading(false);
      setEntities(res.data.result);   
      let options = [];
      options.push({label: "   Select Entity",value:0 });
      res.data.result.forEach((item) => (options.push({label: item.entity_Name,value:item.entity_ID })));
      setEntityOptions(options); //{ value: 1, label: 'test' },
      //setAllEntityOptions(options);  
    } 
    else
    {
      setLoading(false);      
    }
 
}

const getInsuranceListByEntityId = async (_entityId) => {
  setLoading(true);
  //clearTimeout(timer);
  console.log("======addUserRole==Start=====");
  const res = await getData(APIS.GETPROVIDERINSURANCELISTBYENTITYID+"/?entity_Id="+_entityId);
  console.log("======res=======",res);
  if(res && isObject(res.data) && res.data.result)
    {
      setLoading(false);
      //setEntities(res.data.result);   
      let options = [];
      res.data.result.forEach((item) => (options.push({label: item.insurancE_DESCRIPTION,value:item.insurancE_CLIENT_ID })));
      setInsuranceOptions(options); //{ value: 1, label: 'test' },
      //setAllEntityOptions(options);  
    } 
    else
    {
      setLoading(false);      
    }
 
}

const getFilteredUserList = async (page,size) => {
  setLoading(true);
  let payload = searchPayload;
  payload.page = page;
  payload.size = size;
  //clearTimeout(timer);
  console.log("======GETMEMBERS==Start=====",payload);
  const res = await postData(APIS.GETMEMBERS,payload);
  console.log("======res=======",res);
  if(res &&  isObject(res.data)  && res.data.result.length>0  && res.data.statusCode == 200)
    {
      setLoading(false);    
      setMemberList(res.data.result);  
      setTableData((_payload) => ({ ..._payload, ["rows"]: res.data.result }));
      setTableData((_payload) => ({ ..._payload, ["page"]: payload.page }))
      setTableData((_payload) => ({ ..._payload, ["size"]: payload.size }))
      if(res.data.result.length > 0)
        {          
          setTableData((_payload) => ({ ..._payload, ["totalCount"]: res.data.result[0].totalCount }))
        }
      //apiResponse = res.data.result;
      //console.log("====API Res GETMEMBERS====",apiResponse);
      //let options = [];
      //res.data.result.forEach((item) => (options.push({label: item.role_Name,value:item.role_UID })));
      //setRoleOptions(options);    
    }
    else
    {
      setLoading(false);  
      console.log("=======No Data Available=========")
      setLoading(false);   
      setMemberList([]);  
      setTableData((_payload) => ({ ..._payload, ["rows"]: [] }));
      setTableData((_payload) => ({ ..._payload, ["page"]: 0 }))
      setTableData((_payload) => ({ ..._payload, ["size"]: 10 }))                
      setTableData((_payload) => ({ ..._payload, ["totalCount"]: 0 }))    
    }
 
}

const handlePagination = (pagenation) => {
  console.log("==handlePagination=",pagenation);
  setSearchPayload((_payload) => ({ ..._payload, ["page"]: pagenation.page }))
  setSearchPayload((_payload) => ({ ..._payload, ["size"]: pagenation.pageSize }))
  getFilteredUserList(pagenation.page,pagenation.pageSize);
}

  return (
    <Container style={{marginLeft:'55px' , marginTop:'20px', maxWidth:'93%', width:'100%'}}>
   {/* {isMemberInfo? <Button 
      variant="contained" 
      color="primary" 
      startIcon={<ArrowBack />}
      onClick={handleBackBtn}
      >
        Back
      </Button>:null} */}
      
           <div>
            <header>
      <h1 className="page-title1">Member List</h1>
      <nav>
        <Button
        style={{backgroundColor:'transparent'}}
        onClick={ () => handleNavLinks("Home")}>Home</Button> /       
        &nbsp;<label> Member List</label> 
      </nav>
    </header>
    
            <Form>
           <Grid  className="member-frame" style={{marginTop:'45px'}}>
            <Grid item xs={10} style={{display:'flex',float:'right'}}>
           
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px' }}>
            {/* <label >Entity</label> */}
            <Select   className="react-select"          
              value={entitySelectedOptions}
              onChange={handleEntitySelectOptions}
              options={entityOptions}
              placeholder="Select Entity"            
              isSearchable
              id="entitY_UID"
              name="entitY_UID"
              styles={customStyles}              
              maxMenuHeight={200}           
                    
            /> 
            </Form.Group>
           
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px' }}>
            {/* <label >Insurance</label> */}
            <Select   className="react-select"            
              value={insuranceSelectedOptions}
              onChange={handleInsuranceSelectOptions}
              options={insuranceOptions}
              placeholder="Select Insurance"            
              isSearchable
              id="insurance"
              name="insurance"
              styles={customStyles}              
              maxMenuHeight={200}             
             
            /> 
            {/* <TextField placeholder="Insurance" id="insurance" className="member-search-text" onChange={handleChange} /> */}
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px' }}>
            {/* <label>Option</label> */}
            <TextField placeholder="Option" id="option" className="member-search-text"  onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px' ,marginRight: '187px'}}>
            {/* <label>Member ID</label> */}
            <TextField placeholder="Member ID" id="membeR_ID"  onChange={handleChange} 
            sx={{ height: '75px' }} />
            </Form.Group>
          
            </Grid>
            <Grid item xs={10} style={{display:'flex', marginTop:'-30px' ,float:'right'}}>
            
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px' }}>
            {/* <label>First Name</label> */}
           
            <TextField placeholder="First Name" id="firsT_NAME"   onChange={handleChange} />
            </Form.Group>
           
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 10px' }}>
            {/* <label>Last Name</label> */}
            <TextField placeholder="Last Name" id="lasT_NAME"  onChange={handleChange} />
            </Form.Group>
           
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 13px' }}>
            {/* <label>DOB</label> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DatePicker format="MM/DD/YYYY" 
                  name="user_Terminated_Date"
                  id="dob"
                  onChange={handleDateChange}
                 />                
               </LocalizationProvider>
            {/* <TextField placeholder="MM/DD/YYYY" id="dob"   onChange={handleChange} /> */}
            </Form.Group>
           
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 13px' }}>
            {/* <label>PCP</label> */}
            <TextField placeholder="PCP" id="pcp"   onChange={handleChange} />
            </Form.Group>
           
            {/* <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px' }}>           
            <Button type="button"   onClick={handleClick} disabled={loading} 
            sx={{border:'none',backgroundColor:'transparent',borderRadius:'none'}}><SearchIcon sx={{ fontSize: 40 }} /></Button>

            </Form.Group> */}
             <Form.Group  style={{margin:'10px 0px 0px 20px ' }}>
            <Button type="button" title="Search" className="search-button"  onClick={handleClick} disabled={loading} 
            sx={{border:'none',backgroundColor:'transparent',borderRadius:'none'}}><SearchIcon sx={{ fontSize: 25 }} /></Button>
            </Form.Group>
            <Form.Group style={{margin:'10px 10px 0px 20px ' }}>
            <Button type="button" title="Clear" className="search-button"  onClick={handleClick} disabled={loading} 
            sx={{border:'none',backgroundColor:'transparent',borderRadius:'none'}}><ClearIcon sx={{ fontSize: 25 }} /></Button>
            </Form.Group>
          
            </Grid>
                     
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
            
          
            
           
           </Grid>
           </Form>
          <MemberTable tableData={tableData} handleMemberInfo={handleMemberInfo} handlePagination={handlePagination} ></MemberTable>  
          </div>: <></> 
         
          
         {/* { isMemberInfo && memberInfo? <MemberInfo data={memberInfo} handleMemberComponent={handleMemberComponent} />:null} */}
    </Container>
  )
}

export default Members