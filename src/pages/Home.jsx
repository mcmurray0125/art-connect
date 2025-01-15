import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container } from 'react-bootstrap';
import NewPostCard from '../components/profile/NewPostCard';
import NewPostModal from '../components/NewPostModal';

export default function Home() {
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      Home
      <NewPostCard currentUser={currentUser} onShowModal={handleShowModal} />
      <NewPostModal show={showModal} handleClose={handleCloseModal} />
    </Container>
  );
}