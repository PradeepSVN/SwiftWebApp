import React, { useState,useEffect,useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Container,InputGroup,FormControl } from "react-bootstrap"
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import "../../styles/AddUser.css";
import { Spinner } from "react-bootstrap"
import {APIS,APIMESSAGES} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import {isEmptyObject,isLocalStorageValueExists} from '../../utils/utils';
import { API_RESPONSE_CODES, API_REQ_TYPE, ROUTES, borderStyles } from "../../utils/constants"
import { getOriginalNode } from "typescript";
import Multiselect from 'multiselect-react-dropdown';
import { addUserAPIRequestData, apiRequestData, addUserRequiredData } from "../../utils/apiRequestData";
import { LocalStorageKey } from "../../utils/constants";
import TextField from '@mui/material/TextField';
import '../../global.css'
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Select from 'react-select';
import { BorderColor } from "@mui/icons-material";
import {isObject} from '../../utils/utils';
import {showToast,ToastMessageType} from '../../utils/toastMessage';
import { ToastContainer, toast } from "react-toastify";
import { format, parse } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EditUser = ({data,changeNavLinkPath}) => {
  const [payload, setPayload] = useState(addUserAPIRequestData)
  const [userRoles, setUserRoles] = useState([]);
  const [roleSelectedValue, setRoleSelectedValue] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const [entities, setEntities] = useState([]);
  const [tinList, setTinList] = useState([]);
  const [allEntityOptions, setAllEntityOptions] = useState([]);
  const [entityOptions, setEntityOptions] = useState([]);
  const [tinOptions, setTinOptions] = useState([]);
  const [entitySelectedOptions, setEntitySelectedOptions] = useState([]);
  const [tinSelectedOptions, setTinSelectedOptions] = useState([]);
  const [entityId, setEntityId] = useState("");
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFirstTimeLoadPage, setIsFirstTimeLoadPage] = useState(true);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const CustomTextField = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 5px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  display: block;
  width: 200px;

  &::placeholder {
    color: #aaa;
  }
`;

const customStyles = {
  control: (styles) => ({
    ...styles,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    padding: '0px',
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

const CustomSelect = styled.select`
border: none;
outline: none;
background-color: transparent;
padding: 5px;
font-size: 16px;
border-bottom: 1px solid #ccc;
display: inline-block;
width: 100%;
cursor: pointer;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;

&::placeholder {
  color: #aaa;
}

