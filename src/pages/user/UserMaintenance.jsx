import React from "react"
import Table from "react-bootstrap/Table"
import { Container } from "react-bootstrap"

const UserMaintenance = () => {
  return (
    <div className="justify-content-center align-items-center vh-100">
      <Container className="px-4 py-3 my-2 center">
        <div className="col-md-10 offset-md-1">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Title</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Practice Admin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bready</td>
                <td>Bhaskar</td>
                <td>Breddy</td>
                <td>Manager</td>
                <td>b@red.com</td>
                <td>9095551234</td>
                <td>AUTH VIEW</td>
                <td>jsmith</td>
              </tr>
              <tr>
                <td>Scordojo</td>
                <td>Sunil</td>
                <td>Cardozo</td>
                <td>Nurse</td>
                <td>s@car.com</td>
                <td>6305551234</td>
                <td>AUTH SUB</td>
                <td>jsmith</td>
              </tr>

              <tr>
                <td>Jsmith</td>
                <td>John</td>
                <td>Smith</td>
                <td>Admin</td>
                <td>j@smith.com</td>
                <td>5551112346</td>
                <td>ALL ACCESS</td>
                <td>John</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  )
}

export default UserMaintenance
