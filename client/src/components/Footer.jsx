import { Navbar, Container } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer bg-secondary py-1 text-light">
      <Container fluid className="d-flex justify-content-center align-items-center">
        <span>Copyright &copy; {new Date().getFullYear()} Petohub. All rights reserved</span>
      </Container>
    </div>
  );
};

export default Footer;
