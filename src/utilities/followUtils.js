import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the import based on your project structure

export const followUser = async (currentUserUid, userId) => {
  try {
    // Update current user's following subcollection
    const followingDocRef = doc(db, "users", currentUserUid, "following", userId);
    await setDoc(followingDocRef, {
      uid: userId,
      Date: new Date().toISOString() 
    });

    // Update profile page owner's followers subcollection
    const followerDocRef = doc(db, "users", userId, "followers", currentUserUid);
    await setDoc(followerDocRef, {
      uid: currentUserUid,
      Date: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error("Error following user:", error);
    return false;
  }
};

export const unfollowUser = async (currentUserUid, userId) => {
  try {
    // Update current user's following subcollection
    const followingDocRef = doc(db, "users", currentUserUid, "following", userId);
    await deleteDoc(followingDocRef);

    // Update profile page owner's followers subcollection
    const followerDocRef = doc(db, "users", userId, "followers", currentUserUid);
    await deleteDoc(followerDocRef);

    return true;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return false;
  }
};