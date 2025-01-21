import { Card, Image, Button } from "react-bootstrap";
import "../../styles/buttons.scss";
import avatarIcon from '../../assets/icons/avatar-icon.png';

export default function NewPostCard({ currentUser, onShowModal }) {
  return (
    <Card className="new-post-card">
      <Card.Body>
        <div className="d-flex gap-3 align-items-center">
          <Image src={currentUser.photoURL || avatarIcon} className="user-image-small profile-image" />
          <Button className="w-100 new-post-button" onClick={onShowModal}>
            What are you working on?
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}