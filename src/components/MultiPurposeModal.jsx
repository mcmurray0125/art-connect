import Modal from 'react-bootstrap/Modal';
import NewMemoryForm from './NewMemoryForm';
import LoginForm from './LoginForm';

function MultiPurposeModal( { show, handleClose, user, referrer } ) {

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        {user ?
          <NewMemoryForm handleClose={handleClose}/>
          :
          <LoginForm handleClose={handleClose} referrer={referrer}/>
        }
      </Modal>
    </>
  );
}

export default MultiPurposeModal;