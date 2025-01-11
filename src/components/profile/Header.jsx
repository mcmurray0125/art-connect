import { Image } from "react-bootstrap"
import { Button } from "react-bootstrap"

function Header( { profilePicture, bannerImage, name } ) {
  return (
    <div id="profile-header">
      <Image src={bannerImage}/>
      <Image src={profilePicture}/>
      <h2>{name}</h2>
    </div>
  )
}

export default Header
