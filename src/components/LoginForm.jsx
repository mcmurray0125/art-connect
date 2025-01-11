import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './Spinner';

function LoginForm( { handleClose, referrer } ) {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)

    try {
      await login(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
      if (referrer === 'Navigation') {
        handleClose();
      }
    } catch(error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      {loading && <Spinner/>}
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleLogin}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="newMemory.Name">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} placeholder="Email" autoFocus required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newMemory.Images" >
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' ref={passwordRef} placeholder="Password" required/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Log in
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}

export default LoginForm;