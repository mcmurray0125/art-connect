import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import { doc, setDoc } from "firebase/firestore";
import { users } from '../data/userData';
import { Container } from 'react-bootstrap';
import NewPostCard from '../components/profile/NewPostCard';


export default function Home() {
  const { currentUser } = useAuth();

  return (
    <Container>
      Home
      <button >Add User</button>
      <NewPostCard currentUser={currentUser}/>
    </Container>
  )
}
