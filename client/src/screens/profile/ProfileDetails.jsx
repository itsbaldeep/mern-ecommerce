import { Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  const { user } = useSelector((state) => state.user);
  const directory = user.directory;

  return (
    <div>
      <Row>
        <Col md={6} sm={12} className="d-flex align-items-center justify-content-center">
          <div className="mb-3 text-center profile-image">
            <img
              src={user.profileImage ? user.profileImage : "/assets/placeholders/portrait.png"}
              alt=""
            />
          </div>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control placeholder={user.name} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Your Email</Form.Label>
            <Form.Control placeholder={user.email} disabled />
          </Form.Group>
        </Col>
      </Row>
      {user.role === "Client" && (
        <>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Business/Store Name</Form.Label>
                <Form.Control placeholder={directory.storeName} disabled />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control placeholder={directory.category.join(", ")} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder={directory.number} disabled />
              </Form.Group>
            </Col>
            <Col sm={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder={directory.address} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control placeholder={directory.state} disabled />
              </Form.Group>
            </Col>
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control placeholder={directory.city} disabled />
              </Form.Group>
            </Col>
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control placeholder={directory.pincode} disabled />
              </Form.Group>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
