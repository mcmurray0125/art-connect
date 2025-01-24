import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Container, Button, Nav, Image, Row, Col } from "react-bootstrap";
import { followUser, unfollowUser } from "../utilities/followUtils";

import "../styles/profile.scss";
import NewPostCard from "../components/profile/NewPostCard";
import Post from "../components/Post";
import NewPostModal from "../components/NewPostModal";

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIsFollowing, setUserIsFollowing] = useState(false);
  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          console.log(userDoc.data());

          // Fetch posts from the user's subcollection
          const postsCollectionRef = collection(db, "users", userId, "posts");
          const postsSnapshot = await getDocs(postsCollectionRef);
          const postsList = postsSnapshot.docs.map(doc => doc.data());
          setPosts(postsList);

          // Fetch followers from the user's subcollection
          const followersCollectionRef = collection(db, "users", userId, "followers");
          const followersSnapshot = await getDocs(followersCollectionRef);
          setFollowerCount(followersSnapshot.size);

          const followersList = followersSnapshot.docs.map(doc => doc.data());
          setFollowers(followersList);

          // Check if current user is following the profile user
          setUserIsFollowing(followersList.some(follower => follower.uid === currentUser.uid));
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
  }, [userId, currentUser]);

  const handleFollow = async () => {
    const success = await followUser(currentUser.uid, userId);
    if (success) {
      setUserIsFollowing(true);
    }
  };

  const handleUnfollow = async () => {
    const success = await unfollowUser(currentUser.uid, userId);
    if (success) {
      setUserIsFollowing(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User not found</p>;

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xl={8} lg={9} md={10}>
          {/* Cover Photo */}
          <div id="cover">
            <img
              id="cover-photo"
              src={userData.coverPhoto || "src/assets/cover-photos/cover-1.jpg"}
              alt="Cover Photo"
            />
          </div>
          {/* Profile Row */}
          <div className="profile-header d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-between gap-3">
            {/* Left: Profile Photo and Follower Info */}
            <div className="d-flex flex-column flex-md-row align-items-center gap-3">
              {/* Profile Photo */}
              <Image src={userData.profileImageLarge} alt="Profile Image" className="profile-image"
              />
              {/* Follower Info */}
              <div className="d-flex flex-column align-items-center align-items-md-start">
                <h2 className="m-0">{userData.displayName}</h2>
                <p className="m-0">{followerCount || 0} Followers</p>
                <div className="d-flex gap-1">
                  {followers?.slice(0, 10).map((follower, index) => (
                    <Image
                      className="follower-image"
                      key={index}
                      src={follower.profilePhoto || "/default-avatar.jpg"}
                      alt={`Follower ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Right: Buttons */}
            <div className="profile-header-buttons d-flex gap-2">
              {userIsFollowing ? (
                <Button onClick={handleUnfollow}>Unfollow</Button>
              ) : (
                <Button onClick={handleFollow}>Follow</Button>
              )}
            </div>
          </div>
          <div className="profile-links my-3">
            <Nav.Link className="profile-link" as={NavLink} to={'/' + userData.uid}>Posts</Nav.Link>
            <Nav.Link className="profile-link" as={NavLink} to={'/' + userData.uid + '/about-me'}>About</Nav.Link>
            <Nav.Link className="profile-link" as={NavLink} to={'/' + userData.uid + '/projects'}>Projects</Nav.Link>
            <Nav.Link className="profile-link" as={NavLink} to={'/' + userData.uid + '/photos'}>Photos</Nav.Link>
            <Nav.Link className="profile-link" as={NavLink} to={'/' + userData.uid + '/videos'}>Videos</Nav.Link>
          </div>
          <NewPostCard userData={userData} currentUser={currentUser} onShowModal={handleShowModal}/>
          <div className="posts mt-3">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          <NewPostModal show={showModal} handleClose={handleCloseModal} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
