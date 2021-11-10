// Dependencies
import { Tab, Row, Col, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./ProfileScreen.css";

// Screens
import ProfileDetails from "./ProfileDetails.jsx";
import UpdatePassword from "./UpdatePassword.jsx";
import UpdateCustomerProfile from "./UpdateCustomerProfile.jsx";
import UpdateClientProfile from "./UpdateClientProfile.jsx";
import AdditionalDetails from "./AdditionalDetails.jsx";

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Container fluid className="profile-container">
      <div className="d-flex align-items-center justify-content-between my-1 pt-3 text-center">
        <h2>Your Profile</h2>
        {user.role === "Customer" ? (
          <Link to="/" className="btn btn-primary">
            Become a member
          </Link>
        ) : (
          <p>
            Directory Profile:{" "}
            <span className="text-primary">
              {user.isApproved ? "Approved" : "Approval Pending"}
            </span>
          </p>
        )}
      </div>
      <Tab.Container id="profile-tabs" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column profile-sidebar py-2">
              <Nav.Item>
                <Nav.Link eventKey="first">Profile Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Update Password</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Update Details</Nav.Link>
              </Nav.Item>
              {user.role === "Client" && (
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Directory Profile</Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content className="py-2">
              <Tab.Pane eventKey="first">
                <ProfileDetails />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <UpdatePassword />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                {user.role === "Client" ? <UpdateClientProfile /> : <UpdateCustomerProfile />}
              </Tab.Pane>
              {user.role === "Client" && (
                <Tab.Pane eventKey="fourth">
                  <AdditionalDetails />
                </Tab.Pane>
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default ProfileScreen;
