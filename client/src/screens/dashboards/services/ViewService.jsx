// Dependencies
import { Button, Modal, Row, Col } from "react-bootstrap";

const ViewService = ({ show, onHide, service }) => {
  // Converting days to readable format
  let arr = [];
  let byte = service.days;
  while (byte) {
    arr.push((byte & 1) === 1);
    byte >>= 1;
  }
  const daysOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const days = daysOptions.filter((_, index) => arr[index]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{service.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Images</p>
        {service.serviceImages.length > 0 ? (
          <Row>
            {service.serviceImages.map((image, index, array) => (
              <Col
                key={image}
                xs={6}
                className="my-2 d-flex align-items-center justify-content-center"
              >
                <img src={image} width="175px" alt="" />
              </Col>
            ))}
          </Row>
        ) : (
          <p>You have no images!</p>
        )}
        <p>
          Description: <span className="text-muted">{service.description}</span>
        </p>
        <p>
          Category: <span className="text-muted">{service.category}</span>
        </p>
        <p>
          Price: <span className="text-muted">Rs. {service.price}</span>
        </p>
        <p>
          Pet Type: <span className="text-muted"> {service.petType.join(", ")}</span>
        </p>
        {service.breedType && (
          <p>
            Breed Type: <span className="text-muted">{service.breedType}</span>
          </p>
        )}
        <p>
          Address: <span className="text-muted">{service.address}</span>
        </p>
        <p>
          Name of Incharge: <span className="text-muted">{service.nameOfIncharge}</span>
        </p>
        <p>
          Number of Incharge: <span className="text-muted">{service.numberOfIncharge}</span>
        </p>
        <p>
          Timings:{" "}
          <span className="text-muted">
            {service.timings.from} to {service.timings.to}
          </span>
        </p>
        <p>
          Days: <span className="text-muted">{days.join(", ")}</span>
        </p>
        <p>
          Age Range:
          <span className="text-muted">
            {service.ageRange.min}-{service.ageRange.max}yrs
          </span>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewService;
