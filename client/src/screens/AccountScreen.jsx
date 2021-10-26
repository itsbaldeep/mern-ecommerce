import { Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import "./AccountScreen.css";

const AccountScreen = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Container className="pt-2">
      <h2 className="my-2">Your Account</h2>
      <Row className="mt-4 profile-screen-container">
        <Col xs={12} md={6}>
          {user.role === "Customer" ? (
            <LinkContainer to="/account/orders">
              <div className="profile-section">
                <div>
                  <i className="fas fa-box"></i>
                </div>
                <div>
                  <h2>YOUR ORDERS</h2>
                  <p>Track, return or view your orders.</p>
                </div>
              </div>
            </LinkContainer>
          ) : (
            <LinkContainer to="/account/products">
              <div className="profile-section">
                <div>
                  <i className="fas fa-boxes"></i>
                </div>
                <div>
                  <h2>YOUR PRODUCTS</h2>
                  <p>Add, edit or remove your products.</p>
                </div>
              </div>
            </LinkContainer>
          )}
        </Col>
        <Col xs={12} md={6}>
          {user.role === "Customer" ? (
            <LinkContainer to="/account/appointments">
              <div className="profile-section">
                <div>
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div>
                  <h2>YOUR APPOINTMENTS</h2>
                  <p>View or cancel your appointments.</p>
                </div>
              </div>
            </LinkContainer>
          ) : (
            <LinkContainer to="/account/services">
              <div className="profile-section">
                <div>
                  <i className="fas fa-hands-helping"></i>
                </div>
                <div>
                  <h2>YOUR SERVICES</h2>
                  <p>Add, edit or remove your services.</p>
                </div>
              </div>
            </LinkContainer>
          )}
        </Col>
        <Col xs={12} md={6}>
          <LinkContainer to="/account/profile">
            <div className="profile-section">
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
            <div className="profile-section">
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
