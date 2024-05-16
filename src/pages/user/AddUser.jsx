import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Container } from "react-bootstrap"
import "../../styles/AddUser.css"

const AddUser = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    //onSubmit(username, password);
  }

  const changeAuthMode = () => {
    //setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  return (
    <div className="justify-content-center align-items-center vh-100">
      <Container className="px-4 py-3 my-2 center">
        {/* <h2 className="text-center p-3" >Add Single User</h2> */}
        <div className="text-center">
          {/* <span className="error">{isDuplicate?'Email ID already exists to some other user.':''}</span> */}
        </div>
        <div></div>
        <Form onSubmit={handleSubmit}>
          <div style={{ display: "flex" }}>
            <div className="col-md-5 offset-md-2">
              <div className="col-md-12">
                <Form.Group controlId="UserName">
                  <Form.Label>
                    User Name <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="text"
                    // value={formData.UserName}
                    // onChange={handleChange}
                    name="UserName"
                  />
                  {/* <span className="error">{errors.name}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>
                    Password <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="password"
                    // value={formData.Password}
                    // onChange={handleChange}
                    name="Password"
                  />
                  {/* <span className="error">{errors.password}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label>
                    Confirm Password <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="password"
                    //value={formData.confirmPassword}
                    //onChange={handleChange}
                    //onBlur={checkValidation}
                    name="confirmPassword"
                  />
                  {/* <span className="error">{errors.confirmPassword}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid confirm password.
                  </Form.Control.Feedback>
                </Form.Group>
                <div style={{ display: "flex" }}>
                  <Form.Group controlId="firstName">
                    <Form.Label>
                      First Name <span className="error">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      //value={formData.firstName}
                      // onChange={handleChange}
                      name="firstName"
                    />
                    {/* <span className="error">{errors.outletname}</span> */}
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid firstName.
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
                <Form.Group controlId="lastName">
                  <Form.Label>
                    Last Name <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="text"
                    //value={formData.firstName}
                    // onChange={handleChange}
                    name="lastName"
                  />
                  {/* <span className="error">{errors.outletname}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid lastName.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="title">
                  <Form.Label>
                    Titil <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="text"
                    //value={formData.firstName}
                    // onChange={handleChange}
                    name="titil"
                  />
                  {/* <span className="error">{errors.outletname}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid titil.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>
                    Email <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="email"
                    // value={formData.Email}
                    // onChange={handleChange}
                    name="Email"
                  />
                  {/* <span className="error">{errors.email}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <div style={{ display: "flex" }}>
                  <Form.Group controlId="Phone">
                    <Form.Label>
                      Phone <span className="error">*</span>
                    </Form.Label>
                    <Form.Control
                      className="w-97"
                      type="number"
                      //value={formData.MobileNumber}
                      //onChange={handleChange}
                      name="Phone"
                    />
                    {/* <span className="error">{errors.mobile}</span> */}
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid phone.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="Extn" className="ml3">
                    <Form.Label>
                      Extn <span className="error">*</span>
                    </Form.Label>
                    <Form.Control
                      className="w-50"
                      type="number"
                      //value={formData.MobileNumber}
                      //onChange={handleChange}
                      name="Extn"
                    />
                    {/* <span className="error">{errors.mobile}</span> */}
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Extn.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <Form.Group controlId="Fax">
                  <Form.Label>
                    Fax <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="text"
                    //value={formData.firstName}
                    // onChange={handleChange}
                    name="Fax"
                  />
                  {/* <span className="error">{errors.outletname}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid fax.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="AssginedRole">
                  <Form.Label>
                    Assgined Role <span className="error">*</span>
                  </Form.Label>
                  <Form.Select
                    className="w-50"
                    aria-label="Default select example"
                  >
                    <option>Open this select Role</option>
                    <option value="1">PA </option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="Note">
                  <Form.Label>
                    Note <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    name="Note"
                    as="textarea"
                    // value={formData.Address}
                    // onChange={handleChange}
                    rows={2}
                  />
                  {/* <span className="error">{errors.address}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid note.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className=" mx-auto w-50">
                  <Button className="my-3 w-50" type="submit">
                    Create User
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-12">
                <div style={{ display: "flex" }}>
                  <Form.Group controlId="Active">
                    <Form.Check
                      className="mr-2"
                      aria-label="option 1"
                      label="Active"
                    />
                  </Form.Group>
                  <Form.Group controlId="Disaible">
                    <Form.Check
                      className="ml"
                      aria-label="option 1"
                      label="Disaible"
                    />
                  </Form.Group>
                </div>
                <div style={{ display: "flex" }}>
                  <Form.Group controlId="Terminated">
                    <Form.Check aria-label="option 1" label="Terminated" />
                  </Form.Group>
                  <Form.Group controlId="date">
                    <Form.Control
                      className="w-50 ml2"
                      type="text"
                      //value={formData.firstName}
                      // onChange={handleChange}
                      name="date"
                    />
                    {/* <span className="error">{errors.outletname}</span> */}
                  </Form.Group>
                </div>
                <Form.Group controlId="cpass">
                  <Form.Check
                    aria-label="option 1"
                    label="Change Password on Login"
                  />
                </Form.Group>
                <Form.Group controlId="AssignedEntities">
                  <Form.Label>
                    Assigned Entities <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="text"
                    //value={formData.firstName}
                    // onChange={handleChange}
                    name="AssignedEntities"
                  />
                  {/* <span className="error">{errors.outletname}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid AssignedEntities.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <div className=" mx-auto w-50">
                    <Button className="my-3 w-40">Add Entities</Button>
                  </div>
                </Form.Group>
                <Form.Group controlId="AssignedTins">
                  <Form.Label>
                    Assigned Tins <span className="error">*</span>
                  </Form.Label>
                  <Form.Control
                    className="w-50"
                    type="text"
                    //value={formData.firstName}
                    // onChange={handleChange}
                    name="AssignedTins"
                  />
                  {/* <span className="error">{errors.outletname}</span> */}
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid AssignedTins.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className=" mx-auto w-50">
                  <Button className="my-3 w-40">Add Tins</Button>
                </div>
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