/* Optional: Style the arrow icon */
&::after {
  content: "\u25BC";
  font-size: 12px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
}
`;

const options = [
  { value: 1, label: 'test' },
  { value: 2, label: 'vae' },
  { value: 3, label: 'zzz' },
];



  useEffect(() => {
    setLoading(false);
    setPayload((_payload) => ({ ..._payload, ["user_UID"]: data.user_UID }));
    console.log("=====Add User====",isLocalStorageValueExists(LocalStorageKey.token))
    if(!isLocalStorageValueExists(LocalStorageKey.token))
      {
         navigate("/login");
      }
    setPayload((_payload) => ({ ..._payload, ["created_By_User_UID"]: localStorage.getItem(LocalStorageKey.userId) }));
    try{
      getUserData();      
      setLoading(false);
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }
   
    //localStorage.removeItem("token")
    //clearLocalStorage();
  }, [])


  const getUserData = async () => {
    setLoading(true);
    clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETUSERDETAILS+"/?user_UID="+data.user_UID);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
      {
        setPayload(res.data.result); 
        getAllRole();
        getAllEnties(); 
       
      }
      else
      {
        setLoading(false);      
      }
   
  }

  const getUserEntityDetails = async () => {
    setLoading(true);
    clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETUSERENTITIES+"/?user_UID="+data.user_UID);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result && res.data.result.length > 0)
      {
            let options = [];
            res.data.result.forEach((item) => (options.push({label: item.entity_Name,value:item.entity_ID })));
            setEntitySelectedOptions(options); //{ value: 1, label: 'test' },  
            res.data.result.forEach((item) => ( getTinByEntityId(item.entity_ID)));
            
      }
      else
      {
        setLoading(false);      
      }
   
  }

  const getUserEntityTinDetails = async () => {
    setLoading(true);
    clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETUSERTINDETAILS+"/?user_UID="+data.user_UID);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result && res.data.result.length > 0)
      {
            let options = [];
            res.data.result.forEach((item) => (options.push({label: item.tiN_Name,value:item.tiN_ID })));
            if(isFirstTimeLoadPage)
              {
                setTinSelectedOptions(options); //{ value: 1, label: 'test' },          
                setIsFirstTimeLoadPage(false);
              }
           
       
      }
      else
      {
        setLoading(false);      
      }
   
  }

  const getAllRole = async () => {
    setLoading(true);
    //clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETROLES);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
      {
        setUserRoles(res.data.result); 
        console.log("==user role id=",payload.role_UID); 
        let options = [];
        res.data.result.forEach((item) => {
          options.push({label: item.role_Name,value:item.role_UID })
          if(item.role_UID == data.role_UID)
            {
              setRoleSelectedValue({label: item.role_Name,value:item.role_UID });
            }
        });
        setRoleOptions(options);           
      }
      else
      {
        setLoading(false);      
      }
   
  }

  const getAllEnties = async () => {
    setLoading(true);
    clearTimeout(timer);
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
        setAllEntityOptions(options);  
        getUserEntityDetails();
      } 
      else
      {
        setLoading(false);      
      }
   
  }

  const getTinByEntityId = async (_entityId) => {
    setLoading(true);
    clearTimeout(timer);
    console.log("======getTinByEntityId==entityId=====",_entityId);
    const res = await getData(`${APIS.GETTINBYENTITYID}?entity_ID=${_entityId}`);
    console.log("======res=======",res);
    if(res && isObject(res.data) && res.data.result)
      {
        setLoading(false);
        let options = [];
        res.data.result.forEach((item) => (options.push({label: item.tiN_Name,value:item.tiN_ID })));
        const combinedArray = [...tinOptions, ...options];
        setTinOptions(combinedArray);   
        getUserEntityTinDetails();   
      }
      else
      {
        setLoading(false);      
      }
   
  }

  const onSelect = (selectedList, selectedItem) => {
    setEntitySelectedOptions([...entitySelectedOptions, selectedItem]);
    console.log("===onSelect====entitySelectedOptions========",entitySelectedOptions);
    console.log(selectedItem);
    setEntityId(selectedItem.id);
    getTinByEntityId(selectedItem.id);
}

const onRemove = (selectedList, selectedItem) => {
  const updatedItems = entitySelectedOptions.filter((item) => item.id !== selectedItem.id);
  setEntitySelectedOptions(updatedItems);
  console.log("===onRemove====entitySelectedOptions========",entitySelectedOptions);
  console.log(selectedItem);
  setTinSelectedOptions([]);

}

const onTinSelect = (selectedList, selectedItem) => {
  console.log("===onSelect====selectedList========",selectedItem.id);
  console.log(selectedItem);
  setTinSelectedOptions([...tinSelectedOptions, selectedItem]);
  
}

const onTinRemove = (selectedList, selectedItem) => {
  const updatedItems = tinSelectedOptions.filter((item) => item.id !== selectedItem.id);
  setTinSelectedOptions(updatedItems);
  console.log("===onRemove====selectedList========");
  console.log(selectedItem);
}

const handleSearchQuery = (serachValue) => {
  console.log("======setSearchQuery=",serachValue);
}

  const handleChange = (e) => {
    console.log("===handleChange====target.id========", e.target.id);
    console.log("===handleChange====e.target========",e.target.value);
    const target = e.target
    setPayload((_payload) => ({ ..._payload, [target.id]: target.value }))
    console.log("===payload==",payload);
  }

  const handleDateChange = (e) => {
    let date = dayjs(e.toISOString()).format('MM/DD/YYYY'); // dayjs(e.toISOString(),'MM/dd/yyyy')
    console.log("===handleChange====target.id========", date);
    setPayload((_payload) => ({ ..._payload, ["user_Terminated_Date"]: date }))
  }


  const handleChecked = (e) => {
    const target = e.target.checked;
    console.log("=======target======",target + e.target.id);
    setPayload((_payload) => ({ ..._payload, [e.target.id]: target }))
  }

  const handleRoleSelectOptions = (newValue) => {
    console.log("==handleSelectOptions=",newValue);
    setRoleSelectedValue(newValue);
    setPayload((_payload) => ({ ..._payload, ["role_UID"]: newValue.value }))
  };

  const handleEntitySelectOptions = (newValue) => {
    console.log("==handleSelectOptions=",newValue);
    setEntitySelectedOptions(newValue);  
    if(newValue && newValue.length > 0)
      {
        setEntityId(newValue[newValue.length-1].value);
        getTinByEntityId(newValue[newValue.length-1].value);
      }
      else
      {
         setTinSelectedOptions([]);
         setTinOptions([]);
      }  
   
  };

  const handleTinSelectOptions = (newValue) => {
    console.log("==handleSelectOptions=",newValue);
    setTinSelectedOptions(newValue);
  };


  const handleClick = (event) => {
    event.preventDefault();
    if(isEmptyObject(payload))
      {
        setFormError("Please fill the required fields");
      }
      editUser();
    //localStorage.setItem("token", "23rasdfqwrwqerwqaerfq")
    //navigate("/")
  }

  const hasRequiredKeys = () => {
    setFormError("");
    let errors = "Please fill the fields "
    let fields = "";
    const requiredKeys = ['user_UserName', 'user_First_Name', 'user_Last_Name', 'user_Title', 'role_UID']; // Replace with your required keys
    addUserRequiredData.find(item => 
      {  
        let key = Object.keys(item)[0];
          
        if(payload[key] == "" || payload[key] == null || payload[key] == undefined)
          {
            console.log("==item==",item[key]);   
            showToast(item[key], ToastMessageType.Error);            
            return true;
            //fields =fields+", "+key.replace("user_","");
          }
      });
      //setFormError(errors + fields);
      return false;
  };

  const editUser = async () => {       
    console.log("entity selected options=",entitySelectedOptions);
    console.log("tin selected options=",tinSelectedOptions);
    if(hasRequiredKeys())
      {
       return;
      }
      else
      {
        setFormError("");
      }     
     setLoading(true);
    clearTimeout(timer);    
    setPayload((_payload) => ({ ..._payload, ["entities"]: entitySelectedOptions.map((item) => item.value).join(', ') }))
    setPayload((_payload) => ({ ..._payload, ["tiNs"]: tinSelectedOptions.map((item) => item.value).join(', ') }))
    let requestBody = payload;
    requestBody.entities = entitySelectedOptions.map((item) => item.value).join(', ');
    requestBody.tiNs = tinSelectedOptions.map((item) => item.value).join(', ');
    requestBody.user_Password = 'qw4r#@$$';
    requestBody.created_By_User_UID = localStorage.getItem(LocalStorageKey.userId);
    /*setTimeout(() => {
      setEntitySelectedOptions([]);
      setTinSelectedOptions([]);
      setEntityOptions([]);
      setTinOptions([]);
      getAllEnties();
      payload(addUserAPIRequestData);
      //setEntityOptions(allEntityOptions);
    }, 3000); // Hide spinner after 3 seconds*/
  
    console.log("======addUserRole==Start=====",requestBody); 
    
    const res = await postData(APIS.EDITUSER, requestBody);
    console.log("======res=======",res);
    if(res &&  isObject(res.data) && res.data.statusCode == 200)
      {        
        setLoading(false);  
        if(res.data.status == "Failed")
          {
            showToast(res.data.message,ToastMessageType.Error);
          }
          else
          {
            showToast("User updated successfully.",ToastMessageType.Success);
            setTimeout(() => {
              setLoading(false);
              changeNavLinkPath("UserMaintenance");
            }, 2000);
            //showToast(APIMESSAGES.USERCREATRED,ToastMessageType.Success);
            //formRef.current.reset();
            
          }
      }
      else
      {
        setLoading(false);
        // setFormError("Sorry, something went wrong there. Try again.");
      }
    //isObject(res) && props.LoginUserDetails({ userInfo: res })
  }

  const timer = setTimeout(() => {
    setLoading(false);
  }, 7000); // Hide spinner after 3 seconds


  return (    
    <Container style={{marginLeft:'55px' , marginTop:'20px', maxWidth:'95%', width:'100%'}}>
    <header>
  <h1 className="page-title1">Single User Edit</h1>
  <nav>
    <a href="/">Home</a> /
    <a href="/">Administration</a> / 
    &nbsp;<label> Single User Edit</label> 
  </nav>
</header>
        {/* <h2 className="text-center p-3" >Add Single User</h2> */}
        <div className="text-center">
         <span className="error">{formError}</span> 
        </div>
        <div></div>
        {/* <h1 >Single User Edit</h1> */}
        <Form  ref={formRef} style={{marginTop:'65px'}}>
        <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5}>
          <Grid item xs={3}>
            <Form.Group >
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>User Name</label>
            <input  className="input-line-style" value={payload.user_UserName} placeholder="Enter your User Name" type="text" name="user_UserName" id="user_UserName" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group >
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>First Name</label>
            <input  className="input-line-style" value={payload.user_First_Name} placeholder="Enter your First Name" name="user_First_Name" id="user_First_Name" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group >
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Last Name</label>
            <input  className="input-line-style" value={payload.user_Last_Name} placeholder="Enter your Last Name" min={2} id="user_Last_Name" name="user_Last_Name" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group>
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Title</label>
            <input  className="input-line-style" value={payload.user_Title} placeholder="Enter your Title" id="user_Title" name="user_Title" onChange={handleChange} />
            </Form.Group>
          </Grid>
        </Grid>

        <Grid container rowSpacing={1}   columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5}>
          <Grid item xs={3}>
            <Form.Group >
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Email</label>
            <input  className="input-line-style"  value={payload.user_Email} placeholder="Enter your Email"  id="user_Email"  onChange={handleChange} name="user_Email" />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group >
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Phone</label>
            <input  className="input-line-style" value={payload.user_Phone} placeholder="(XXX)-XXX-XXXX" maxLength={15} id="user_Phone" name="user_Phone" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group >
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Extn </label>
            <input  className="input-line-style"  value={payload.user_Phone_Extn} placeholder="XXXXXXXXXX" maxLength={10} id="user_Phone_Extn" name="user_Phone_Extn" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group >
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Fax </label>
            <input  className="input-line-style" value={payload.user_Fax} placeholder="(XXX)-XXX-XXXX"  maxLength={15} id="user_Fax" name="user_Fax" onChange={handleChange} />
            </Form.Group>
          </Grid>
        
        </Grid>

        <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5}>
          <Grid item xs={3}>
          <Form.Group >
                  <Form.Check
                    aria-label="option 1"
                    label="Change Password on Login"
                    name="user_Change_Password"
                    id="user_Change_Password"
                    onChange={handleChecked}
                    checked={payload.user_Change_Password}
                  />
          </Form.Group>
           
          </Grid>
          <Grid item xs={3}>
            <Form.Group  className="form-check">
           
            <Form.Check                     
                      aria-label="option 1"
                      label="Active"
                      name="user_Active"
                      id="user_Active"
                      onChange={handleChecked}
                      checked={payload.user_Active}
                    />
            </Form.Group>
          </Grid >
          <Grid item xs={3}>
          <Form.Group >
                    <Form.Check
                      className="ml"
                      aria-label="option 1"
                      label="Disaible"
                      name="user_Activeuser_Temp_Disable"
                      id="user_Activeuser_Temp_Disable"
                      onChange={handleChecked}
                     
                    />
                  </Form.Group>
          </Grid>
          <Grid item xs={3}>
          <Form.Group controlId="user_Terminated">
                    <Form.Check
                    aria-label="option 1" 
                    label="Terminated" 
                    name="user_Terminated"
                    id="user_Terminated"
                    checked={payload.user_Terminated}
                    onChange={handleChecked}/>
                    
                  </Form.Group>
          </Grid>        
        </Grid>

        <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5}>
        <Grid item xs={3}>
          <Form.Group  className="form-date">
                 <label>Terminated Date</label><br></br>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DatePicker
                //  defaultValue={dayjs('05/06/2024')}
                  // className="input-line-style"
                 defaultValue={data.user_Terminated_Date && data.user_Terminated_Date !="" ? dayjs(data.user_Terminated_Date):""}
                  aria-label="option 1"                  
                   format="MM/DD/YYYY"                  
                   name="user_Terminated_Date"
                   id="user_Terminated_Date"
                   onChange={handleDateChange}
                   
                   sx={{
                    "& fieldset": { border: 'none',padding:'5px',width:'200px', marginLeft:'0px' },
                  }}
                  
                   //onChange={(event) => setSelectedDate(new Date(event.target.value))}
                   // value={selectedDate.toISOString().slice(0, 10)} // Format for date input
                 />
                </LocalizationProvider>
                 
                 {/* <span className="error">{errors.outletname}</span> */}
               </Form.Group>
          </Grid>

          <Grid item xs={3}>
          <Form.Group >
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Assign Roles </label>
            <Select
            
        value={roleSelectedValue}
        onChange={handleRoleSelectOptions}
        options={roleOptions}
        placeholder="Select Role"
        styles={customStyles}
        isSearchable
        id="user_role"
        name="user_role"
      />
            {/* <CustomSelect placeholder="Select an option">
            {options.map((option) => (
            <option value={option.key}>{option.value}</option>))}
           </CustomSelect> */}
            </Form.Group>
         
          </Grid>
         
          <Grid item xs={3}>
            <Form.Group>
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Entity</label>
            <Select
            isMulti
        value={entitySelectedOptions}
        onChange={handleEntitySelectOptions}
        options={entityOptions}
        placeholder="Select Entity"
        styles={customStyles}
        isSearchable
        id="user_entity"
        name="user_entity"
      />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group>
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>TIN</label>
            <Select
            isMulti
        value={tinSelectedOptions}
        onChange={handleTinSelectOptions}
        options={tinOptions}
        placeholder="Select Tin"
        styles={customStyles}
        isSearchable
        id="user_tin"
        name="user_tin"
      />
            </Form.Group>
          </Grid>
        </Grid>

        <Grid container rowSpacing={10}  columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5}>
          <Grid item xs={12}>
          <Form.Group >
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Note</label>
            <textarea rows="3" cols="30" value={payload.user_Note} style={{width:'600px'}} className="textarea-line-style"  multiple placeholder="Enter Note" id="user_Note" name="user_Note" onChange={handleChange} />
            </Form.Group>
          </Grid>
        </Grid>

        <Grid container rowSpacing={10}  columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5} >
        <Grid item xs={12} className="grid-container" >
        <Button  type="button" onClick={handleClick} disabled={loading} 
        className="login-btn" sx={{  mt: 3, mb: 2, backgroundColor:'#084c81',textTransform:'none',color:'white', fontWeight:'bold', fontSize:'15px', width:'450px'}}>
                  {loading ? (
                    <Spinner animation="border" role="status" size="sm" color="white">          
                    </Spinner>
                  ):null}
                    Update
                  </Button>
        </Grid>
        </Grid>
      
        

        </Form>
        <ToastContainer/>
      </Container>  
  )
}

export default EditUser
