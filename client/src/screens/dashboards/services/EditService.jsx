// Dependencies
import { Button, Modal, Form, Row, Col, Alert, Card } from "react-bootstrap";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// Components
import { TextField } from "components/InputFields.jsx";

// Config
import { days as allDays } from "config.json";

// Helpers
import { service as initialValues } from "helpers/initialValues";
import { service as validationSchema } from "helpers/validationSchemas";
import { updateService as handleSubmit } from "helpers/handleSubmit";

// Actions
import { editService, clearErrors } from "redux/actions/service";

const EditService = ({ show, onHide, service }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.service);
  const { serviceCategories } = useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const MAX_IMAGES = 3;
  const spaceLeft = MAX_IMAGES - service.serviceImages.length;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{service.name}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues(service)}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const fd = handleSubmit(values, service);
          dispatch(editService(fd, service._id));
        }}
      >
        {({ values, touched, errors, setFieldValue, setErrors, handleSubmit }) => (
          <Form noValidation onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <h4>Images</h4>
                {service.serviceImages.length > 0 ? (
                  <Row>
                    {service.serviceImages.map((image, index, array) => (
                      <Col
                        key={image}
                        xs={6}
                        className="my-2 d-flex align-items-center justify-content-center"
                      >
                        <ImageCard
                          image={image}
                          index={index}
                          _serviceImages={array}
                          id={service._id}
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
                      name="serviceImages"
                      className={`form-control ${!!errors.serviceImages ? "is-invalid" : ""}`}
                      multiple
                      onChange={(e) => {
                        if (e.currentTarget.files.length > spaceLeft)
                          return setErrors({
                            serviceImages: `You can only upload ${spaceLeft} more images`,
                          });
                        setFieldValue("serviceImages", e.currentTarget.files);
                      }}
                    />
                    <div className="invalid-feedback">{errors.serviceImages}</div>
                  </>
                ) : (
                  <p>You can't upload any more images</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Service Name</Form.Label>
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
              <Row>
                <Col xs={12} sm={6}>
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
                <Col xs={12} sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="category">Category</Form.Label>
                    <Field
                      as="select"
                      name="category"
                      className="form-control"
                      defaultValue={values.category}
                    >
                      {serviceCategories.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={6}>
                  <TextField name="timings.from" label="From" type="time" />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField name="timings.to" label="To" type="time" />
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="days">Days</Form.Label>
                <div>
                  {allDays.map((opt, index) => (
                    <Field
                      name="days"
                      key={index}
                      as={Form.Check}
                      className="form-check-inline"
                      checked={values.days.includes(opt)}
                      isInvalid={touched.days && !!errors.days}
                      type="checkbox"
                      value={opt}
                      label={opt}
                    />
                  ))}
                </div>
              </Form.Group>
              <Row>
                <Col xs={12} sm={6}>
                  <TextField
                    name="nameOfIncharge"
                    label="Name of Incharge"
                    placeholder="Enter the name of the incharge"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField
                    name="numberOfIncharge"
                    label="Number of Incharge"
                    placeholder="Enter the number of the incharge"
                  />
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
              {error && (
                <Alert className="my-3" variant="danger">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert className="my-3" variant="success">
                  Service successfully updated
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

const ImageCard = ({ image, index, _serviceImages, id }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.service);

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
                const serviceImages = [..._serviceImages];
                serviceImages.splice(index, 1);
                const fd = new FormData();
                fd.append("serviceImages", serviceImages);
                dispatch(editService(fd, id));
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

export default EditService;
