import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Container, Button } from "react-bootstrap";

import "../styles/profile.scss";

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          console.log(currentUser);
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
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User not found</p>;

  return (
    <Container>
      {/* Cover Photo */}
      <div id="cover">
        <Button className="edit-cover-photo"><i className="fa-solid fa-camera"></i> Edit Cover Photo</Button>
        <img
          id="cover-photo"
          src={userData.coverPhoto || "src/assets/cover-photos/cover-1.jpg"}
          alt="Cover Photo"
        />
      </div>

      {/* Profile Row */}
      <div className="d-flex align-items-center gap-3">
        {/* Left: Profile Photo and Follower Info */}
        <div className="d-flex align-items-center gap-3">
          {/* Profile Photo */}
          <img
            src={currentUser.photoURL}
            alt="Profile"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: "2px solid white",
              objectFit: "cover",
            }}
          />
          {/* Follower Info */}
          <div>
            <p className="m-0">
              {userData.followers?.length || 0} Followers
            </p>
            <div className="d-flex gap-1 mt-1">
              {userData.followers?.slice(0, 10).map((follower, index) => (
                <img
                  key={index}
                  src={follower.profilePhoto || "/default-avatar.jpg"}
                  alt={`Follower ${index + 1}`}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="profile-header ms-auto d-flex gap-2">
          <Button>Edit Profile</Button>
          <Button>Add to Story</Button>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
