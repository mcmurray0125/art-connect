import { Container, Row, Form, Button, Col } from 'react-bootstrap';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import { doc, setDoc } from "firebase/firestore";
import { users } from '../data/userData';
import { useNavigate } from 'react-router';

import logo from "../../public/logo-large.png"


export default function Register() {
  const { loginGoogle, loginDemo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

    //Sign in with Google.
  async function handleGoogleLogin(e) {
    e.preventDefault()
    try {
        setError('')
        setLoading(true)
        await loginGoogle()
        navigate("/")
    } catch(error) {
        setError('Failed to create an account')
        console.log(error)
    }
    setLoading(false)
  }

    //Login as Demo user
    async function handleDemoSubmit(e) {
      e.preventDefault()
      try {
        setError('')
        setLoading(true)
        await loginDemo()
        navigate("/")
      } catch(error) {
        setError('Failed to create an account')
        console.log(error)
      }
      setLoading(false)
    }

  
  return (
    <Container fluid className='vh-100'>
      <Row className='h-100'>
        <Col md={6} className='d-flex flex-column align-items-center justify-content-center bg-light'>
          <img src={logo} alt="Craftor Logo" className='mb-4 register-page-logo' />
          <h2>Sign up to join the artistic community of Craftor.</h2>
        </Col>
        <Col md={6} className='d-flex align-items-center justify-content-center'>
          <Form className='w-75'>
            <Form.Group controlId="firstName" className='mb-3'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your first name" />
            </Form.Group>
            <Form.Group controlId="lastName" className='mb-3'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" />
            </Form.Group>
            <Form.Group controlId="birthday" className='mb-3'>
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group controlId="gender" className='mb-3'>
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="password" className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
            <Button variant="primary" type="submit" className='w-100 mb-3' disabled={loading}>
              Register
            </Button>
            <Button variant="outline-primary" className='w-100 mb-3' onClick={handleGoogleLogin} disabled={loading}>
              Sign in with Google <i className="fa-brands fa-google"></i>
            </Button>
            <Button variant="outline-secondary" className='w-100' onClick={handleDemoSubmit} disabled={loading}>
              Sign in as <i>Demo</i> User
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
