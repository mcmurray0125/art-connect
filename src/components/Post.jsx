import { useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap'
import moment from 'moment';
import { getAuthorDetails } from '../helpers/firebaseHelpers';
import avatarIcon from '../assets/icons/avatar-icon.png';

export default function Post ( { post } ) {
  const [authorDetails, setAuthorDetails] = useState(null);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      const authorData = await getAuthorDetails(post.authorId);
      setAuthorDetails(authorData);
    };

    fetchAuthorDetails();
  }, [post]);
  
  const formattedPostDate = moment(Number(post.date)).format("MMMM Do, YYYY");

  return (
    <Card className='post'>
      <Card.Header>
        {authorDetails ? (
          <>
            <Image roundedCircle src={authorDetails.profileImage || avatarIcon} alt={authorDetails.name} className='user-image-small me-2 profile-image' />
            {authorDetails.name}
          </>
        ) : (
          'Loading...'
        )}
        <div>{formattedPostDate}</div>
      </Card.Header>
      <Card.Body>
        <p className='m-0'>{post.description}</p>
        {post.images && post.images.map((image, index) => (
          <Card.Img key={index} src={image} alt={`Post image ${index + 1}`} />
        ))}
      </Card.Body>
    </Card>
  )
}
