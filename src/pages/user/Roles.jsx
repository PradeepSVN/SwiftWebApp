import React from "react"
import { Form, Button, Container, Table } from "react-bootstrap"
import { BsCheckCircle } from "react-icons/bs"
import "../../styles/UserRole.css"

const Roles = () => {
  const handleSubmit = event => {
    event.preventDefault()
    //onSubmit(username, password);
  }

  return (
    <div className="justify-content-center align-items-center vh-100">
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
                  User Name <span className="error">*</span>
                </Form.Label>
                <Form.Control
                  className="w-50"
                  type="text"
                  // value={formData.RoleID}
                  // onChange={handleChange}
                  name="RoleID"
                />
                {/* <span className="error">{errors.name}</span> */}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="RoleName">
                <Form.Label>
                  RoleName <span className="error">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  //value={formData.RoleName}
                  // onChange={handleChange}
                  name="RoleName"
                />
                {/* <span className="error">{errors.outletname}</span> */}
                <Form.Control.Feedback type="invalid">
                  Please provide a valid RoleName.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="PracticeAdmin">
                <Form.Check
                  className="ml1"
                  aria-label="option 1"
                  label="Practice Admin"
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
            <Button className="my-3" type="submit">
              Create Role
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default Roles
