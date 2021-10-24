import { Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./AccountScreen.css";

const AccountScreen = () => {
  return (
    <Container className="pt-2">
      <h1 className="my-2">Your Profile</h1>
      <Row className="mt-4 profile-screen-container">
        <Col xs={12} md={6}>
          <LinkContainer to="/account/orders">
            <div className="profile-section profile-section-orders">
              <div>
                <i className="fas fa-box"></i>
              </div>
              <div>
                <h2>YOUR ORDERS</h2>
                <p>Track, return or view your orders.</p>
              </div>
            </div>
          </LinkContainer>
        </Col>
        <Col xs={12} md={6}>
          <LinkContainer to="/account/appointments">
            <div className="profile-section profile-section-appointments">
              <div>
                <i className="fas fa-calendar-check"></i>
              </div>
              <div>
                <h2>YOUR APPOINTMENTS</h2>
                <p>View or cancel your appointments.</p>
              </div>
            </div>
          </LinkContainer>
        </Col>
        <Col xs={12} md={6}>
          <LinkContainer to="/account/profile">
            <div className="profile-section profile-section-account">
              <div>
                <i className="fas fa-user-circle"></i>
              </div>
              <div>
                <h2>YOUR PROFILE</h2>
                <p>View or edit your account details.</p>
              </div>
            </div>
          </LinkContainer>
        </Col>
        <Col xs={12} md={6}>
          <LinkContainer to="/account/cart">
            <div className="profile-section profile-section-cart">
              <div>
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div>
                <h2>YOUR SHOPPING CART</h2>
                <p>Add or remove items from your shopping cart.</p>
              </div>
            </div>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountScreen;
