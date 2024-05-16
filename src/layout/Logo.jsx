import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logojpg from '../assets/images/logo.jpg'; 
const Logo = () => {
  return (   
    // <Row className="justify-content-md-center">
      <Col lg='4' >
        <img src={logojpg} alt="Website Logo" className='logoCenter' width="250px" height="150px" />
      {/* <img src="http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png" alt="Website Logo" /> */}
      </Col>      
    // </Row>
  );
};

export default Logo;