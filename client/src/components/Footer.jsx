import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="bg-secondary py-1 text-light sticky-bottom">
      <Container>
        <Row className="footer-section text-center text-light pt-3">
          <Col lg={3} sm={6} xs={12} className="footer-first px-2">
            <div className="footer-img-container mx-auto">
              <img src="assets/logo/Petohub-Logo-Wide.png" alt="" width="160px" />
            </div>
            <div className="py-2">
              <i className="fas fa-home"></i>
              <p> Mukhram Garden, Tilak Nagar, New Delhi, 110018</p>
            </div>
            <div className="py-2">
              <i className="fas fa-envelope"></i>
              <p> petohubofficial@gmail.com</p>
            </div>
            <div className="py-2">
              <i className="fas fa-phone"></i>
              <p> +91 9999999999</p>
            </div>
          </Col>
          <Col lg={3} sm={6} xs={12}>
            <div className="quick-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">Services</Link>
                </li>
                <li>
                  <Link to="/">Shop</Link>
                </li>
                <li>
                  <Link to="/">NGOs</Link>
                </li>
                <li>
                  <Link to="/">Contact Us</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={3} sm={6} xs={12}>
            <div className="information">
              <h4>Information</h4>
              <ul>
                <li>
                  <Link to="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/">Terms of Use</Link>
                </li>
                <li>
                  <Link to="/">Disclaimer</Link>
                </li>
                <li>
                  <Link to="/">FAQ</Link>
                </li>
                <li>
                  <Link to="/">Help Center</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={3} sm={6} xs={12} className="pb-2">
            <h4>Catch us on Social Media</h4>
            <div className="social-links">
              <div className="facebook">
                <Link to="/">
                  <FaFacebook />
                  <p> Facebook</p>
                </Link>
              </div>
              <div className="twitter">
                <Link to="/">
                  <FaTwitter />
                  <p> Twitter</p>
                </Link>
              </div>
              <div className="instagram">
                <Link to="/">
                  <FaInstagram />
                  <p> Instagram</p>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid className="text-center">
        <span>Copyright &copy; {new Date().getFullYear()} Petohub. All rights reserved</span>
      </Container>
    </div>
  );
};

export default Footer;
