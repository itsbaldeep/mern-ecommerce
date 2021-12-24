// Dependencies
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Alert, Button, Row, Col, Card, Modal } from "react-bootstrap";
import { Formik, Field } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Components
import {
  TextField,
  TextArrayField,
  TextArrayOfObjectsField,
  TimingsField,
} from "components/InputFields.jsx";

// Config
import { states } from "config.json";

// Helpers
import { directoryUpdate as initialValues } from "helpers/initialValues";
import { directoryUpdate as validationSchema } from "helpers/validationSchemas";
import { directoryUpdate as handleSubmit } from "helpers/handleSubmit";

// Actions
import { editDirectory } from "redux/actions/directory";

const EditDirectory = ({ show, onHide, directory, directoryId }) => {
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.directory);
  const { directoryCategories } = useSelector((state) => state.category);

  const MAX_IMAGES = 5;
  const spaceLeft = MAX_IMAGES - directory.directoryImages.length;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Edit Directory</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues(directory)}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const fd = handleSubmit(values, directory);
          dispatch(editDirectory(fd, directoryId));
        }}
      >
        {({ values, errors, touched, handleSubmit, setErrors, setFieldValue }) => (
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="storeName">Business/Store Name</Form.Label>
                <Field
                  name="storeName"
                  as={Form.Control}
                  value={values.storeName}
                  isInvalid={touched.storeName && !!errors.storeName}
                />
                <Form.Control.Feedback type="invalid">{errors.storeName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="category">Category</Form.Label>
                <div>
                  {directoryCategories.map((category, index) => (
                    <Field
                      name="category"
                      key={index}
                      as={Form.Check}
                      className="form-check-inline"
                      checked={values.category.includes(category.name)}
                      isInvalid={touched.category && !!errors.category}
                      type="checkbox"
                      value={category.name}
                      label={category.name}
                    />
                  ))}
                </div>
              </Form.Group>
              <Row>
                <Col xs={12} sm={6}>
                  <TextField name="user" label="User ref" placeholder="Link a user account" />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField
                    name="number"
                    label="Phone Number"
                    placeholder="9876543210"
                    type="number"
                  />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="address">Address</Form.Label>
                <Field
                  name="address"
                  as={Form.Control}
                  value={values.address}
                  isInvalid={touched.address && !!errors.address}
                />
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col xs={12} sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="city">City</Form.Label>
                    <Field
                      name="city"
                      as={Form.Control}
                      value={values.city}
                      isInvalid={touched.city && !!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="state">State</Form.Label>
                    <Field as="select" name="state" className="form-control">
                      {states.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </Field>
                    <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="pincode">Pincode</Form.Label>
                    <Field
                      name="pincode"
                      as={Form.Control}
                      value={values.pincode}
                      isInvalid={touched.pincode && !!errors.pincode}
                    />
                    <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Directory Images</Form.Label>
                {directory.directoryImages.length > 0 ? (
                  <Row>
                    {directory.directoryImages.map((image, index) => (
                      <Col key={image} xs={6} className="my-2">
                        <ImageCard image={image} index={index} directory={directory} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>This directory has no images!</p>
                )}
                {spaceLeft ? (
                  <>
                    <input
                      type="file"
                      name="directoryImages"
                      className={`form-control ${!!errors.directoryImages ? "is-invalid" : ""}`}
                      multiple
                      onChange={(e) => {
                        if (e.currentTarget.files.length > spaceLeft)
                          return setErrors({
                            directoryImages: `You can only upload ${spaceLeft} more images`,
                          });
                        setFieldValue("directoryImages", e.currentTarget.files);
                      }}
                    />
                    <div className="invalid-feedback">{errors.directoryImages}</div>
                  </>
                ) : (
                  <p>You can't upload any more images</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={values.description}
                  onChange={(_, editor) => setFieldValue("description", editor.getData())}
                />
                <div className="invalid-feedback">{errors.description}</div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="tagline">Tagline</Form.Label>
                <Field
                  name="tagline"
                  value={values.tagline}
                  className={`form-control ${
                    touched.tagline && !!errors.tagline ? "is-invalid" : ""
                  }`}
                />
                <Form.Control.Feedback type="invalid">{errors.tagline}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="website">Website</Form.Label>
                <Field
                  name="website"
                  value={values.website}
                  className={`form-control ${
                    touched.website && !!errors.website ? "is-invalid" : ""
                  }`}
                />
                <Form.Control.Feedback type="invalid">{errors.website}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Field
                  name="username"
                  value={values.username}
                  className={`form-control ${
                    touched.username && !!errors.username ? "is-invalid" : ""
                  }`}
                />
                <Form.Text>
                  Your website will be https://petohub.com/{values.username || "<username>"}
                </Form.Text>
                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col xs={12} sm={6}>
                  <TextField name="location.lat" label="Latitude" type="number" />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField name="location.lng" label="Longitude" type="number" />
                </Col>
              </Row>
              <TextArrayField
                name="gallery"
                label="Gallery"
                placeholder="Enter the link to the image"
                message="No images added!"
                size="sm"
              />
              <TextArrayField
                name="products"
                label="Products"
                placeholder="Enter product's name"
                message="No products added!"
                size="sm"
              />
              <TextArrayField
                name="services"
                label="Services"
                placeholder="Enter service's name"
                message="No services added!"
                size="sm"
              />
              <TextArrayField
                name="features"
                label="Features"
                placeholder="Describe the feature briefly"
                message="No features added!"
                size="sm"
              />
              <TextArrayOfObjectsField
                name="details"
                label="Details"
                placeholder={{ title: "Title", content: "Description" }}
                keys={["title", "content"]}
                fieldType={["", "textarea"]}
                message="No details added!"
                size="sm"
              />
              <TextArrayOfObjectsField
                name="faq"
                label="FAQs"
                placeholder={{ question: "Question", answer: "Answer" }}
                keys={["question", "answer"]}
                fieldType={["", "textarea"]}
                message="No FAQs added!"
                size="sm"
              />
              <TimingsField name="timings" label="Timings (From - To)" size="sm" />
              {error && (
                <Alert className="my-1" variant="danger">
                  {error}
                </Alert>
              )}
              {isUpdated && (
                <Alert className="my-1" variant="success">
                  Directory has been updated succesfully
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

const ImageCard = ({ image, index, directory }) => {
  const dispatch = useDispatch();

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
              onClick={(e) => {
                const directoryImages = [...directory.directoryImages];
                directoryImages.splice(index, 1);
                const fd = new FormData();
                fd.append("directoryImages", directoryImages);
                dispatch(editDirectory(fd, directory._id));
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

export default EditDirectory;
