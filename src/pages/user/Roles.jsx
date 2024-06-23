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
import Grid from '@mui/material/Grid';
import "bootstrap/dist/css/bootstrap.min.css"




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
    console.log(payload.role_Name);
    
    if(isEmptyObject(payload))
      {
        
        setFormError("Please fill the required fields");
      }
      if(payload.role_ID=="")
        {
          showToast("Enter role id", ToastMessageType.Error);   
          return true;
        }
        if(payload.role_Name=="")
          {
            showToast("Enter role name ", ToastMessageType.Error);   
            return true;
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
      <Container className=" ">
        {/* <h2 className="text-center p-3" >Add Role</h2> */}
        <div className="text-center">
          {/* <span className="error">{isDuplicate?'Email ID already exists to some other user.':''}</span> */}
        </div>
        <div></div>
        <Form ref={formRef} style={{ marginTop:'20px'}}>
        <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5}>
          <div className="col-md-10">
            <div className="row">
            <div className="col-md-4">
              <Form.Group  >               
              <Form.Label>
                  Role Id <span className="error">*</span>
                </Form.Label>       
                 {/* <label style={{marginLeft:'5px', paddingBottom:'5px'}}>Role ID <span className="error">*</span></label>  */}
                <input  className="input-line-style uppercase-input" maxLength={2}  placeholder="Enter Role ID" type="text" name="role_ID" id="role_ID" onChange={handleChange} />
                {/* <span className="error">{errors.name}</span> */}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid role id.
                </Form.Control.Feedback>
              </Form.Group>
              </div>
              <div className="col-md-4">
              <Form.Group >
                <Form.Label>
                  Role Name <span className="error">*</span>
                </Form.Label>                
                 <input  className="input-line-style uppercase-input"   placeholder="Enter Role Name" type="text" name="role_Name" id="role_Name" onChange={handleChange} />
                {/* <span className="error">{errors.outletname}</span> */}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Role Name.
                </Form.Control.Feedback>
              </Form.Group>
              </div>
              <div className="col-md-4">
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
          <br></br>
          </div>
          
          <div className="col-md-10">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th width='35%'></th>
                 
                  <th>View</th>
                  <th>Submit</th>
                  <th>Reports</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td style={{textAlign:'left'}}>Membership</td>
                  
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
                  <td style={{textAlign:'left'}}>Utilization management</td>
                 
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
                  <td style={{textAlign:'left'}}>Claims</td>
                  
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
                  <td style={{textAlign:'left'}}>Providers</td>
                 
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
                  <td style={{textAlign:'left'}}>Finance</td>
                 
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
            <Grid container rowSpacing={10}  columnSpacing={{ xs: 1, sm: 2, md: 4 }} paddingBottom={5} >
            <Grid item xs={12} className="grid-container" >
            <Button className="login-btn" style={{  mt: 3, mb: 2, backgroundColor:'#084c81',textTransform:'none',color:'white', fontWeight:'bold', fontSize:'15px', width:'30%'}} type="button" onClick={handleClick}  disabled={loading}>
            {loading ? (
                <Spinner animation="border" role="status" size="sm">          
                </Spinner>
              ):null}
              Create Role
            </Button>
            </Grid>
          </Grid>
          </div>
          <ToastContainer/>
          
          </Grid>
        </Form>
       
      </Container>
    </Container>
  )
}

export default Roles
