import { Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import "./AccountScreen.css";
import {
  FaBox,
  FaBoxes,
  FaCalendarCheck,
  FaHandsHelping,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";

const AccountScreen = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Container className="pt-2">
      <h2 className="my-2">Your Account</h2>
      <Row className="mt-4 profile-screen-container">
        {user.role === "Client" && (
          <>
            <Col xs={12} md={6}>
              <LinkContainer to="/account/products">
                <div className="profile-section">
                  <div>
                    <FaBoxes />
                  </div>
                  <div>
                    <h2>YOUR PRODUCTS</h2>
                    <p>Add, edit or remove your products.</p>
                  </div>
                </div>
              </LinkContainer>
            </Col>
            <Col xs={12} md={6}>
              <LinkContainer to="/account/services">
                <div className="profile-section">
                  <div>
                    <FaHandsHelping />
                  </div>
                  <div>
                    <h2>YOUR SERVICES</h2>
                    <p>Add, edit or remove your services.</p>
                  </div>
                </div>
              </LinkContainer>
            </Col>
          </>
        )}
        <Col xs={12} md={6}>
          <LinkContainer to="/account/orders">
            <div className="profile-section">
              <div>
                <FaBox />
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
            <div className="profile-section">
              <div>
                <FaCalendarCheck />
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
            <div className="profile-section">
              <div>
                <FaUserCircle />
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
                <FaShoppingCart />
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
