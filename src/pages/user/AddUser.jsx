import React, { useState,useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Container,InputGroup,FormControl } from "react-bootstrap"
import "../../styles/AddUser.css";
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import {isEmptyObject} from '../../utils/utils';
import { API_RESPONSE_CODES, API_REQ_TYPE, ROUTES } from "../../utils/constants"
import { getOriginalNode } from "typescript";
import Multiselect from 'multiselect-react-dropdown';
import { addUserAPIRequestData } from "../../utils/apiRequestData";


const AddUser = () => {
  const [payload, setPayload] = useState(addUserAPIRequestData)
  const [userRoles, setUserRoles] = useState([]);
  const [entities, setEntities] = useState([]);
  const [tinList, setTinList] = useState([]);
  const [entityOptions, setEntityOptions] = useState([]);
  const [tinOptions, setTinOptions] = useState([]);
  const [entitySelectedOptions, setEntitySelectedOptions] = useState([]);
  const [tinSelectedOptions, setTinSelectedOptions] = useState([]);
  const [entityId, setEntityId] = useState("");
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    getAllRole();
    getAllEnties();
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
    console.log("===handleChange====entitySelectedOptions========",entitySelectedOptions);
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

  const addUser = async () => {
    setLoading(true);
    clearTimeout(timer);
    setPayload((_payload) => ({ ..._payload, ["entities"]: entitySelectedOptions.map((item) => item.id).join(', ') }))
    setPayload((_payload) => ({ ..._payload, ["tiNs"]: tinSelectedOptions.map((item) => item.id).join(', ') }))
    let requestBody = payload;
    requestBody.entities = entitySelectedOptions.map((item) => item.id).join(', ');
    requestBody.tiNs = tinSelectedOptions.map((item) => item.id).join(', ');
    requestBody.user_Password = 'qw4r#@$$';
    requestBody.created_By_User_UID = '34D1E1FB-5DC7-49B4-A2D1-351638909C93';
    
    console.log("======addUserRole==Start=====",requestBody);
    const res = await postData(APIS.ADDUSER, requestBody);
    console.log("======res=======",res);
    if(res.status == API_RESPONSE_CODES.SUCCESS)
      {
        setLoading(false);
        navigate("/");
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
    <div className="justify-content-center align-items-center vh-100">
      <Container className="px-4 py-3 my-2 center">
        {/* <h2 className="text-center p-3" >Add Single User</h2> */}
        <div className="text-center">
          {/* <span className="error">{isDuplicate?'Email ID already exists to some other user.':''}</span> */}
        </div>
        <div></div>
        <Form>
          <div style={{ display: "flex" }}>
            <div className="col-md-5 offset-md-2">
              <div className="col-md-12">
                <Form.Group controlId="user_UserName">
                  <Form.Label>
                    User Name <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="text"
                    // value={formData.UserName}
                    onChange={handleChange}
                    name="user_UserName"
                  />
                  {/* <span className="error">{errors.name}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>

               
                <div style={{ display: "flex" }}>
                  <Form.Group controlId="user_First_Name">
                    <Form.Label>
                      First Name <span className="error">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      //value={formData.firstName}
                      onChange={handleChange}
                      name="user_First_Name"
                    />
                    {/* <span className="error">{errors.outletname}</span> */}
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid firstName.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="user_Prac_Admin">
                    <Form.Check
                      className="ml1"
                      aria-label="option 1"
                      label="Practice Admin"
                      name="user_Prac_Admin"
                      onChange={handleChecked}
                    />
                  </Form.Group>
                </div>
                <Form.Group controlId="user_Last_Name">
                  <Form.Label>
                    Last Name <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="text"
                    //value={formData.firstName}
                    onChange={handleChange}
                    name="user_Last_Name"
                  />
                  {/* <span className="error">{errors.outletname}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid lastName.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="user_Title">
                  <Form.Label>
                    Title <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="text"
                    //value={formData.firstName}
                    onChange={handleChange}
                    name="user_Title"
                  />
                  {/* <span className="error">{errors.outletname}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid titil.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="user_Email">
                  <Form.Label>
                    Email <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="email"
                    // value={formData.Email}
                    onChange={handleChange}
                    name="user_Email"
                  />
                  {/* <span className="error">{errors.email}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <div style={{ display: "flex" }}>
                  <Form.Group controlId="user_Phone">
                    <Form.Label>
                      Phone <span className="error">*</span>
                    </Form.Label>
                    <Form.Control
                      className="w-97"
                      type="number"
                      //value={formData.MobileNumber}
                      onChange={handleChange}
                      name="user_Phone"
                    />
                    {/* <span className="error">{errors.mobile}</span> */}
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid phone.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="user_Phone_Extn" className="ml3">
                    <Form.Label>
                      Extn <span className="error">*</span>
                    </Form.Label>
                    <Form.Control
                      className="w-50"
                      type="number"
                      //value={formData.MobileNumber}
                      onChange={handleChange}
                      name="user_Phone_Extn"
                    />
                    {/* <span className="error">{errors.mobile}</span> */}
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Extn.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <Form.Group controlId="user_Fax">
                  <Form.Label>
                    Fax <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="text"
                    //value={formData.firstName}
                    onChange={handleChange}
                    name="user_Fax"
                  />
                  {/* <span className="error">{errors.outletname}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid fax.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="role_UID">
                  <Form.Label>
                    Assgined Role <span className="error">*</span>
                  </Form.Label>
                  <Form.Select
                    className="w-50"
                    aria-label="Default select example"
                    onChange={handleChange}
                    name="role_UID"
                  >
                    <option>Open this select Role</option>
                    {userRoles.map((role) => <option value={role.role_UID}>{role.role_Name} </option>)}
                   
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="user_Note">
                  <Form.Label>
                    Note <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    name="user_Note"
                    as="textarea"  
                    onChange={handleChange}
                    rows={2}
                  />
                  {/* <span className="error">{errors.address}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid note.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className=" mx-auto w-50">
                  <Button className="my-3 w-50" type="button" onClick={handleClick}>
                  {loading ? (
                    <Spinner animation="border" role="status" size="sm">          
                    </Spinner>
                  ):null}
                    Create User
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-12">
                <div style={{ display: "flex" }}>
                  <Form.Group controlId="user_Active">
                    <Form.Check
                      className="mr-2"
                      aria-label="option 1"
                      label="Active"
                      name="user_Active"
                      onChange={handleChecked}
                    />
                  </Form.Group>
                  <Form.Group controlId="user_Temp_Disable">
                    <Form.Check
                      className="ml"
                      aria-label="option 1"
                      label="Disaible"
                      name="user_Activeuser_Temp_Disable"
                      onChange={handleChecked}
                    />
                  </Form.Group>
                </div>
                <div style={{ display: "flex" }}>
                  <Form.Group controlId="user_Terminated">
                    <Form.Check
                    aria-label="option 1" 
                    label="Terminated" 
                    name="user_Terminated"
                    onChange={handleChecked}/>
                  </Form.Group>
                  <Form.Group controlId="user_Terminated_Date">
                 
                    <FormControl
                     className="ml"
                     aria-label="option 1"
                      type="date"
                      placeholder="Select a date"
                      name="user_Terminated_Date"
                      onChange={handleChange}
                      //onChange={(event) => setSelectedDate(new Date(event.target.value))}
                      // value={selectedDate.toISOString().slice(0, 10)} // Format for date input
                    />
                 
                    
                    {/* <span className="error">{errors.outletname}</span> */}
                  </Form.Group>
                </div>
                <Form.Group controlId="user_Change_Password">
                  <Form.Check
                    aria-label="option 1"
                    label="Change Password on Login"
                    name="user_Change_Password"
                    onChange={handleChecked}
                  />
                </Form.Group>
                <Form.Group controlId="AssignedEntities">
                  <Form.Label>
                    Assigned Entities <span className="error">*</span>
                  </Form.Label>
                  <Multiselect                  
                   className="custom-multiselectcontrol"
                   aria-label="Default select example"
                    options={entityOptions} // Options to display in the dropdown
                    selectedValues={entitySelectedOptions} // Preselected value to persist in dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    placeholder="Select Entities"
                    />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid AssignedEntities.
                  </Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group>
                  <div className=" mx-auto w-50">
                    <Button className="my-3 w-40">Add Entities</Button>
                  </div>
                </Form.Group> */}
                <Form.Group>
                  <Form.Label>
                    Assigned Tins <span className="error">*</span>
                  </Form.Label>
                  {/* <Form.Control
                      className="w-50 ml2"
                      type="text"
                    placeholder="Search options"
                    //value={searchQuery}
                    onChange={handleSearchQuery}
                  /> */}
                  <Multiselect                  
                   className="custom-multiselectcontrol w-50"
                   aria-label="Default select example"
                    options={tinOptions} // Options to display in the dropdown
                    selectedValues={tinSelectedOptions} // Preselected value to persist in dropdown
                    onSelect={onTinSelect} // Function will trigger on select event
                    onRemove={onTinRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    placeholder="Select Tin"
                    />
                
                  {/* <span className="error">{errors.outletname}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid AssignedTins.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* <div className=" mx-auto w-50">
                  <Button className="my-3 w-40">Add Tins</Button>
                </div> */}
                <Form.Group controlId="cpass">
                  <Form.Check
                    aria-label="option 1"
                    label="Display new user info to send manually"
                  />
                </Form.Group>
                <Form.Group controlId="cpass">               
                  <Form.Check aria-label="option 1" label="Email user" />
                </Form.Group>
              </div>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default AddUser