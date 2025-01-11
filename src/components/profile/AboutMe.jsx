import { useParams } from "react-router"

function AboutMe ( { userData } ) {
  return (
    <div id="about-me">
      <h2>About {userData.displayName}</h2>
    </div>
  )
}

export default AboutMe
