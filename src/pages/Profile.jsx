import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

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
    <div>
      {/* Cover Photo */}
      <div
        style={{
          backgroundImage: `url(${userData.coverPhoto || "/default-cover.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          width: "100%",
        }}
      ></div>

      {/* Profile Row */}
      <div style={{ display: "flex", alignItems: "center", padding: "16px" }}>
        {/* Left: Profile Photo and Follower Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
            <p style={{ margin: "0", fontWeight: "bold" }}>
              {userData.followers?.length || 0} Followers
            </p>
            <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
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
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#28A745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add to Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
