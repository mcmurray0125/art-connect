import { Card, Image, Button } from "react-bootstrap"
import "../../styles/buttons.scss";

export default function NewPostCard ( { userData, currentUser } ) {
  return (
    <Card className="new-post-card">
      <Card.Body>
        <div className="d-flex gap-3 align-items-center">
          <Image rounded src={currentUser.photoURL}/>
          <Button className="w-100 new-post-button">What are you working on?</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
