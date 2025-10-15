
import React, { useState } from 'react';
import { login } from './auth/auth';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import Config from './assets/Config';
import { json } from 'stream/consumers';

const config=new Config();

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const tokenResponse = await fetch(config.APIURL + '/login', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${username}:${password}`),
          'Content-Type': 'application/json',
          // Gerekli diğer header'ları ekleyin
        },
      });
 
      if (tokenResponse.ok) {
        
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        const usr_obj = tokenData.usr_obj;
        // Token'ı saklama işlemi - localStorage veya sessionStorage'a saklayabilirsiniz
        localStorage.setItem("access_token", JSON.stringify(accessToken));
        localStorage.setItem("usr_obj", JSON.stringify(usr_obj));
   
        
        //to redirct to Dashboard page
        navigate('/');
  
      } else {
        console.error('Login failed');
        alert("Login failed")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
<div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Welcome to React Tutorial</h3>    
          <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="12">
                Name
              </Form.Label>
              <Col sm="12">
                <Form.Control type="text" className='form-control' placeholder="Name"  required value={username|| ''} onChange={(e) =>  setUsername( e.target.value ) } />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="12">
                Password
              </Form.Label>
              <Col sm="12">
                <Form.Control type="text" className='form-control'  placeholder="Password"  value={password|| ''} onChange={(e) =>  setPassword( e.target.value ) } />
              </Col>
            </Form.Group>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={handleLogin} className="btn btn-primary">
              Log In
            </button>
          </div>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
