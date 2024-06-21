import React, { useState,useEffect,useRef } from "react"
import { Form, Container,FormControl } from "react-bootstrap"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import { Button, TextField,Grid } from '@mui/material';
import '../../../src/global.css'
import {isObject} from '../../utils/utils';
import {searchProviderRequestObject} from '../../utils/apiRequestData';
import ProviderInfo from "./ProviderInfo";
import ProviderTable from '../../components/ProviderTable';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import { Height } from "@mui/icons-material";
import TestTable from '../../components/TestTable'

const Providers = ({changeNavLinkPath}) => {

  const [loading, setLoading] = useState(true);
  const [providerList, setProviderList] = useState([]);
  const [providerInfo, setProviderInfo] = useState({}); 
  const [searchPayload, setSearchPayload] = useState(searchProviderRequestObject);
  const [entities, setEntities] = useState([]);
  const [entityOptions, setEntityOptions] = useState([]);
  const [entitySelectedOptions, setEntitySelectedOptions] = useState([]);
  const [insuranceOptions, setInsuranceOptions] = useState([]);
  const [insuranceSelectedOptions, setInsuranceSelectedOptions] = useState([]);
  const [tinOptions, setTinOptions] = useState([]);
  const [tinSelectedOptions, setTinSelectedOptions] = useState([]);
  const [tableData, setTableData] = useState({rows:[],totalCount:0,page:0,size:10});

  const customStyles = {
    control: (styles) => ({
      ...styles,     
      fontSize: '16px',
      borderBottom: '1px solid #ccc',
      display: 'inline-block',
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
    console.log("=======Providers page=");
    //setLoading(true);
   
    try{     
      getFilteredProviderList(0,10);
      getAllEnties();
      //getAllEnties();
    }catch (error) {
      console.log("==Providers Component Error=",error);
    }
   
   
  }, [])

  
  const handleProviderInfo = (row) => {
    setProviderInfo(row);
    //setIsMemberInfo(true);
    changeNavLinkPath({path:'ProviderInfo',data:row})
 
};

const handleMemberComponent = (status) => {
  //setIsMemberInfo(status);
}

const handleBackBtn = () => {   
  //setIsMemberInfo(false); 
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
  
  getFilteredProviderList(0,10);
  //localStorage.setItem("token", "23rasdfqwrwqerwqaerfq")
  //navigate("/")
}

const handleEntitySelectOptions = (newValue) => {
  console.log("==handleSelectOptions=",newValue);
  setEntitySelectedOptions(newValue);    
  setSearchPayload((_payload) => ({ ..._payload, ["entitY_ID"]: newValue.value }))
  getInsuranceListByEntityId(newValue.value);
  getTinsByEntityId(newValue.value);
};

const handleInsuranceSelectOptions = (newValue) => {
  console.log("==handleSelectOptions=",newValue);
  setInsuranceSelectedOptions(newValue);    
  setSearchPayload((_payload) => ({ ..._payload, ["insurance"]: newValue.value }))
  
};

const handleTinSelectOptions = (newValue) => {
  console.log("==handleSelectOptions=",newValue);
  setTinSelectedOptions(newValue);    
  setSearchPayload((_payload) => ({ ..._payload, ["tin"]: newValue.value }))
 
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

const getTinsByEntityId = async (_entityId) => {
  setLoading(true);
  //clearTimeout(timer);
  console.log("======addUserRole==Start=====");
  const res = await getData(APIS.GETPROVIDERTINBYENTITYID+"/?entity_Id="+_entityId);
  console.log("======res=======",res);
  if(res && isObject(res.data) && res.data.result)
    {
      setLoading(false);
      setEntities(res.data.result);   
      let options = [];
      res.data.result.forEach((item) => (options.push({label: item.tiN_NAME,value:item.tiN_ID })));
      setTinOptions(options); //{ value: 1, label: 'test' },
      //setAllEntityOptions(options);  
    } 
    else
    {
      setLoading(false);      
    }
 
}

const getFilteredProviderList = async (page,size) => {
  setLoading(true);
  let payload = searchPayload;
  payload.page = page;
  payload.size = size;
  //clearTimeout(timer);
  console.log("======GETProvider==Start=====",payload);
  const res = await postData(APIS.GETPROVIDERS,payload);
  console.log("======res=======",res);
  if(res &&  isObject(res.data) && res.data.result.length>0 && res.data.statusCode == 200)
    {
      setLoading(false);    
      setProviderList(res.data.result);  
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
      console.log("=======No Data Available=========")
      setLoading(false);   
      setProviderList([]);  
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
  getFilteredProviderList(pagenation.page,pagenation.pageSize);
}

  return (
    <Container style={{marginLeft:'55px' , marginTop:'20px', maxWidth:'93%', width:'100%'}}>
  
      
           <div>
            <header>
      <h1 className="page-title1">Provider List</h1>
      <nav>
        <a href="/">Home</a> /       
        &nbsp;<label> Provider List</label> 
      </nav>
    </header>
            <Form>
           <Grid  className="member-frame" style={{marginTop:'45px',width:'800px'}}>
            <Grid item xs={10} style={{display:'flex'}}>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px',width:'200px' }}>
            {/* <label >Entity</label> */}
            <Select            
              value={entitySelectedOptions}
              onChange={handleEntitySelectOptions}
              options={entityOptions}
              placeholder="Select Entity"            
              isSearchable
              id="entitY_UID"
              name="entitY_UID"
              styles={customStyles}              
              maxMenuHeight={190}                  
              className="react-select__menu"    
            /> 
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px',width:'200px' }}>
            {/* <label >Insurance</label> */}
            <Select            
              value={insuranceSelectedOptions}
              onChange={handleInsuranceSelectOptions}
              options={insuranceOptions}
              placeholder="Select Insurance"            
              isSearchable
              id="insurance"
              name="insurance"
              styles={customStyles}              
              maxMenuHeight={200}              
              className="react-select__menu"    
            /> 
             {/* <TextField placeholder="Insurance" id="insurance" className="member-search-text"             
             onChange={handleChange} /> */}
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px',width:'200px' }}>
            {/* <label>Option</label> */}
            <Select            
              value={tinSelectedOptions}
              onChange={handleTinSelectOptions}
              options={tinOptions}
              placeholder="Select TIN"            
              isSearchable
              id="tin"
              name="tin"
              styles={customStyles}              
              maxMenuHeight={200}                  
              className="react-select__menu"    
            /> 
            {/* <TextField placeholder="TIN" id="option" className="member-search-text"  onChange={handleChange} /> */}
            </Form.Group>
           
            </Grid>
            <Grid item xs={10} style={{display:'flex', marginTop:'0px'}}>
           
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px',width:'230px' }}>
            {/* <label>First Name</label> */}
            <TextField placeholder="First Name" id="firsT_NAME"   onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 10px',width:'230px' }}>
            {/* <label>Last Name</label> */}
            <TextField placeholder="Last Name" id="lasT_NAME"  onChange={handleChange} />
            </Form.Group>  
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px',width:'230px' }}>
            {/* <label>Member ID</label> */}
            <TextField placeholder="NPI" id="npi"  onChange={handleChange} 
             />
            </Form.Group>         
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'8px 8px 8px 8px',width:'150px' }}>           
            <Button type="button"   onClick={handleClick} disabled={loading} 
            sx={{border:'none',backgroundColor:'transparent',borderRadius:'none'}}><SearchIcon sx={{ fontSize: 40 }} /></Button>

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
           {/* <TestTable></TestTable> */}
           <ProviderTable tableData={tableData} handleProviderInfo={handleProviderInfo} handlePagination={handlePagination} ></ProviderTable> 
          </div>: <></>         
          
       
    </Container>
  )
}

export default Providers