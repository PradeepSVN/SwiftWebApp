export const DynamicHeader =(roleData) => {
    console.log("==role data=",roleData);
   let header = [  { type:'button', path: 'Home', title: 'Home', isActive:true }];
   let menuItems = [];
   let subMenuItems = [];
   let button =  { type:'button', path: '', title: '', isActive:true };
   
   if(roleData["memb_View"] || roleData["memb_Submit"] || roleData["memb_Reports"])
    {
        let membershipDropdown = { type:'DropdownButton', path: 'Membership', title: '', isActive:false, isMenu:true, menuItems: menuItems };
        membershipDropdown.title = "Membership";
        membershipDropdown.path = "Membership";
        menuItems = [];
        subMenuItems = [];
        if(roleData["memb_View"])
            {
              menuItems.push({name:'Member List',path:'MemberList'})
            }
        if(roleData["memb_Submit"])
            {
               //menuItems.push({name:'Add Member',path:'AddUser'})
            }
        // if(roleData["memb_Submit"])
        //     {
        //         menuItems.push({name:'memb_Submit'})
        //     }
            membershipDropdown.menuItems = menuItems;
            header.push(membershipDropdown);
    }

    let adminDropdown = { type:'NestedMenu', path: 'Administration', title: 'Administration', isActive:false, isMenu:false, menuItems: menuItems };
    menuItems = [];
    let adminSubMenuItems = [];
    adminSubMenuItems.push({name:'User List',path: 'UserMaintenance',isSubmenu:true})
    adminSubMenuItems.push({name:'Single User',path: 'AddUser',isSubmenu:true})
    adminSubMenuItems.push({name:'Batch Add',path: 'BatchAdd',isSubmenu:true})
    adminSubMenuItems.push({name:'Roles',path: 'UserRoles',isSubmenu:true})
    menuItems.push({name:'User Management',isSubmenu:true, subMenuItems:adminSubMenuItems});
    adminDropdown.menuItems = menuItems;           
    header.push(adminDropdown);

    if(roleData["prov_View"] || roleData["prov_Submit"] || roleData["prov_Reports"])
        {
           
            let providerDropdown = { type:'DropdownButton', path: 'Provider', title: 'Provider', isActive:false, isMenu:true, menuItems: menuItems };
            let provSubMenuItems = [];
            menuItems = [];
            if(roleData["prov_View"])
                {
                    menuItems.push({name:'Provider List',path:'ProviderList'})
                }
            if(roleData["prov_Submit"])
                {
                    menuItems.push({name:'Add Provider',path:'AddProvider'})
                }
            // if(roleData["prov_Reports"])
            //     {
            //         menuItems.push({name:'prov_Reports'})
            //     }
            providerDropdown.menuItems = menuItems;
               
            header.push(providerDropdown); 
        }

   /* if(roleData["auth_View"] || roleData["auth_Submit"] || roleData["auth_Reports"] || roleData["prov_View"] || roleData["prov_Submit"] || roleData["prov_Reports"])
        {
            let authDropdown = { type:'NestedMenu', path: 'UtilizationManagement', title: '', isActive:false,isMenu:false, menuItems: menuItems };
 
            authDropdown.title = "Utilization Management";
            authDropdown.path = "UtilizationManagement";
            menuItems = [];
            let authSubMenuItems = [];
           
            if(roleData["auth_View"])
            {
                authSubMenuItems.push({name:'Author List',path: '', isSubmenu:true})
            }
            if(roleData["auth_Submit"])
            {
                authSubMenuItems.push({name:'Author Submit',path: '',isSubmenu:true})
            }
            if(roleData["auth_Reports"])
            {
                authSubMenuItems.push({name:'Author Display',path: '',isSubmenu:true})
            }
            menuItems.push({name:'Author',isSubmenu:true, subMenuItems:authSubMenuItems})

            if(roleData["prov_View"] || roleData["prov_Submit"] || roleData["prov_Reports"])
            {
               
                
                let provSubMenuItems = [];
                if(roleData["prov_View"])
                    {
                        provSubMenuItems.push({name:'Provider List'})
                    }
                if(roleData["prov_Submit"])
                    {
                        provSubMenuItems.push({name:'Add Provider'})
                    }
                // if(roleData["prov_Reports"])
                //     {
                //         menuItems.push({name:'prov_Reports'})
                //     }
                menuItems.push({name:'Provider',isSubmenu:true, subMenuItems:provSubMenuItems})
                   
                   
            }


            authDropdown.menuItems = menuItems;           
            header.push(authDropdown);
        } */      

    if(roleData["claim_View"] || roleData["claim_Submit"] || roleData["claim_Reports"])
        {
            let claimDropdown = { type:'DropdownButton', path: 'Claims', title: '', isActive:false,isMenu:true, menuItems: menuItems };
            claimDropdown.title = "Claims";
            claimDropdown.path = "Claims";
            menuItems = [];
            /*if(roleData["claim_View"])
                {
                    menuItems.push({name:'claim_View'})
                }
            if(roleData["claim_Submit"])
                {
                    menuItems.push({name:'claim_Submit'})
                }
            if(roleData["claim_Reports"])
                {
                    menuItems.push({name:'claim_Reports'})
                }*/
                claimDropdown.menuItems = menuItems;
                header.push(claimDropdown);
        }

  

        /*if(roleData["fin_View"]  || roleData["fin_Reports"])
            {
                let finDropdown = { type:'DropdownButton', path: '', title: '', isActive:false, menuItems: menuItems };
                finDropdown.title = "fin_View";
                finDropdown.path = "fin_View";
                menuItems = [];
                if(roleData["fin_View"])
                    {
                        menuItems.push({name:'fin_View'})
                    }
               
                if(roleData["fin_Reports"])
                    {
                        menuItems.push({name:'fin_Reports'})
                    }
                    finDropdown.menuItems = menuItems;
                    header.push(finDropdown);
            }*/
    console.log("===header===",header);
    return header;
}


/*
"role_UID": "a4c1942f-eb0c-4f31-8cf3-a582bf779d02",
      "role_ID": "OA",
      "role_Name": "Office Admin",
      "role_Type": 1,
      "prac_Admin_Assignable": true,
      "memb_View": true,
      "memb_Submit": true,
      "memb_Reports": true,
      "auth_View": true,
      "auth_Submit": true,
      "auth_Reports": true,
      "claim_View": true,
      "claim_Submit": true,
      "claim_Reports": true,
      "prov_View": true,
      "prov_Submit": true,
      "prov_Reports": true,
      "fin_View": true,
      "fin_Reports": true,
      "created_By_User_UID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "created_Date": "2024-05-25T10:19:47.973",
      "updated_By_User_UID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "updated_Date": "2024-05-25T10:19:47.973"

*/