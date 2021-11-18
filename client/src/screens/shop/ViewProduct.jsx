import { Button, Modal, Row, Col } from "react-bootstrap";

const ViewProduct = ({ show, onHide, product }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Images</p>
        {product.productImages.length > 0 ? (
          <Row>
            {product.productImages.map((image, index, array) => (
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
          Description: <span className="text-muted">{product.description}</span>
        </p>
        <p>
          Category: <span className="text-muted">{product.category}</span>
        </p>
        <p>
          Price: <span className="text-muted">Rs. {product.price}</span>
        </p>
        <p>
          Count in stock: <span className="text-muted">{product.countInStock}</span>
        </p>
        <p>
          Pet Type: <span className="text-muted"> {product.petType.join(", ")}</span>
        </p>
        <p>
          Breed Type: <span className="text-muted">{product.breedType}</span>
        </p>
        <p>
          Weight: <span className="text-muted">{product.weight} grams</span>
        </p>
        <p>
          Dimensions:{" "}
          <span className="text-muted">
            {product.size.length}cm x {product.size.height}cm x {product.size.width}cm
          </span>
        </p>
        <p>
          Age Range:{" "}
          <span className="text-muted">
            {product.ageRange.min}-{product.ageRange.max}yrs
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

export default ViewProduct;
