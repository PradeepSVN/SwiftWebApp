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
       
          <Grid container rowSpacing={1}  columnSpacing={{ xs: 1, sm: 2, md: 6 }} paddingBottom={5}>
            <Grid  item xs={6}>
              <p>Prioritize Prevention: Schedule Your FREE Yearly Check-up
                Now!
              </p>
              <p>
              Make time for yourself and your health by scheduling your no-
              cost annual check-up today.
              </p>
              <p>
              Our clinical and administrative staff use your medical
              information in ways that are confidential, respectful and safe.
              We do not exchange your information without your consent.
              Our office is HIPAA compliant and we maintain strict privacy
              practices with regard to your medical records.
              </p>
              <h6 style={{fontWeight:'bold'}}>Disclaimer</h6>
              <p>
              The use of any information obtained from the PromiseCare Medical Group's websites is solely at
              your own risk. The owners, administrators, and contributors of the websites shall not be held
              responsible for any consequences or damages arising from the use of the information provided.
              </p>
              <p>
              The use of the PromiseCare Medical Group's websites does not establish a doctor-patient
              relationship. The information provided on the websites is not a substitute for professional
              medical care, and it is always advisable to seek guidance from qualified healthcare professionals,
              for any specific medical concerns.
              </p>
              <p>
              By accessing and using the PromiseCare Medical Group's websites, you acknowledge that you
              have read, understood, and agreed to the terms of this disclaimer. If you do not agree with any
              part of this disclaimer, please discontinue using the PromiseCare Medical Group's websites.
              </p>
            </Grid>
          </Grid>
        
      </Container>
  );
};

export default Home