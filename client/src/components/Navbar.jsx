// Libraries
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";

// Actions
import { logout } from "../redux/actions/user";
import {
  FaBoxOpen,
  FaCogs,
  FaConnectdevelop,
  FaFirstAid,
  FaHome,
  FaMapPin,
  FaPowerOff,
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
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src="/assets/logo/Petohub-Logo-Wide.png" alt="" width="150px" height="50px" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-center flex-grow-1">
            <Link to="/" className="nav-link">
              <FaHome /> Home
            </Link>
            <Link to="/shop" className="nav-link">
              <FaStore /> Shop
            </Link>
            <Link to="/services" className="nav-link">
              <FaFirstAid /> Services
            </Link>
            <Link to="/directories" className="nav-link">
              <FaMapPin /> Directories
            </Link>
            {user.isAuthenticated ? (
              <>
                {user.user.role === "Admin" && (
                  <Link to="/admin" className="nav-link">
                    <FaCogs /> Dashboard
                  </Link>
                )}
                <NavDropdown
                  className="account-dropdown"
                  title={
                    <>
                      <FaUserAlt /> {user.user.name}
                    </>
                  }
                >
                  <Link to="/account" className="dropdown-item">
                    <FaUserCog /> Your Account
                  </Link>
                  {user.user.role === "Client" && (
                    <>
                      <Link to="/account/products" className="dropdown-item">
                        <FaBoxOpen /> Your Products
                      </Link>
                      <Link to="/account/services" className="dropdown-item">
                        <FaFirstAid /> Your Services
                      </Link>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => dispatch(logout())}>
                    <FaPowerOff /> Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link to="/register/member" className="nav-link">
                  <FaConnectdevelop /> Member
                </Link>
                <Link to="/register" className="nav-link">
                  <FaUserPlus /> Sign Up
                </Link>
                <Link to="/login" className="nav-link">
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
