// Dependencies
import { Tab, Row, Col, Nav, Container } from "react-bootstrap";
import { FaBoxOpen, FaDna, FaMapMarkerAlt, FaUsersCog } from "react-icons/fa";

// Screens
import UsersDashboard from "./users/UsersDashboard.jsx";
import DirectoriesDashboard from "./directories/DirectoriesDashboard.jsx";
import ProductsDashboard from "./products/ProductsDashboard.jsx";
import ServicesDashboard from "./services/ServicesDashboard.jsx";

// Custom CSS
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <Container fluid className="profile-container">
      <h2 className="my-1 pt-3">Admin Dashboard</h2>
      <Tab.Container id="profile-tabs" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column profile-sidebar py-2">
              <Nav.Item>
                <Nav.Link eventKey="first">
                  <FaUsersCog /> Users
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  <FaBoxOpen /> Directories
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">
                  <FaDna /> Services
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">
                  <FaMapMarkerAlt /> Products
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content className="py-2">
              <Tab.Pane eventKey="first">
                <UsersDashboard />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <DirectoriesDashboard />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <ServicesDashboard />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <ProductsDashboard />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default AdminDashboard;
