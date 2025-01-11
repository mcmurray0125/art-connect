import { Container } from 'react-bootstrap';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import { doc, setDoc } from "firebase/firestore";
import { users } from '../data/userData';
import { useNavigate } from 'react-router';


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
    <Container className='d-flex align-items-center justify-content-center flex-column vh-100' >
        <form onSubmit={handleGoogleLogin} className="mb-3">
            <button disabled={loading} type="submit" className='bg-transparent login-button px-3'>Sign in with Google <i className="fa-brands fa-google"></i></button>
        </form>
        <form onSubmit={handleDemoSubmit} className="mb-3" id="demo-form">
            <button id="demo-button" disabled={loading} type='submit' className='bg-transparent login-button px-3'>Sign in as <i>Demo</i> User</button>
        </form>
    </Container>
  )
}
