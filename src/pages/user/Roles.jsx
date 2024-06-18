import { useState,React,useEffect,useRef  } from "react"
import { Form, Button, Container, Table } from "react-bootstrap"
import { BsCheckCircle } from "react-icons/bs"
import "../../styles/UserRole.css"
// import "../../global.css";
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {APIS} from '../../utils/apiList';
import {postData} from '../../services/rest-services';
import {isEmptyObject,isObject} from '../../utils/utils';
import { apiRequestData } from "../../utils/apiRequestData";
import { LocalStorageKey } from "../../utils/constants";
import {Checkbox} from '@mui/material'
import {showToast,ToastMessageType} from '../../utils/toastMessage';
import { ToastContainer, toast } from "react-toastify";





const Roles = () => {
  const [requestData, setRequestData] = useState(apiRequestData);
  const [payload, setPayload] = useState(apiRequestData);
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false);
  const formRef  = useRef(null);


  const handleSubmit = event => {
    event.preventDefault()
    //onSubmit(username, password);
  }

  useEffect(() => {
    setPayload((_payload) => ({ ..._payload, ["created_By_User_UID"]: localStorage.getItem(LocalStorageKey.userId) }));
  },[]);

  const handleChange = (e) => {
    const target = e.target
    console.log("=======target======",target);
    setPayload((_payload) => ({ ..._payload, [target.id]: target.value}))
    console.log("=======setPayload======",payload);
  }

  const handleChecked = (e) => {
    const target = e.target.checked;
    console.log("=======target======",target + e.target.id);
    setPayload((_payload) => ({ ..._payload, [e.target.id]: target }))
  }

  const handleRowClick = (rowId) => {    
    console.log("=======rowId======",rowId); 
    console.log("=======payload======",payload[rowId]);
        
    setPayload((_payload) => ({ ..._payload, [rowId]: !payload[rowId] }))
  }

  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault();
    setFormError("");
    if(isEmptyObject(payload))
      {
        setFormError("Please fill the required fields");
      }
    addUserRole();
    //localStorage.setItem("token", "23rasdfqwrwqerwqaerfq")
    //navigate("/")
  }

  const addUserRole = async () => {
    setLoading(true);   
    console.log("======addUserRole==Start=====");
    const res = await postData(APIS.ADDUSERROLE,payload);
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
            showToast("Role created successfully!",ToastMessageType.Success);      
            setTimeout(()=>{
              window.location.reload(false);
              }, 1000);      
            clearTimeout(timer);
            formRef.current.reset();
          }
        //setPayload((_payload) => ({ ..._payload, ["role_ID"]: '' }))
        //setPayload((_payload) => ({ ..._payload, ["role_Name"]: '' }))
       
        //navigate("/");
      }
      else
      {
        setLoading(false);
        setFormError("Sorry, something went wrong there. Try again.");
      }
    //isObject(res) && props.LoginUserDetails({ userInfo: res })
  }

  const resetForm = () => {
    console.log("====resetForm======")
    setPayload(null);
    setPayload(apiRequestData);
    setPayload((_payload) => ({ ..._payload, ["role_ID"]: '' }))
    setPayload((_payload) => ({ ..._payload, ["role_Name"]: '' }))
    //setPayload({ ...payload, apiRequestData });
    console.log("====setPayload======",payload);
  };

  const timer = setTimeout(() => {   
    setLoading(false);
  }, 1000); // Hide spinner after 3 seconds

  return (
    <Container style={{marginLeft:'55px' , marginTop:'20px', maxWidth:'95%', width:'100%'}}>
    <header>
  <h1 className="page-title1">Roles Add</h1>
  <nav>
    <a href="/">Home</a> /
    <a href="/">Administration</a> / 
    &nbsp;<label> Roles</label> 
  </nav>
</header>
       {formError && (<div className="error-message">{formError}</div>)}  
      <Container className="px-4 py-3 my-2 center">
        {/* <h2 className="text-center p-3" >Add Role</h2> */}
        <div className="text-center">
          {/* <span className="error">{isDuplicate?'Email ID already exists to some other user.':''}</span> */}
        </div>
        <div></div>
        <Form ref={formRef}>
          <div className="col-md-5 offset-md-2">
            <div className="col-md-12">
              <Form.Group >
                <Form.Label>
                 Role ID <span className="error">*</span>
                </Form.Label>
                <Form.Control
                  className="w-50 text-uppercase"
                  type="text"
                  maxLength={2}                  
                 // value={formData.RoleID}
                  onChange={handleChange}
                  id="role_ID"
                  name="role_ID"
                  
                />
                {/* <span className="error">{errors.name}</span> */}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid role id.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group >
                <Form.Label>
                  Role Name <span className="error">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="uppercase-input"
                  //value={formData.RoleName}
                  onChange={handleChange}
                  id="role_Name"
                  name="role_Name"
                />
                {/* <span className="error">{errors.outletname}</span> */}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Role Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group >
                <Form.Check
                  className="ml1"
                  aria-label="option 1"
                  label="Practice Admin"
                  id="prac_Admin_Assignable"
                  name ="prac_Admin_Assignable"
                  onChange={handleChecked}
                />
              </Form.Group>
            </div>
          </div>
          <br></br>
          <div className="col-md-10 offset-md-1">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th width='45%'></th>
                 
                  <th>View</th>
                  <th>submit</th>
                  <th>Reports</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td>Membership</td>
                  
                  <td key="memb_View" >
                  <Form.Group >
                    <Checkbox                     
                      aria-label="option 1"                      
                      id="memb_View"
                      name ="memb_View"                     
                      onChange={handleChecked}
                    />
                 </Form.Group>
                  </td>
                  <td key="memb_Submit" >
                  <Form.Group >
                    <Checkbox                    
                      aria-label="option 1"                      
                      id="memb_Submit"
                      name ="memb_Submit"
                      onChange={handleChecked}
                    />
                 </Form.Group>
                  </td>
                  <td key="memb_Reports" >
                  <Form.Group >
                    <Checkbox                    
                      aria-label="option 1"                      
                      id="memb_Reports"
                      name ="memb_Reports"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>Utilization management</td>
                 
                  <td key="auth_View" >
                  <Form.Group >
                    <Checkbox                    
                      aria-label="option 1"                      
                      id="auth_View"
                      name ="auth_View"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                  <td key="auth_Submit"  >
                  <Form.Group >
                    <Checkbox                    
                      aria-label="option 1"                      
                      id="auth_Submit"
                      name ="auth_Submit"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                  <td key="auth_Reports"  >
                  <Form.Group >
                    <Checkbox                    
                      aria-label="option 1"                      
                      id="auth_Reports"
                      name ="auth_Reports"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                </tr>

                <tr>
                  <td>Claims</td>
                  
                  <td key="claim_View" >
                  <Form.Group >
                    <Checkbox                    
                      aria-label="option 1"                      
                      id="claim_View"
                      name ="claim_View"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                  <td key="claim_Submit" >
                  <Form.Group >
                    <Checkbox                 
                      aria-label="option 1"                      
                      id="claim_Submit"
                      name ="claim_Submit"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                  <td key="claim_Reports" >
                  <Form.Group >
                    <Checkbox                   
                      aria-label="option 1"                      
                      id="claim_Reports"
                      name ="claim_Reports"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>Providers</td>
                 
                  <td key="prov_View" >
                  <Form.Group >
                    <Checkbox                      
                      aria-label="option 1"                      
                      id="prov_View"
                      name ="prov_View"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                  <td key="prov_Submit" >
                  <Form.Group >
                    <Checkbox                  
                      aria-label="option 1"                      
                      id="prov_Submit"
                      name ="prov_Submit"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                  <td key="prov_Reports" >
                  <Form.Group >
                    <Checkbox                   
                      aria-label="option 1"                      
                      id="prov_Reports"
                      name ="prov_Reports"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                </tr>
                <tr>
                  <td>Finance</td>
                 
                  <td key="fin_View" >
                  <Form.Group >
                    <Checkbox                     
                      aria-label="option 1"                      
                      id="fin_View"
                      name ="fin_View"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                  <td></td>
                  <td key="fin_Reports" >
                  <Form.Group >
                    <Checkbox                   
                      aria-label="option 1"                      
                      id="fin_Reports"
                      name ="fin_Reports"
                      onChange={handleChecked}
                    />
                     </Form.Group>
                  </td>
                </tr>
              </tbody>
            </Table>
            <br></br>
            <Button className="my-3" type="button" onClick={handleClick}  disabled={loading}>
            {loading ? (
                <Spinner animation="border" role="status" size="sm">          
                </Spinner>
              ):null}
              Create Role
            </Button>
          </div>
          <ToastContainer/>
        </Form>
       
      </Container>
    </Container>
  )
}

export default Roles
