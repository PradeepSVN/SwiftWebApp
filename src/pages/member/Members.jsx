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

const Members = () => {

  const [loading, setLoading] = useState(true);
  const [memberList, setMemberList] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});
  const [isMemberInfo, setIsMemberInfo] = useState(false);
  const [searchPayload, setSearchPayload] = useState(searchMemberRequestObject);
  const [entities, setEntities] = useState([]);
  const [entityOptions, setEntityOptions] = useState([]);
  const [entitySelectedOptions, setEntitySelectedOptions] = useState([]);
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

  
  const handleMemberInfo = (row) => {
    setMemberInfo(row);
    setIsMemberInfo(true);
 
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
  setEntitySelectedOptions(newValue);    
  setSearchPayload((_payload) => ({ ..._payload, ["entitY_UID"]: newValue.value }))
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

const getFilteredUserList = async (page,size) => {
  setLoading(true);
  let payload = searchPayload;
  payload.page = page;
  payload.size = size;
  //clearTimeout(timer);
  console.log("======GETMEMBERS==Start=====",payload);
  const res = await postData(APIS.GETMEMBERS,payload);
  console.log("======res=======",res);
  if(res &&  isObject(res.data) && res.data.statusCode == 200)
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
    }
 
}

const handlePagination = (pagenation) => {
  console.log("==handlePagination=",pagenation);
  setSearchPayload((_payload) => ({ ..._payload, ["page"]: pagenation.page }))
  setSearchPayload((_payload) => ({ ..._payload, ["size"]: pagenation.pageSize }))
  getFilteredUserList(pagenation.page,pagenation.pageSize);
}

  return (
    <div>
   {isMemberInfo? <Button 
      variant="contained" 
      color="primary" 
      startIcon={<ArrowBack />}
      onClick={handleBackBtn}
      >
        Back
      </Button>:null}
         { !isMemberInfo ?
           <div>
            <h1 >Member List</h1>
            <Form>
           <Grid>
            <Grid item xs={10} style={{marginLeft:'100px', display:'flex'}}>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'10px' }}>
            <label >Entity</label>
            <Select            
              value={entitySelectedOptions}
              onChange={handleEntitySelectOptions}
              options={entityOptions}
              placeholder="Select Entity"            
              isSearchable
              id="entitY_UID"
              name="entitY_UID"
              styles={customStyles}              
                            
              
            /> 
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column',margin:'10px'  }}>
            <label >Insurance</label>
            <TextField placeholder="Insurance" id="insurance" className="member-search-text"
            
             onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'10px' }}>
            <label>Option</label>
            <TextField placeholder="Option" id="option" className="member-search-text"  onChange={handleChange} />
            </Form.Group>
            </Grid>
            <Grid item xs={10} style={{marginLeft:'100px', display:'flex'}}>
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'10px' }}>
            <label>Member ID</label>
            <TextField placeholder="Member ID" id="membeR_ID" className="member-search-text"  onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'10px' }}>
            <label>First Name</label>
            <TextField placeholder="First Name" id="firsT_NAME" className="member-search-text"  onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'10px' }}>
            <label>Last Name</label>
            <TextField placeholder="Last Name" id="lasT_NAME" className="member-search-text"  onChange={handleChange} />
            </Form.Group>
            </Grid>
            <Grid item xs={10} style={{marginLeft:'100px', display:'flex'}}>
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'10px' }}>
            <label>DOB</label>
            <TextField placeholder="MM/DD/YYYY" id="dob" className="member-search-text"  onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'10px' }}>
            <label>PCP</label>
            <TextField placeholder="PCP" id="pcp" className="member-search-text"  onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{display: 'flex', flexDirection: 'column' ,margin:'10px' }}>           
            <Button type="button" className="search-btn" onClick={handleClick} disabled={loading} >Search</Button>
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
          </div>: null 
         
          } 
         { isMemberInfo && memberInfo? <MemberInfo data={memberInfo} handleMemberComponent={handleMemberComponent} />:null}
    </div>
  )
}

export default Members