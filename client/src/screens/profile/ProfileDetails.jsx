import { Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Your Name</Form.Label>
        <Form.Control placeholder={user.name} disabled />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Your Email</Form.Label>
        <Form.Control placeholder={user.email} disabled />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Account Type</Form.Label>
        <Form.Control placeholder={user.role} disabled />
      </Form.Group>
      {user.role === "Client" && (
        <>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Business/Store Name</Form.Label>
                <Form.Control placeholder={user.storeName} disabled />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control placeholder={user.category.join(", ")} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder={user.number} disabled />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder={user.address} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control placeholder={user.state} disabled />
              </Form.Group>
            </Col>
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control placeholder={user.city} disabled />
              </Form.Group>
            </Col>
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control placeholder={user.pincode} disabled />
              </Form.Group>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
