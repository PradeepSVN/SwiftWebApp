export const APIS = {
  BASEURL:process.env.REACT_APP_API_URL, //http://localhost:5099/swagger/index.html
  LOGIN: "Login/Login",
  RESETPASSWORD:"Login/ChangePassword",
  ADDUSERROLE: "Role/AddRole",
  GETUSERROLE:"Role/EditRoleDetails",
  GETROLES:"Role/GetAllRoleDetails",
  GETUSERLIST:"User/GetAllUserDetails",
  GETALLUSERDETAILSBYSEARCH:"User/GetAllUserDetailsBySearch",
  GETUSERENTITIES:"User/GetUserEntityDetails",
  GETUSERTINDETAILS:"User/GetUserTinDetails",
  GETUSERDETAILS:"User/EditUserDetails",
  GETALLENTITIES:"Master/GetEntityDetails",
  GETTINBYENTITYID:"Master/GetTinDetails",
  ADDUSER:"User/AddUser",
  EDITUSER:"User/EditUserDetails",
  USER: "Admin/GetUser",
  CLIENT_LIST: "Admin/GetClientList",
  CREATE_CLIENT: "Admin/CreateClient",
  RESET_PASSWORD: "Public/ResetPassword",
  USERS_LIST: "Admin/GetUserList",
  DELETE_USER: "Admin/DeleteUser",
  GET_ROLES: "Admin/GetRoles",  
  GETMEMBERS:"Member/GetAllMemberDetailsBySearch",
  GETMEMBERINFO:"Member/EditMemberDetails",
  GETPROVIDERS:"Provider/GetAllProviderDetailsBySearch",
  GETPROVIDERINFO:"Provider/ViewProviderDetails",
  GETPROVIDERINSURANCELISTBYENTITYID:"Provider/GetProviderInsuranceList",
  GETPROVIDERTINBYENTITYID:"Provider/GetProviderTinList"
}

export const APIMESSAGES = {
  USERCREATRED:"User created successfully!",
  ROLECREATED:"Role created successfully!",
  RESETPASSWORD:"Your password has been reset successfully!",
  ERROR:"SomSomething went wrong. Please try again."
}
