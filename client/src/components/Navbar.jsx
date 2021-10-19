// Libraries
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { logout } from "../redux/actions/user";

const PetohubNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand>
            <img src="/assets/logo/Petohub-Logo-Wide.png" alt="" width="120px" height="40px" />{" "}
          </Navbar.Brand>{" "}
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer exact to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shop">
              <Nav.Link href="/shop">Shop</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/services">
              <Nav.Link href="/services">Services</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/directories">
              <Nav.Link href="/directories">Directories</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ngo">
              <Nav.Link href="/ngo">NGOs</Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/register/member">
              <Nav.Link href="/register/member">Become a Member</Nav.Link>
            </LinkContainer>
          </Nav>
          {user.isAuthenticated ? (
            <Nav>
              <LinkContainer to="/profile">
                <Nav.Link href="/profile">Account</Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={() => dispatch(logout())}>Sign Out</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <LinkContainer exact to="/login">
                <Nav.Link href="/login">Sign In</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to="/register">
                <Nav.Link href="/regiser">Sign Up</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PetohubNavbar;
