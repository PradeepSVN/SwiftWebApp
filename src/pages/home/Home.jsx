import React, { useState,useEffect,useRef } from "react"
import {Grid,Box,Table, TableBody, TableRow, TableCell} from '@mui/material';
import { Form, Container,InputGroup,FormControl } from "react-bootstrap"
import {APIS} from '../../utils/apiList';
import {getData, postData} from '../../services/rest-services';
import '../../../src/global.css'
import GlobalStyles from '../../theme/GlobalStyles';
import {isObject} from '../../utils/utils';
import '../../styles/Menu.css'
import { LocalStorageKey } from "../../utils/constants";
import {isEmptyObject,isLocalStorageValueExists} from '../../utils/utils';
import { useNavigate } from "react-router-dom"


const Home = () => {
  
  const [loading,setLoading] = useState(false);

  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    console.log("=====Add User====",isLocalStorageValueExists(LocalStorageKey.token))
    if(!isLocalStorageValueExists(LocalStorageKey.token))
      {
         navigate("/login");
      }
       
    //localStorage.removeItem("token")
    //clearLocalStorage();
  }, [])


  const handleMenuMouseEnter = (menu) => {
      setHoveredMenu(menu);
  };

  const handleMenuMouseLeave = () => {
      setHoveredMenu(null);
      setHoveredSubMenu(null);
  };

  const handleSubMenuMouseEnter = (subMenu) => {
      setHoveredSubMenu(subMenu);
  };

  const handleSubMenuMouseLeave = () => {
      setHoveredSubMenu(null);
  };

  return (
      <Container className="menu" style={{marginTop:'100px'}}>
        
      </Container>
  );
};

export default Home