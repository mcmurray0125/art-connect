
import { db } from '../firebase'
import { doc, setDoc } from "firebase/firestore";
  
async function sendToFirebase() {
  const memory = {};

  try {
    await setDoc(doc(db, 'memories', memory.id), memory);
  }
  catch (error) {
      console.log(error)
  }

}
