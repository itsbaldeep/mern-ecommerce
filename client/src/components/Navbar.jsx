// Libraries
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";

// Actions
import { logout } from "../redux/actions/user";
import {
  FaConnectdevelop,
  FaFirstAid,
  FaHandsHelping,
  FaHome,
  FaMapPin,
  FaPowerOff,
  FaProductHunt,
  FaSignInAlt,
  FaStore,
  FaUserAlt,
  FaUserCog,
  FaUserPlus,
} from "react-icons/fa";
const PetohubNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <Navbar sticky="top" expand="lg" bg="primary" variant="dark">
      <Container fluid>
        <LinkContainer exact to="/">
          <Navbar.Brand>
            <img src="/assets/logo/Petohub-Logo-Wide.png" alt="" width="150px" height="50px" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1">
            <Link exact to="/" className="nav-link">
              <FaHome /> Home
            </Link>
            <Link exact to="/shop" className="nav-link">
              <FaStore /> Shop
            </Link>
            <Link exact to="/services" className="nav-link">
              <FaFirstAid /> Services
            </Link>
            <Link exact to="/directories" className="nav-link">
              <FaMapPin /> Directories
            </Link>
            <Link exact to="/ngo" className="nav-link">
              <FaHandsHelping /> NGOs
            </Link>
            {user.isAuthenticated ? (
              <NavDropdown
                title={
                  <>
                    <FaUserAlt /> {user.user.name}
                  </>
                }
              >
                {user.user.role === "Client" && (
                  <>
                    <Link exact to="/account/products" className="dropdown-item">
                      <FaProductHunt /> Your Products
                    </Link>
                    <Link exact to="/account/services" className="dropdown-item">
                      <FaProductHunt /> Your Services
                    </Link>
                  </>
                )}
                <Link exact to="/account" className="dropdown-item">
                  <FaUserCog /> Your Account
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  <FaPowerOff /> Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link exact to="/register/member" className="nav-link">
                  <FaConnectdevelop /> Member
                </Link>
                <Link exact to="/register" className="nav-link">
                  <FaUserPlus /> Sign Up
                </Link>
                <Link exact to="/login" className="nav-link">
                  <FaSignInAlt /> Sign In
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PetohubNavbar;
