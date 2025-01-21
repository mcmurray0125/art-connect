import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MyProfile from '../pages/MyProfile'
import Profile from '../pages/Profile';
import GuestProfile from '../pages/GuestProfile';

export default function ProfileRoute () {
  const { currentUser } = useAuth();
    const { userId } = useParams();

  if (currentUser && currentUser.uid === userId) {
    return <MyProfile />
  } else if (currentUser && currentUser.uid !== userId) {
    return <Profile />
  } else {
    return <GuestProfile/>
  }

}