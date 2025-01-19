import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import logo from '../assets/brand/logo-large.png';
import '../styles/login.scss';

export default function Login() {
  const { loginGoogle, loginDemo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Sign in with Google.
  async function handleGoogleLogin(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await loginGoogle();
      navigate('/');
    } catch (error) {
      setError('Failed to log in');
      console.log(error);
    }
    setLoading(false);
  }

  // Login as Demo user
  async function handleDemoSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await loginDemo();
      navigate('/');
    } catch (error) {
      setError('Failed to log in');
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <Container fluid className='login-page d-flex align-items-center justify-content-center'>
      <Row className='w-100'>
        <Col md={{ span: 6, offset: 3 }} className='d-flex flex-column align-items-center justify-content-center'>
          <img src={logo} alt="Craftor Logo" className='mb-4 brand-image' />
          <h2 className='mb-4'>Sign in to Craftor</h2>
          <Form className='w-75'>
            <Form.Group controlId="username" className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username" />
            </Form.Group>
            <Form.Group controlId="password" className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
            <Button variant="primary" type="submit" className='w-100 mb-3' disabled={loading}>
              Login
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
  );
}