// Libraries
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";

// Actions
import { logout } from "../redux/actions/user";
import {
  FaBoxOpen,
  FaCogs,
  FaFirstAid,
  FaGlobe,
  FaHandHoldingHeart,
  FaHome,
  FaMapPin,
  FaPowerOff,
  FaSignInAlt,
  FaStore,
  FaUserAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";

const PetohubNavbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) setMenuOpen(false);
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="header-bar d-md-flex justify-content-around text-center align-items-center py-2">
        <div className="d-block px-1 d-sm-inline">
          <span>
            Ph:
            <a href="tel:7011923045"> +91 7011923045 </a>
          </span>
        </div>
        <div className="d-block px-1 d-sm-inline">
          <span>
            Email:
            <a href="mailto:info@petohub.com"> info@petohub.com</a>
          </span>
        </div>
        <div className="d-block px-1 d-md-inline">
          <span>Follow us</span>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram size={23} />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook size={23} />
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">
            <FaPinterest size={23} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin size={23} />
          </a>
        </div>
      </div>
      <header className="header sticky-top">
        <div className="header-content">
          <Link to="/" className="header-content-logo">
            <img src="/assets/logo/Petohub-Logo-Wide.png" alt="" width="150px" height="50px" />
          </Link>
          <nav className={`header-content-nav ${menuOpen && size.width < 768 ? "isMenu" : ""}`}>
            <div className="nav-link-container">
              <Link to="/" className="header-nav-link" onClick={menuToggleHandler}>
                <FaHome /> Home
              </Link>
              <Link to="/shop" className="header-nav-link" onClick={menuToggleHandler}>
                <FaStore /> Shop
              </Link>
              <Link to="/about" className="header-nav-link" onClick={menuToggleHandler}>
                <FaHandHoldingHeart /> About
              </Link>
              <Link to="/about" className="header-nav-link" onClick={menuToggleHandler}>
                <FaGlobe /> Contact
              </Link>
              {user.isAuthenticated && user.user.role === "Admin" && (
                <>
                  <Link to="/services" className="header-nav-link" onClick={menuToggleHandler}>
                    <FaFirstAid /> Services
                  </Link>
                  <Link to="/directories" className="header-nav-link" onClick={menuToggleHandler}>
                    <FaMapPin /> Directories
                  </Link>
                </>
              )}
              {user.isAuthenticated &&
                (user.user.role === "Admin" || user.user.role === "Product Admin") && (
                  <>
                    <Link to="/admin" className="header-nav-link" onClick={menuToggleHandler}>
                      <FaCogs /> Dashboard
                    </Link>
                  </>
                )}
              {user.isAuthenticated ? (
                <>
                  <Link to="/account" className="header-nav-link" onClick={menuToggleHandler}>
                    <FaUserAlt /> {user.user.name}
                  </Link>
                  <Link
                    to="/"
                    className="header-nav-link"
                    onClick={() => dispatch(logout()) && setMenuOpen((p) => !p)}
                  >
                    <FaPowerOff /> Sign Out
                  </Link>
                  {user.user.role === "Client" && (
                    <>
                      <Link
                        to="/account/products"
                        className="header-nav-link"
                        onClick={menuToggleHandler}
                      >
                        <FaBoxOpen /> Your Products
                      </Link>
                      <Link
                        to="/account/services"
                        className="header-nav-link"
                        onClick={menuToggleHandler}
                      >
                        <FaFirstAid /> Your Services
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link to="/register" className="header-nav-link" onClick={menuToggleHandler}>
                    <FaUserPlus /> Sign Up
                  </Link>
                  <Link to="/login" className="header-nav-link" onClick={menuToggleHandler}>
                    <FaSignInAlt /> Sign In
                  </Link>
                </>
              )}
            </div>
          </nav>
          <div className="header-content-toggle">
            {!menuOpen ? (
              <FaBars onClick={() => setMenuOpen((p) => !p)} />
            ) : (
              <FaTimes onClick={() => setMenuOpen((p) => !p)} />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default PetohubNavbar;
