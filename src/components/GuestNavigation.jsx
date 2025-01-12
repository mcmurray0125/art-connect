import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import logo from '../assets/brand/logo-large.png';

const GuestNavigation = () => {
  const { login, loginGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // Navigate to home after login
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginGoogle();
      navigate('/'); // Navigate to home after Google sign-in
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Navbar.Brand href="/" className="fw-bold">
        <Image height={40} src={logo} className='me-3' />
        Craftor
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Form className="d-flex" onSubmit={handleLogin}>
          <Form.Control
            type="email"
            placeholder="Email"
            className="me-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Control
            type="password"
            placeholder="Password"
            className="me-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="me-2">Login</Button>
          <Button variant="outline-secondary" onClick={handleGoogleSignIn}>
            <i className="fa-brands fa-google"></i>
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default GuestNavigation;