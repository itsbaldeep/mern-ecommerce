// Dependencies
import { Button, Modal, Form, Row, Col, Alert, Card } from "react-bootstrap";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// Helpers
import { product as initialValues } from "helpers/initialValues";
import { product as validationSchema } from "helpers/validationSchemas";
import { updateProduct as handleSubmit } from "helpers/handleSubmit";

// Actions
import { editProduct, clearErrors } from "redux/actions/product";

const EditProduct = ({ show, onHide, product }) => {
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.product);
  const { productCategories } = useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const MAX_IMAGES = 7;
  const spaceLeft = MAX_IMAGES - product.productImages.length;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const fd = handleSubmit(values, product);
          dispatch(editProduct(fd, product._id));
        }}
      >
        {({ values, touched, errors, setFieldValue, setErrors, handleSubmit }) => (
          <Form noValidation onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <h4>Images</h4>
                {product.productImages.length > 0 ? (
                  <Row>
                    {product.productImages.map((image, index, array) => (
                      <Col
                        key={image}
                        xs={6}
                        className="my-2 d-flex align-items-center justify-content-center"
                      >
                        <ImageCard
                          image={image}
                          index={index}
                          _productImages={array}
                          id={product._id}
                        />
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
                  as={Form.Control}
                  value={values.name}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Field
                  name="description"
                  className="form-control"
                  as="textarea"
                  value={values.description}
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="category">Category</Form.Label>
                <Field
                  as="select"
                  name="category"
                  className="form-control"
                  defaultValue={values.category}
                >
                  {productCategories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="price">Price</Form.Label>
                    <Field
                      name="price"
                      as={Form.Control}
                      type="number"
                      value={values.price}
                      isInvalid={touched.price && !!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="countInStock">Count in stock</Form.Label>
                    <Field
                      name="countInStock"
                      as={Form.Control}
                      type="number"
                      value={values.countInStock}
                      isInvalid={touched.countInStock && !!errors.countInStock}
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
                      isInvalid={touched.petType && !!errors.petType}
                      type="checkbox"
                      value={pet.name}
                      label={pet.name}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="breedType">Breed Type</Form.Label>
                <Field
                  name="breedType"
                  as={Form.Control}
                  value={values.breedType}
                  isInvalid={touched.breedType && !!errors.breedType}
                />
                <Form.Control.Feedback type="invalid">{errors.breedType}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="weight">Weight (in grams)</Form.Label>
                <Field
                  name="weight"
                  as={Form.Control}
                  type="number"
                  value={values.weight}
                  isInvalid={touched.weight && !!errors.weight}
                />
                <Form.Control.Feedback type="invalid">{errors.weight}</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="size.length">Length (in cms)</Form.Label>
                    <Field
                      name="size.length"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.size?.length && !!errors.size?.length}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.size?.length}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="size.height">Height (in cms)</Form.Label>
                    <Field
                      name="size.height"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.size?.height && !!errors.size?.height}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.size?.height}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="size.width">Width (in cms)</Form.Label>
                    <Field
                      name="size.width"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.size?.width && !!errors.size?.width}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.size?.width}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="ageRange.min">Minimum Age (in yrs)</Form.Label>
                    <Field
                      name="ageRange.min"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.ageRange?.min && !!errors.ageRange?.min}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ageRange?.min}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="max">Maximum Age (in yrs)</Form.Label>
                    <Field
                      name="ageRange.max"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.ageRange?.max && !!errors.ageRange?.max}
                    />
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
                  isInvalid={touched.isVeg && !!errors.isVeg}
                  label="This product is vegetarian"
                />
                <Form.Control.Feedback type="invalid">{errors.isVeg}</Form.Control.Feedback>
              </Form.Group>
              {error && (
                <Alert className="my-3" variant="danger">
                  {error}
                </Alert>
              )}
              {isUpdated && (
                <Alert className="my-3" variant="success">
                  Product successfully updated
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={onHide}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Update
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const ImageCard = ({ image, index, _productImages, id }) => {
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
                e.preventDefault();
                const productImages = [..._productImages];
                productImages.splice(index, 1);
                const fd = new FormData();
                fd.append("productImages", productImages);
                dispatch(editProduct(fd, id));
                handleClose();
              }}
            >
              {loading ? "Deleting" : "Yes"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default EditProduct;
