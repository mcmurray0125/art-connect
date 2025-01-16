import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const getAuthorDetails = async (authorId) => {
  try {
    const authorDoc = await getDoc(doc(db, 'users', authorId));
    if (authorDoc.exists()) {
      const authorData = authorDoc.data();
      return {
        name: authorData.displayName,
        profileImage: authorData.profileImage
      };
    } else {
      console.error('Author not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching author details:', error);
    return null;
  }
};