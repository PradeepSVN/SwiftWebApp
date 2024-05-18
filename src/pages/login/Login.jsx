import { useState,React,useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Login.css"
import { useNavigate } from "react-router-dom"
import {APIS} from '../../utils/apiList';
import {testmethod, postData} from '../../services/rest-services';
import { clearLocalStorage } from "../../utils/utils"
import AlertPopup from "../../shared/Alert";  //
import { Spinner } from "react-bootstrap"

const Login = ({ onSubmit }) => {
  const [alertMsgData, setAlertMsgData] = useState({variant:'success',message:'test data'})
  const [credentials, setCredentials] = useState({ username: "", password: ""})
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false);


  useEffect(() => {
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
        localStorage.setItem("token", res.token);       
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

  return (
    <>
   
    <div className="Auth-form-container">
     
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          {loginError && (<div className="error-message">{loginError}</div>)}  
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleChange} id="username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handleChange} id="password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="button"             
              className="btn btn-primary"
              onClick={handleClick}
              disabled={loading}
            >
             {loading ? (
        <Spinner animation="border" role="status" size="sm">          
        </Spinner>
      ):null}
        Submit
            </button>
          </div>
          {/* <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
    </>
    
  )
}

export default Login
