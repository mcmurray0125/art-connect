import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MyProfile from '../pages/MyProfile'
import Profile from '../pages/Profile';

export default function ProfileRoute () {
  const { currentUser } = useAuth();
    const { urlUserId } = useParams();

  if (currentUser && currentUser.uid === urlUserId) {
    return <MyProfile />;
  } else {
    return <Profile />;
  }

}