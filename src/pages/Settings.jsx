import React, { useEffect, useState } from "react";
import { doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const Settings = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        let userDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (!userDoc.exists()) {
          // If no document found by UID, check for a matching username
          const q = query(
            collection(db, "users"),
            where("username", "==", currentUser.uid)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            userDoc = querySnapshot.docs[0];
          }
        }

        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [currentUser]);

  if (loading) return <p>Loading...</p>;

  if (!userData) return <p>User not found</p>;

  return (
    <div>
      <h1>Settings</h1>
      <h1>{userData.displayName || "Unnamed User"}</h1>
      <p>{userData.bio}</p>
      {/* Render additional user profile details */}
    </div>
  );
};

export default Settings;
