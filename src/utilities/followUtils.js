import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
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

export const fetchFeaturedFollowers = async (followersList) => {
  try {
    const featuredFollowers = await Promise.all(
      followersList.slice(0, 8).map(async (follower) => {
        const followerDocRef = doc(db, "users", follower.uid);
        const followerDoc = await getDoc(followerDocRef);
        if (followerDoc.exists()) {
          return {
            uid: follower.uid,
            displayName: followerDoc.data().displayName,
            photoURL: followerDoc.data().photoURL,
          };
        } else {
          return null;
        }
      })
    );

    return featuredFollowers.filter(follower => follower !== null);
  } catch (error) {
    console.error("Error fetching featured followers:", error);
    return [];
  }
};