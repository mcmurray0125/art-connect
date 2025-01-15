import { useState, useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase';
import { addDoc, collection } from "firebase/firestore";
import { uid } from 'uid';
import { useAuth } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from './Spinner';

import { formatPost } from '../forms/postFormatter';

function NewPostModal({ show, handleClose }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({ current: 0, total: 0, progress: 0 });
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  let uploadCount = 0;

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Reset any previous errors

    try {
      // Format the memory object
      const postObject = formatPost(
        titleRef.current.value,
        Date.now().toString(),
        descriptionRef.current.value,
      );

      const storage = getStorage();

      for (const image of images) {
        const imageId = uid(6);
        const timestamp = Date.now().toString();
        const imageStorageRef = ref(storage, `users/${currentUser.uid}/${image.name}-${imageId}-${timestamp}`);
        const uploadTask = uploadBytesResumable(imageStorageRef, image);

        uploadCount++;

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploading({ current: uploadCount, total: images.length, progress: progress });
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.error("Upload failed", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              postObject.images.push(downloadURL);
              resolve();
            }
          );
        });
      }

      // Write memory data to Firestore
      const userPostsCollectionRef = collection(db, 'users', currentUser.uid, 'posts');
      await addDoc(userPostsCollectionRef, postObject);

      console.log("Memory successfully saved!");
      handleClose(); // Close the modal if needed
    } catch (error) {
      console.error("Error saving memory:", error);
      setError("Failed to save memory. Please try again.");
    } finally {
      setImages([]);
      setUploading(false);
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      {loading && <Spinner />}
      {uploading.total > 0 &&
        <div className='px-3 py-5 new-memory-progress'>
          <p>Uploading {uploading.current}/{uploading.total}</p>
          <ProgressBar now={uploading.progress} />
        </div>
      }
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="newMemory.Name">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" ref={titleRef} placeholder="Memory Name" autoFocus required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newMemory.Description">
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' as='textarea' ref={descriptionRef} rows={3} style={{ maxHeight: "200px" }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newMemory.Images">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type='file'
                multiple
                accept="image/*"
                rows={3}
                onChange={handleImageChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type='submit'>
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default NewPostModal;