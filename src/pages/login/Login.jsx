import { useState,React,useEffect } from "react"
import "./Login.css"
import "../../global.css";
import { useNavigate } from "react-router-dom"
import {APIS} from '../../utils/apiList';
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
import logojpg from '../../assets/images/logo.jpg';
import { grey } from "@mui/material/colors";



const Login = ({ onSubmit }) => {
  const [alertMsgData, setAlertMsgData] = useState({variant:'success',message:'test data'})
  const [credentials, setCredentials] = useState({ username: "", password: ""})
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    //console.log("===process env===",baseurl)
    //localStorage.removeItem("token")
    clearLocalStorage();
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    //onSubmit(username, password)
  }

  const handleChange = (e) => {
    const target = e.target
    setCredentials((cre) => ({ ...cre, [target.id]: target.value }))
  }

  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault();
    getUserInfo();
    //localStorage.setItem("token", "23rasdfqwrwqerwqaerfq")
    //navigate("/")
  }

  const getUserInfo = async () => {
    setLoading(true);
    clearTimeout(timer);
    console.log("======getUserInfo==Start=====");
    const res = await postData(APIS.LOGIN,credentials);
    console.log("======res=======",res);
    if(res.token)
      {
        console.log("======token=======",res.token);
        localStorage.setItem(LocalStorageKey.token, res.token); 
        localStorage.setItem(LocalStorageKey.userId,res.userid);      
        navigate("/");
      }
      else
      {
        setLoading(false);
        setLoginError("Invalid credentials");
      }
    //isObject(res) && props.LoginUserDetails({ userInfo: res })
  }

  const timer = setTimeout(() => {
    setLoading(false);
  }, 4000); // Hide spinner after 3 seconds


 
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" mx={0} sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid  borderRadius={5}
        item
        justifyContent="center"
        alignItems="center"
        xs={false}
        sm={4}
        md={6}       
        style={{backgroundColor:'#d0e4fd'}}
      >
       
         <img src={logojpg}  className="img-margin" width={'100%'} height={300}></img> 
      
      </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper}  >
        <Box
          sx={{
            my: 8,
            mx: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',        
           
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          id="filled-password-input"
          label="User Name"
          type="text"
          autoComplete="current-password"
          variant="outlined" 
          margin="normal"
          fullWidth
          InputProps={{ disableUnderline: true, style: { backgroundColor: '#f2f2f2', borderRadius: '26px',fontFamily:'DM Sans' } }}         
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
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined" 
          margin="normal"
          fullWidth
          InputProps={{ disableUnderline: true, style: { backgroundColor: '#f2f2f2', borderRadius: '26px',fontFamily:'DM Sans' } }}         
          sx={{            
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '26px', // Custom border radius
                // backgroundColor:'#f2f2f2',
                            
              },
            },
          }}
        />
           <Link href="#" variant="body2" className="login-link" fontFamily={'DM Sans'}>
                  Forgot password?
                </Link>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-btn"
              fontFamily={'DM Sans'}
              
              sx={{  mt: 3, mb: 2, backgroundColor:'#084c81',textTransform:'none', fontWeight:'bold', fontSize:'15px'}}
            >
              Log In
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
    </Grid>
  </ThemeProvider>
    
  )
}

export default Login
