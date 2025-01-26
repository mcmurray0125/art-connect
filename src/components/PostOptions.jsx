import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap'
import moment from 'moment';
import { getAuthorDetails } from '../helpers/firebaseHelpers';
import avatarIcon from '../assets/icons/avatar-icon.png';

export default function PostOptions ( { post } ) {
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
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <i className='fa-solid fa-ellipsis'></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Edit Post</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
