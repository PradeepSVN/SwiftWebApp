import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import './Login.css';
import { Routes, Route, Navigate, Link,useNavigate } from "react-router-dom";
interface LoginProps {
  onSubmit: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  localStorage.removeItem("token");
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  const navigate = useNavigate ();

  const handleNavigation = () => {
    localStorage.setItem("token", "23rasdfqwrwqerwqaerfq");
    navigate('/');
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleNavigation}>
              Submit
            </button>
          </div>
          {/* <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>


   
  );
};

export default Login;