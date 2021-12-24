// Dependencies
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Alert, Button, Row, Col, Card, Modal } from "react-bootstrap";
import { Formik, Field } from "formik";

// Helpers
import { product as initialValues } from "helpers/initialValues";
import { product as validationSchema } from "helpers/validationSchemas";
import { updateProduct as handleSubmit } from "helpers/handleSubmit";

// Actions
import { editProduct } from "redux/actions/product";

const EditProduct = ({ show, onHide, product, productId }) => {
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.product);
  const { productCategories } = useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);

  const MAX_IMAGES = 7;
  const spaceLeft = MAX_IMAGES - product.productImages.length;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues(product)}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const fd = handleSubmit(values, product);
          dispatch(editProduct(fd, productId));
        }}
      >
        {({ values, touched, errors, handleSubmit, setErrors, setFieldValue }) => (
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3">
                <h4>Images</h4>
                {product.productImages.length > 0 ? (
                  <Row>
                    {product.productImages.map((image, index) => (
                      <Col
                        key={image}
                        xs={6}
                        className="my-2 d-flex align-items-center justify-content-center"
                      >
                        <ImageCard image={image} index={index} product={product} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>You have no images!</p>
                )}
                {spaceLeft ? (
                  <>
                    <input
                      type="file"
                      name="productImages"
                      className={`form-control ${!!errors.productImages ? "is-invalid" : ""}`}
                      multiple
                      onChange={(e) => {
                        if (e.currentTarget.files.length > spaceLeft)
                          return setErrors({
                            productImages: `You can only upload ${spaceLeft} more images`,
                          });
                        setFieldValue("productImages", e.currentTarget.files);
                      }}
                    />
                    <div className="invalid-feedback">{errors.productImages}</div>
                  </>
                ) : (
                  <p>You can't upload any more images</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Product Name</Form.Label>
                <Field
                  name="name"
                  className={`form-control ${touched.name && !!errors.name ? "is-invalid" : ""}`}
                  value={values.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Field
                  name="description"
                  className={`form-control ${
                    touched.description && !!errors.description ? "is-invalid" : ""
                  }`}
                  as="textarea"
                  value={values.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="category">Category</Form.Label>
                    <Field
                      as="select"
                      name="category"
                      className={`form-control ${
                        touched.category && !!errors.category ? "is-invalid" : ""
                      }`}
                    >
                      {productCategories.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="seller">Seller ref (Directory only)</Form.Label>
                    <Field
                      name="seller"
                      className={`form-control ${
                        touched.seller && !!errors.seller ? "is-invalid" : ""
                      }`}
                    />
                    <Form.Control.Feedback type="invalid">{errors.seller}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="price">Price</Form.Label>
                    <Field
                      name="price"
                      className={`form-control ${
                        touched.price && !!errors.price ? "is-invalid" : ""
                      }`}
                      type="number"
                    />
                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="countInStock">Count in stock</Form.Label>
                    <Field
                      name="countInStock"
                      className={`form-control ${
                        touched.countInStock && !!errors.countInStock ? "is-invalid" : ""
                      }`}
                      type="number"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.countInStock}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="petType">Pet Type</Form.Label>
                <div>
                  {pets.map((pet, index) => (
                    <Field
                      name="petType"
                      key={index}
                      as={Form.Check}
                      className="form-check-inline"
                      checked={values.petType.includes(pet.name)}
                      type="checkbox"
                      value={pet.name}
                      label={pet.name}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="breedType">Breed Type</Form.Label>
                <Field name="breedType" as={Form.Control} value={values.breedType} />
                <Form.Control.Feedback type="invalid">{errors.breedType}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="weight">Weight (in grams)</Form.Label>
                <Field name="weight" as={Form.Control} type="number" value={values.weight} />
                <Form.Control.Feedback type="invalid">{errors.weight}</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col xs={12} sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="size.length">Length (in cms)</Form.Label>
                    <Field name="size.length" as={Form.Control} type="number" />
                    <Form.Control.Feedback type="invalid">
                      {errors.size?.length}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="size.height">Height (in cms)</Form.Label>
                    <Field name="size.height" as={Form.Control} type="number" />
                    <Form.Control.Feedback type="invalid">
                      {errors.size?.height}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="size.width">Width (in cms)</Form.Label>
                    <Field name="size.width" as={Form.Control} type="number" />
                    <Form.Control.Feedback type="invalid">
                      {errors.size?.width}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="ageRange.min">Minimum Age (in yrs)</Form.Label>
                    <Field name="ageRange.min" as={Form.Control} type="number" />
                    <Form.Control.Feedback type="invalid">
                      {errors.ageRange?.min}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="max">Maximum Age (in yrs)</Form.Label>
                    <Field name="ageRange.max" as={Form.Control} type="number" />
                    <Form.Control.Feedback type="invalid">
                      {errors.ageRange?.max}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Field
                  name="isVeg"
                  as={Form.Check}
                  checked={values.isVeg}
                  label="This product is vegetarian"
                />
                <Form.Control.Feedback type="invalid">{errors.isVeg}</Form.Control.Feedback>
              </Form.Group>
              {error && (
                <Alert className="my-1" variant="danger">
                  {error}
                </Alert>
              )}
              {isUpdated && (
                <Alert className="my-1" variant="success">
                  Product has been updated succesfully
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={onHide}>
                Cancel
              </Button>
              <Button
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {loading ? "Updating" : "Update"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const ImageCard = ({ image, index, product }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card style={{ width: "10rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body className="d-flex justify-content-center align-items-center">
        <Button variant="danger" onClick={handleShow}>
          Delete
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete image</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={loading}
              onClick={(e) => {
                const productImages = [...product.productImages];
                productImages.splice(index, 1);
                const fd = new FormData();
                fd.append("productImages", productImages);
                dispatch(editProduct(fd, product._id));
                handleClose();
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default EditProduct;
