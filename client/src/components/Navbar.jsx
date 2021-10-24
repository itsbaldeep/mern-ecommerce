// Libraries
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";

// Actions
import { logout } from "../redux/actions/user";

const PetohubNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      variant="light"
      bg="light"
      style={{ minHeight: "70px" }}
    >
      <Container fluid>
        <LinkContainer exact to="/">
          <Navbar.Brand>
            <img src="/assets/logo/Petohub-Logo-Wide.png" alt="" width="150px" height="50px" />{" "}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" navbarScroll>
            <LinkContainer exact to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link>Shop</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/services">
              <Nav.Link>Services</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/directories">
              <Nav.Link>Directories</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ngo">
              <Nav.Link>NGOs</Nav.Link>
            </LinkContainer>
            {!user.isAuthenticated && (
              <LinkContainer exact to="/register/member">
                <Nav.Link>Become a Member</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          {user.isAuthenticated ? (
            <Nav>
              <NavDropdown className="nav-light" title={user.user.name}>
                <LinkContainer to="/account">
                  <NavDropdown.Item>Account</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => dispatch(logout())}>Sign Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <LinkContainer exact to="/login">
                <Nav.Link>Sign In</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to="/register">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PetohubNavbar;
