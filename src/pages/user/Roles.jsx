import { useState,React,useEffect } from "react"
import { Form, Button, Container, Table } from "react-bootstrap"
import { BsCheckCircle } from "react-icons/bs"
import "../../styles/UserRole.css"
import "../../global.css";
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import {APIS} from '../../utils/apiList';
import {postData} from '../../services/rest-services';
import {isEmptyObject} from '../../utils/utils';

const Roles = () => {
  const [payload, setPayload] = useState({ role_ID: "", role_Name: "", prac_Admin_Assignable:false,role_Type:0})
  const [formError, setFormError] = useState("")
  const [loading, setLoading] = useState(false);
  const handleSubmit = event => {
    event.preventDefault()
    //onSubmit(username, password);
  }

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

  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault();
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
       
        //navigate("/");
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
       {formError && (<div className="error-message">{formError}</div>)}  
      <Container className="px-4 py-3 my-2 center">
        {/* <h2 className="text-center p-3" >Add Role</h2> */}
        <div className="text-center">
          {/* <span className="error">{isDuplicate?'Email ID already exists to some other user.':''}</span> */}
        </div>
        <div></div>
        <Form onSubmit={handleSubmit}>
          <div className="col-md-5 offset-md-2">
            <div className="col-md-12">
              <Form.Group controlId="RoleID">
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

              <Form.Group controlId="RoleName">
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
              <Form.Group controlId="PracticeAdmin">
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
                <tr>
                  <td>Membership</td>
                  <td></td>
                  <td>
                    <BsCheckCircle />
                  </td>
                  <td>
                    <BsCheckCircle />
                  </td>
                  <td>
                    <BsCheckCircle />
                  </td>
                </tr>
                <tr>
                  <td>Utilization management</td>
                  <td></td>
                  <td>
                    <BsCheckCircle />
                  </td>
                  <td>
                    <BsCheckCircle />
                  </td>
                  <td>
                    <BsCheckCircle />
                  </td>
                </tr>

                <tr>
                  <td>Claims</td>
                  <td></td>
                  <td>
                    <BsCheckCircle />
                  </td>
                  <td>
                    <BsCheckCircle />
                  </td>
                  <td>
                    <BsCheckCircle />
                  </td>
                </tr>
                <tr>
                  <td>Providers</td>
                  <td></td>
                  <td>
                    <BsCheckCircle />
                  </td>
                  <td></td>
                  <td>
                    <BsCheckCircle />
                  </td>
                </tr>
                <tr>
                  <td>Finance</td>
                  <td></td>
                  <td>
                    <BsCheckCircle />
                  </td>
                  <td></td>
                  <td>
                    <BsCheckCircle />
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
