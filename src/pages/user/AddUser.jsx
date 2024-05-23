import React, { useState,useEffect,useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Container,InputGroup,FormControl } from "react-bootstrap"
import "../../styles/AddUser.css";
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import {isEmptyObject} from '../../utils/utils';
import { API_RESPONSE_CODES, API_REQ_TYPE, ROUTES, borderStyles } from "../../utils/constants"
import { getOriginalNode } from "typescript";
import Multiselect from 'multiselect-react-dropdown';
import { addUserAPIRequestData, apiRequestData } from "../../utils/apiRequestData";
import { LocalStorageKey } from "../../utils/constants";
import TextField from '@mui/material/TextField';
import '../../global.css'
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Select from 'react-select';
import { BorderColor } from "@mui/icons-material";

const AddUser = () => {
  const [payload, setPayload] = useState(addUserAPIRequestData)
  const [userRoles, setUserRoles] = useState([]);
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
  const formRef = useRef(null);
  const [selectedValue, setSelectedValue] = useState(null);

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
    /*setPayload((_payload) => ({ ..._payload, ["created_By_User_UID"]: localStorage.getItem(LocalStorageKey.userId) }));
    try{
      getAllRole();
      getAllEnties();
    }catch (error) {
      console.log("==Add User Component Error=",error);
    }*/
   
    //localStorage.removeItem("token")
    //clearLocalStorage();
  }, [])


  const getAllRole = async () => {
    setLoading(true);
    clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await getData(APIS.GETUSERROLE);
    console.log("======res=======",res);
    if(res)
      {
        setUserRoles(res);     
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
    if(res)
      {
        setEntities(res);   
        let options = [];
        res.forEach((item) => (options.push({name: item.entity_Name,id:item.entity_ID })));
        setEntityOptions(options);
        setAllEntityOptions(options);
        
       // setEntities([...entities, res]);       
        
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
    if(res)
      {
        let options = [];
        res.forEach((item) => (options.push({name: item.tiN_Name,id:item.tiN_ID })));
        const combinedArray = [...tinOptions, ...options];
        setTinOptions(combinedArray);   
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

  const handleChecked = (e) => {
    const target = e.target.checked;
    console.log("=======target======",target + e.target.id);
    setPayload((_payload) => ({ ..._payload, [e.target.id]: target }))
  }

  const handleSelectOptions = (newValue) => {
    console.log("==handleSelectOptions=",newValue);
    setEntitySelectedOptions(newValue);
  };

  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault();
    if(isEmptyObject(payload))
      {
        setFormError("Please fill the required fields");
      }
    addUser();
    //localStorage.setItem("token", "23rasdfqwrwqerwqaerfq")
    //navigate("/")
  }

  const hasRequiredKeys = () => {
    setFormError("");
    let errors = "Please fill the fields "
    let fields = "";
    const requiredKeys = ['user_UserName', 'user_First_Name', 'user_Last_Name', 'user_Title', 'role_UID']; // Replace with your required keys
    requiredKeys.forEach(key => 
      {        
        if(payload[key] == "" || payload[key] == null || payload[key] == undefined)
          {
            fields =fields+", "+key.replace("user_","");
          }
      });
      setFormError(errors + fields);
      return fields == ""?false:true;
  };

  const addUser = async () => {
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
    setPayload((_payload) => ({ ..._payload, ["entities"]: entitySelectedOptions.map((item) => item.id).join(', ') }))
    setPayload((_payload) => ({ ..._payload, ["tiNs"]: tinSelectedOptions.map((item) => item.id).join(', ') }))
    let requestBody = payload;
    requestBody.entities = entitySelectedOptions.map((item) => item.id).join(', ');
    requestBody.tiNs = tinSelectedOptions.map((item) => item.id).join(', ');
    requestBody.user_Password = 'qw4r#@$$';
    //requestBody.created_By_User_UID = localStorage.getItem(LocalStorageKey.userId);
    setTimeout(() => {
      setEntitySelectedOptions([]);
      setTinSelectedOptions([]);
      setEntityOptions([]);
      setTinOptions([]);
      getAllEnties();
      payload(addUserAPIRequestData);
      //setEntityOptions(allEntityOptions);
    }, 3000); // Hide spinner after 3 seconds
  
    console.log("======addUserRole==Start=====",requestBody);
    const res = await postData(APIS.ADDUSER, requestBody);
    console.log("======res=======",res);
    if(res)
      {
        alert("User created successfully");
        setLoading(false);
        formRef.current.reset();
      }
      else
      {
        setLoading(false);
        setFormError("Sorry, something went wrong there. Try again.");
      }
    //isObject(res) && props.LoginUserDetails({ userInfo: res })
  }

  const timer = setTimeout(() => {
    setLoading(false);
  }, 4000); // Hide spinner after 3 seconds

  return (    
      <Container style={{margin:'35px'}}>
        {/* <h2 className="text-center p-3" >Add Single User</h2> */}
        <div className="text-center">
         <span className="error">{formError}</span> 
        </div>
        <div></div>
        <h1 >Add User</h1>
        <Form  ref={formRef} style={{marginTop:'65px'}}>
        <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5}>
          <Grid item xs={3}>
            <Form.Group controlId="user_UserName">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>User Name</label>
            <input  className="input-line-style" placeholder="Enter your text" type="text" name="user_UserName" id="user_UserName" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="user_First_Name">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>First Name</label>
            <CustomTextField placeholder="First Name" name="user_First_Name" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="user_First_Name">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Last Name</label>
            <CustomTextField placeholder="Last Name" name="user_First_Name" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="user_Title">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Title</label>
            <CustomTextField placeholder="Enter Title" name="user_Title" onChange={handleChange} />
            </Form.Group>
          </Grid>
        </Grid>

        <Grid container rowSpacing={1}   columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5}>
          <Grid item xs={3}>
            <Form.Group controlId="user_Email">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Email</label>
            <CustomTextField placeholder="Enter your text"  onChange={handleChange} name="user_Email" />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="user_Phone">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Phone</label>
            <CustomTextField placeholder="Enter your text" name="user_Phone" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="user_Phone_Extn">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Extn </label>
            <CustomTextField placeholder="Enter Extension" name="user_Phone_Extn" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
          <Form.Group controlId="user_Phone_Extn">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Assign Roles </label>
            <Select
        value={selectedValue}
        onChange={setSelectedValue}
        options={options}
        placeholder="Search or select an option"
        styles={customStyles}
        isSearchable
      />
            {/* <CustomSelect placeholder="Select an option">
            {options.map((option) => (
            <option value={option.key}>{option.value}</option>))}
           </CustomSelect> */}
            </Form.Group>
         
          </Grid>
        </Grid>

        <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5}>
          <Grid item xs={3}>
            <Form.Group controlId="user_UserName">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>User Name</label>
            <CustomTextField placeholder="Enter your text" name="user_UserName" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="user_First_Name">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>First Name</label>
            <CustomTextField placeholder="First Name" name="user_First_Name" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="user_First_Name">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Last Name</label>
            <CustomTextField placeholder="Last Name" name="user_First_Name" onChange={handleChange} />
            </Form.Group>
          </Grid>
          <Grid item xs={3}>
            <Form.Group controlId="user_Title">
            <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Title</label>
            <CustomTextField placeholder="Enter Title" name="user_Title" onChange={handleChange} />
            </Form.Group>
          </Grid>
        </Grid>

      

        </Form>
      </Container>  
  )
}

export default AddUser