

export const apiRequestData = {
    memb_View: false,
    memb_Submit: false,
    memb_Reports: false,
    auth_View: false,
    auth_Submit: false,
    auth_Reports: false,
    claim_View: false,
    claim_Submit: false,
    claim_Reports: false,
    prov_View: false,
    prov_Submit: false,
    prov_Reports: false,
    fin_View: false,
    fin_Reports: false, 
    created_By_User_UID:"34D1E1FB-5DC7-49B4-A2D1-351638909C93", role_ID: "", role_Name: "", prac_Admin_Assignable:false,role_Type:0
  }

  export const addUserAPIRequestData={
    user_Prac_Admin:false,
    user_Change_Password:false,
    user_Temp_Disable:false,
    user_Active:false,
    user_Terminated:false,
    role_UID:'',
    user_Note:'',
    user_Fax:'',
    user_Phone_Extn:'',
    user_Phone:'',
    user_UserName:'',
    user_First_Name:'',
    user_Last_Name:'',
    user_Title:'',
    user_Terminated_Date:'',
    entities:'',
    tiNs:'',
    user_Password :'qw4r#@$$',
    created_By_User_UID:''
    }

    export const userListAPIResponse =
      {
        user_UID: "245e0acc-a5af-4d97-ab65-1df54a7bedc1",
        user_ID: 1007,
        user_Prac_Admin: false,
        user_First_Name: "raj",
        user_Last_Name: "kumar",
        user_Title: "admin",
        user_Email: "laxmankumar929@gmail.com",
        user_Phone: "7465774566",
        user_Phone_Extn: "65",
        user_Fax: "4365345",
        user_Active: true,
        user_Temp_Disable: true,
        user_Change_Password: true,
        created_By_User_UID: "7d2d927c-4288-42d8-85ec-e5a256ba26e8",
        created_Date: "2024-05-20T11:45:36.307",
        updated_By_User_UID: "7d2d927c-4288-42d8-85ec-e5a256ba26e8",
        updated_Date: "2024-05-20T11:45:36.307",
        user_Password_Changed_Date: "2024-05-20T11:45:36.307",
        user_Note: "test note",
        user_UserName: "user_0098",
        user_Password: "EHH+yzhQdEFNyh/OmhUkYg==",
        user_Terminated: true,
        user_Terminated_Date: "2024-05-16T00:00:00",
        role_UID: "00000000-0000-0000-0000-000000000000",
        entities: null,
        tiNs: null
      }
    

    export const apiResponseObject={
      statusCode: 200,
      message: "Login Success",
      result: {},
      exceptionMessage: "Success"
    }

  export const searchRequestObject = {    
      user_UserName: "",
      user_First_Name: "",
      user_Last_Name: "",
      role: "",
      user_Prac_Admin: "",
      user_Active: "",
      user_Entities: "",
      user_Tins: ""
    
  }

  export const addUserRequiredData = [
        {user_First_Name: "Please enter first name"},
        {user_Last_Name: "Please enter last name"},
        {user_Title: "Please enter title"},
        {user_Email: "Please enter email"},
        {user_Phone: "Please enter phone"},
        {user_Phone_Extn: "Please enter extension"},
        {user_Fax: "Please enter fax"},
        {user_Note: "Please enter note"},
        {user_UserName: "Please enter username"},
        {role_UID:"Please select role"}
  ]


