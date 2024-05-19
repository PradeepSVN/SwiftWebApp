export const APIS = {
  BASEURL:process.env.REACT_APP_API_URL, //http://localhost:5099/swagger/index.html
  LOGIN: "Login/Login",
  ADDUSERROLE: "Role/AddRole",
  GETUSERROLE:"Role/GetAllRoleDetails",
  GETALLENTITIES:"Master/GetEntityDetails",
  GETTINBYENTITYID:"Master/GetTinDetails",
  ADDUSER:"User/AddUser",
  USER: "Admin/GetUser",
  CLIENT_LIST: "Admin/GetClientList",
  CREATE_CLIENT: "Admin/CreateClient",
  RESET_PASSWORD: "Public/ResetPassword",
  USERS_LIST: "Admin/GetUserList",
  DELETE_USER: "Admin/DeleteUser",
  GET_ROLES: "Admin/GetRoles",  
}
