import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Container, Button, Nav, Image, Row, Col } from "react-bootstrap";
import { fetchFeaturedFollowers, getFollowingCount } from "../utilities/followUtils";

import "../styles/profile.scss";
import NewPostCard from "../components/profile/NewPostCard";
import Post from "../components/Post";
import NewPostModal from "../components/NewPostModal";
import avatarIcon from '../assets/icons/avatar-icon.png';

const MyProfile = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [featuredFollowers, setFeaturedFollowers] = useState([]);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
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
          const followersList = followersSnapshot.docs.map(doc => doc.data());
          setFollowers(followersList);

          const featuredFollowersList = await fetchFeaturedFollowers(followersList);
          setFeaturedFollowers(featuredFollowersList);

          const followingCount = await getFollowingCount(userId);
          setFollowingCount(followingCount);
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

  if (loading) return <p>Loading...</p>;
  if (!userData) return <p>User not found</p>;

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xl={8} lg={9} md={10}>
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
          <div className="profile-header d-flex align-items-center gap-3">
            {/* Left: Profile Photo and Follower Info */}
            <div className="d-flex align-items-center gap-3">
              {/* Profile Photo */}
              <Image src={userData.profileImageLarge || avatarIcon} alt="Profile Image" className="profile-image"
              />
              {/* Follower Info */}
              <div>
                <h2 className="m-0">{userData.displayName}</h2>
                <div className="d-flex gap-1">
                  <Link to={`/${userId}/followers`}>
                    {followers.length} Follower{followers.length !== 1 && "s"}
                  </Link>
                </div>
                <div className="d-flex gap-1">
                  <Link to={`/${userId}/following`}>{followingCount} Following</Link>
                </div>
              </div>
            </div>
            {/* Right: Buttons */}
            <div className="profile-header-buttons ms-auto mb-3 d-flex gap-2">
              <Button>Edit Profile</Button>
              <Button>Add to Story</Button>
            </div>
          </div>
          <div className="profile-links my-3">
            <Nav.Link className="profile-link" as={NavLink} to={'/' + currentUser.uid}>Posts</Nav.Link>
            <Nav.Link className="profile-link" as={NavLink} to={'/' + currentUser.uid + '/about-me'}>About</Nav.Link>
            <Nav.Link className="profile-link" as={NavLink} to={'/' + currentUser.uid + '/projects'}>Projects</Nav.Link>
            <Nav.Link className="profile-link" as={NavLink} to={'/' + currentUser.uid + '/photos'}>Photos</Nav.Link>
            <Nav.Link className="profile-link" as={NavLink} to={'/' + currentUser.uid + '/videos'}>Videos</Nav.Link>
          </div>
          <NewPostCard userData={userData} currentUser={currentUser} onShowModal={handleShowModal}/>
          <div className="posts mt-3">
            {posts.length > 0 && posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          <NewPostModal show={showModal} handleClose={handleCloseModal} />
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfile;
