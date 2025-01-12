import { Image, Container, Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import '../styles/navigation.scss'
import logo from '../assets/brand/logo-large.png';

export default function Navigation() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  
  async function handleLogout() {
    try {
      await logout();
      navigate('/register'); // Navigate to /register after logout
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container fluid>
          {/* Left Section */}
          <div className="d-flex flex-1 align-items-center gap-3">
            <Navbar.Brand as={Link} to="/" className="m-0 d-flex align-items-center">
              <Image height={40} src={logo} />
            </Navbar.Brand>
            <Form className="d-none d-lg-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </div>

          {/* Center Section */}
          <Navbar.Toggle aria-controls="navigation-dropdown" />
          <Navbar.Collapse id="navigation-dropdown" className='flex-2'>
            <Nav className="justify-content-center w-100">
              <Nav.Link className='center-links' eventKey="i" as={NavLink} to="/" end>
                <i className="fa-solid fa-house nav-icon"></i>
              </Nav.Link>
              <Nav.Link className='center-links' eventKey="i" as={NavLink} to="/explore">
                <i className="fa-solid fa-compass nav-icon"></i>
              </Nav.Link>
              <Nav.Link className='center-links' eventKey="i" as={NavLink} to="/marketplace">
                <i className="fa-solid fa-shop nav-icon"></i>
              </Nav.Link>
              <Nav.Link className='center-links' eventKey="i" as={NavLink} to="/groups">
                <i className="fa-solid fa-user-group nav-icon"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {/* Right Section */}
          <div className="d-flex align-items-center justify-content-end gap-3 flex-1">
            <Nav.Link as={NavLink} to="/messages">
              <i className="fa-solid fa-comment-dots nav-icon"></i>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/notifications">
              <i className="fa-solid fa-bell nav-icon"></i>
            </Nav.Link>
            <NavDropdown
              title={
                <Image
                  src={currentUser?.photoURL || ""}
                  roundedCircle
                  height={40}
                  alt="Profile"
                />
              }
              id="profile-dropdown"
              align="end"
            >
              {/* Profile Options */}
              <NavDropdown.Item as={Link} to={'/' + currentUser?.uid || 'me'} className='fw-semibold'>
                <Image
                    src={currentUser?.photoURL || ""}
                    roundedCircle
                    height={40}
                    alt="Profile"
                  />
                  {currentUser?.displayName || 'My Profile'}
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">
                <i className="fa-solid fa-gear nav-icon"></i> Settings
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/display">
                <i className="fa-solid fa-display nav-icon"></i> Display
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
              <i className="fa-solid fa-door-open nav-icon"></i> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
