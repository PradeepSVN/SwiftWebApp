import { useState,React,useEffect } from "react"
import "./Login.css"
import "../../global.css";
import { useNavigate } from "react-router-dom"
import {APIS, APIMESSAGES} from '../../utils/apiList';
import { postData} from '../../services/rest-services';
import { clearLocalStorage } from "../../utils/utils"
import { Spinner } from "react-bootstrap";
import { LocalStorageKey } from "../../utils/constants";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logojpg from '../../assets/images/logo.png';
import { grey } from "@mui/material/colors";
import {showToast,ToastMessageType} from '../../utils/toastMessage';
import { ToastContainer, toast } from "react-toastify";
import Loader from '../../components/LoaderComponent'
import {isObject} from '../../utils/utils'
import {Form} from "react-bootstrap";
import ForogtPasswordDialog from "../../components/ForgotPasswordPopup";
import ResetPasswordDialog from "../../components/ResetPasswordPopup";





const Login = () => {
  const [alertMsgData, setAlertMsgData] = useState({variant:'success',message:'test data'})
  const [credentials, setCredentials] = useState({ username: "", password: ""})
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState({openDialog:false, showErrorMsg:false});
  const [forgotPasswordDialog, setForgotPasswordDialog] = useState({openDialog:false, showErrorMsg:false});
  const [userId, setUserId] = useState("");
  const passwordregx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  useEffect(() => {
    //console.log("===process env===",baseurl)
    //localStorage.removeItem("token")
    clearLocalStorage();
    
  }, [])



  const handleChange = (e) => {   
    const target = e.target
    setCredentials((cre) => ({ ...cre, [target.id]: target.value }))
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleClick(e);
    }
  };

  const navigate = useNavigate()

  const handleForgotPasswordClick = () =>{
    //event.preventDefault();
    setForgotPasswordDialog((popup) => ({ ...popup, ["openDialog"]: true}))
  }

  const handleResetPassword = (requestBody) =>{
    console.log("===payload--",requestBody);
    requestBody.user_UID = userId;
    if(!passwordregx.test(requestBody.password))
      {
        showToast("Password must be at least 8 characters long, contain a digit, a lowercase letter, an uppercase letter, and a special character",ToastMessageType.Error);
        setOpenPopup((popup) => ({ ...popup, ["showErrorMsg"]: true}))
        return;
      }

    if(requestBody.password != requestBody.confirmPassword)
      {
        showToast("Password and confirm password should be same",ToastMessageType.Error);
        return;
      }
    
      resetPasswordAPI(requestBody);
  }

  const handleCloseOpenPopup = () => {
    setOpenPopup((popup) => ({ ...popup, ["openDialog"]: false}))
  }

  const handleForgotPasswordCloseOpenPopup = () => {
    setForgotPasswordDialog((popup) => ({ ...popup, ["openDialog"]: false}))
 }

 const handleForgotPassword = (requestBody) =>{
  console.log("===payload--",requestBody);
 
  if(requestBody.email == "")
    {
      showToast("Please enter email address",ToastMessageType.Error);
      setOpenPopup((popup) => ({ ...popup, ["showErrorMsg"]: true}))
      return;
    }  
    forgotPasswordAPI(requestBody);
}

  const handleClick = (event) => {
    event.preventDefault();
    /*if(credentials.username == undefined || credentials.username == '' || credentials.username == null)
      {
        showToast("Please enter username", ToastMessageType.Error);
        return;
      }
    if(credentials.password == undefined || credentials.password == '' || credentials.password == null)
      {
        showToast("Please enter password", ToastMessageType.Error);
        return;
      }*/
    getUserInfo();
    //localStorage.setItem("token", "23rasdfqwrwqerwqaerfq")
    //navigate("/")
  }

  const resetPasswordAPI = async (resetPasswordPayload) => {   
   
    setLoading(true);
    console.log("======getUserInfo==Start=====");
    const res = await postData(APIS.RESETPASSWORD,resetPasswordPayload);
    console.log("======res=======",res);
    if(res &&  isObject(res.data)  && res.data.statusCode == 200)
      {
        setLoading(false);
        //setUserId(res.data.result.userid);
       // console.log("======res=======",res);
       // localStorage.setItem(LocalStorageKey.token, res.data.result.token); 
       // localStorage.setItem(LocalStorageKey.userId,res.data.result.userid);
        setOpenPopup((popup) => ({ ...popup, ["openDialog"]: false}))
        //setOpenPopup(true);  
        showToast(APIMESSAGES.RESETPASSWORD,ToastMessageType.Success);    
        //navigate("/");
      }
      else
      {

        setLoading(false);
        showToast(APIMESSAGES.ERROR,ToastMessageType.Error);
        // setOpenPopup(true);  
        //setLoginError("Invalid credentials");
      }
    //isObject(res) && props.LoginUserDetails({ userInfo: res })
  }

  const forgotPasswordAPI = async (forgotPasswordPayload) => {   
   
    setLoading(true);
    console.log("======getUserInfo==Start=====");
    const res = await postData(APIS.FORGOTPASSWORD,forgotPasswordPayload);
    console.log("======res=======",res);
    setLoading(false);
    if(res && res.data.status == "Failed")
      {
        showToast(res.data.message,ToastMessageType.Error);
      }
   else if(res &&  isObject(res.data)  && res.data.statusCode == 200)
      {
        
        //setUserId(res.data.result.userid);
       // console.log("======res=======",res);
       // localStorage.setItem(LocalStorageKey.token, res.data.result.token); 
       // localStorage.setItem(LocalStorageKey.userId,res.data.result.userid);
        setForgotPasswordDialog((popup) => ({ ...popup, ["openDialog"]: false}))
        //setOpenPopup(true);  
        showToast(APIMESSAGES.FORGOTPASSWORD,ToastMessageType.Success);    
        //navigate("/");
      }
      else
      {

        setLoading(false);
        showToast(APIMESSAGES.ERROR,ToastMessageType.Error);
        // setOpenPopup(true);  
        //setLoginError("Invalid credentials");
      }
    //isObject(res) && props.LoginUserDetails({ userInfo: res })
  }


  const getUserInfo = async () => {
    
    if(credentials.username == undefined || credentials.username == '' || credentials.username == null)
      {
        showToast("Please enter username", ToastMessageType.Error);
        return;
      }
    if(credentials.password == undefined || credentials.password == '' || credentials.password == null)
      {
        showToast("Please enter password", ToastMessageType.Error);
        return;
      }
    setLoading(true);
    console.log("======getUserInfo==Start=====");
    const res = await postData(APIS.LOGIN,credentials);
    console.log("======res=======",res);
    if(res &&  isObject(res.data) && isObject(res.data.result))
      {
        setLoading(false);
        console.log("======token=======",res.data.result.token);
        setUserId(res.data.result.userid);
        localStorage.setItem(LocalStorageKey.token, res.data.result.token); 
        localStorage.setItem(LocalStorageKey.userId,res.data.result.userid);
        if(!res.data.result.user_Change_Password)
          {
            setOpenPopup((popup) => ({ ...popup, ["openDialog"]: true}))
          }
          else
          {
              showToast("The user has logged in successfully.",ToastMessageType.Success);    
              navigate("/");
          }
      
        //showToast("The user has logged in successfully.",ToastMessageType.Success);    
        //navigate("/");
      }
      else
      {

        setLoading(false);
        showToast("Invalid credentials",ToastMessageType.Error);
        
        //setLoginError("Invalid credentials");
      }
    //isObject(res) && props.LoginUserDetails({ userInfo: res })
  }

  const timer = setTimeout(() => {
    setLoading(false);
  }, 14000); // Hide spinner after 3 seconds


 
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>

        <Grid container component="main" sx={{maxWidth:'100%', height:'100vh', overflowX: 'hidden' }}>
      <CssBaseline />
      {
        loading ? <div  className="page-center-loading"> <Loader size={55} color='#6E3177' margin='0 auto' /></div> : 
        <>
      <Grid  borderRadius={5}
        item
        justifyContent="center"
        alignItems="center"
        xs={false}
        sm={12}
        md={6}       
        style={{backgroundColor:'#d0e4fd'}}
      >
       
         <img src={logojpg}  className="img-margin" width={'67%'} height={220} style={{paddingLeft:'157px'}}></img> 
      
      </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper}  >
        <Box
          sx={{
            my: 8,
            mx: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center', 
            minWidth: {xs:'60%', md:'55%',sm:'55%'},  
            marginLeft: '190px', 
            alignItems: 'center', 
            maxWidth: {xs:'60%', md:'55%',sm:'55%'}, 
            // margin: {xs:'30px', md:'30px',sm:'40%'}, 
           
          }}
          className="login-box"
          spacing={10}
        >
        <Typography component="h1" variant="h4" className="login-header" color={'#084c81'} fontFamily={'DM Sans'}>
            Schedule your free yearly check up
          </Typography>
        <Typography variant="h6" fontFamily={'DM Sans'}>
          Log in to continue
        </Typography>
        
        <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField          
          label="User Name"
          type="text"
          value={credentials.username}
          autoComplete="current-password"
          variant="outlined" 
          margin="normal"
          fullWidth
          onChange={handleChange} id="username"
         style= {{ fontFamily:'DM Sans' }}      
          sx={{            
             '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '26px', // Custom border radius
                // backgroundColor:'#f2f2f2',
                            
              },
            },
          }}
        />
           <TextField          
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined" 
          margin="normal"
          fullWidth
          onChange={handleChange} id="password"
          onKeyDown={handleKeyDown}
          style= {{ fontFamily:'DM Sans' }}        
          sx={{            
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '26px', // Custom border radius
                // backgroundColor:'#f2f2f2',
                            
              },
            },
          }}
        />
           <Button variant="body2"  fontFamily={'DM Sans'}
           onClick={handleForgotPasswordClick}>
                  Forgot password?
                </Button>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="button"
              fullWidth
              variant="contained"
              className="login-btn"
              fontFamily={'DM Sans'}
              onClick={handleClick}
              disabled={loading}
              sx={{  mt: 3, mb: 2, backgroundColor:'#084c81',textTransform:'none', fontWeight:'bold', fontSize:'15px'}}
            >
              Login
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>            */}
          </Box>
          
        </Box>
      </Grid>
      </>
      }    
    </Grid>
   <ResetPasswordDialog openPopup={openPopup} handleCloseOpenPopup={handleCloseOpenPopup} handleResetPassword={handleResetPassword} />
   <ForogtPasswordDialog openPopup={forgotPasswordDialog} handleCloseOpenPopup={handleForgotPasswordCloseOpenPopup} handleForgotPassword={handleForgotPassword} /> 
    <ToastContainer  />
    
  </ThemeProvider>
  
    
  )
}

export default Login
