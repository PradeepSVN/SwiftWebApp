import { useState,React,useEffect,useRef  } from "react"
import { Form, Button, Container, Table } from "react-bootstrap"
import { BsCheckCircle } from "react-icons/bs"
import "../../styles/UserRole.css"
// import "../../global.css";
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {APIS} from '../../utils/apiList';
import {postData} from '../../services/rest-services';
import {isEmptyObject} from '../../utils/utils';
import { apiRequestData } from "../../utils/apiRequestData";
import { LocalStorageKey } from "../../utils/constants";


const Roles = () => {
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
    setPayload((_payload) => ({ ..._payload, [target.id]: target.value }))
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
    clearTimeout(timer);
    console.log("======addUserRole==Start=====");
    const res = await postData(APIS.ADDUSERROLE,payload);
    console.log("======res=======",res);
    if(res)
      {
        alert("User role is created successfully")
        setLoading(false);
        //setPayload((_payload) => ({ ..._payload, ["role_ID"]: '' }))
        //setPayload((_payload) => ({ ..._payload, ["role_Name"]: '' }))
        formRef.current.reset();
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
  }, 4000); // Hide spinner after 3 seconds

  return (
    <div className="justify-content-center align-items-center vh-100">
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
                  className="w-50"
                  type="text"
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
                  <th></th>
                  <th>Selective</th>
                  <th>View</th>
                  <th>submit</th>
                  <th>Reports</th>
                </tr>
              </thead>
              <tbody>
                <tr className='table-row'>
                  <td>Membership</td>
                  <td></td>
                  <td key="memb_View" onClick={() => handleRowClick("memb_View")}>
                  {payload["memb_View"]?<BsCheckCircle />:null} 
                  </td>
                  <td key="memb_Submit" onClick={() => handleRowClick("memb_Submit")}>
                  {payload["memb_Submit"]?<BsCheckCircle />:null} 
                  </td>
                  <td key="memb_Reports" onClick={() => handleRowClick("memb_Reports")}>
                  {payload["memb_Reports"]?<BsCheckCircle />:null} 
                  </td>
                </tr>
                <tr className='table-row'>
                  <td>Utilization management</td>
                  <td></td>
                  <td key="auth_View" onClick={() => handleRowClick("auth_View")} className='table-td'>
                  {payload["auth_View"]?<BsCheckCircle />:null} 
                  </td>
                  <td key="auth_Submit" onClick={() => handleRowClick("auth_Submit")} className='table-td'>
                  {payload["auth_Submit"]?<BsCheckCircle />:null} 
                  </td>
                  <td key="auth_Reports" onClick={() => handleRowClick("auth_Reports")} className='table-td'>
                  {payload["auth_Reports"]?<BsCheckCircle />:null} 
                  </td>
                </tr>

                <tr>
                  <td>Claims</td>
                  <td></td>
                  <td key="claim_View" onClick={() => handleRowClick("claim_View")}>
                  {payload["claim_View"]?<BsCheckCircle />:null} 
                  </td>
                  <td key="claim_Submit" onClick={() => handleRowClick("claim_Submit")}>
                  {payload["claim_Submit"]?<BsCheckCircle />:null} 
                  </td>
                  <td key="claim_Reports" onClick={() => handleRowClick("claim_Reports")}>
                  {payload["claim_Reports"]?<BsCheckCircle />:null} 
                  </td>
                </tr>
                <tr>
                  <td>Providers</td>
                  <td></td>
                  <td key="prov_View" onClick={() => handleRowClick("prov_View")}>
                  {payload["prov_View"]?<BsCheckCircle />:null} 
                  </td>
                  <td key="prov_Submit" onClick={() => handleRowClick("prov_Submit")}>
                  {payload["prov_Submit"]?<BsCheckCircle />:null} 
                  </td>
                  <td key="prov_Reports" onClick={() => handleRowClick("prov_Reports")}>
                  {payload["prov_Reports"]?<BsCheckCircle />:null} 
                  </td>
                </tr>
                <tr>
                  <td>Finance</td>
                  <td></td>
                  <td key="fin_View" onClick={() => handleRowClick("fin_View")}>
                  {payload["fin_View"]?<BsCheckCircle />:null} 
                  </td>
                  <td></td>
                  <td key="fin_Reports" onClick={() => handleRowClick("fin_Reports")}>
                  {payload["fin_Reports"]?<BsCheckCircle />:null} 
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
        </Form>
      </Container>
    </div>
  )
}

export default Roles
