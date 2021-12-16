// Dependencies
import { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import { Form, Alert, Button, Row, Col, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// Components
import {
  TextField,
  TextArrayField,
  TextArrayOfObjectsField,
  TimingsField,
} from "components/InputFields.jsx";

// Actions
import { clearErrors, updateProfile } from "redux/actions/user";

// Helpers
import { directoryAdditional as initialValues } from "helpers/initialValues";
import { directoryAdditional as validationSchema } from "helpers/validationSchemas";
import { directoryAdditional as submit } from "helpers/handleSubmit";

const AdditionalDetails = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const directory = user.directory;

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const MAX_IMAGES = 5;
  const spaceLeft = MAX_IMAGES - directory.directoryImages.length;

  return (
    <Formik
      initialValues={initialValues(directory)}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const fd = submit(values, directory);
        dispatch(updateProfile(fd));
      }}
    >
      {({ errors, touched, values, handleSubmit, setErrors, setFieldValue }) => (
        <Form noValidate onSubmit={handleSubmit} className="my-2">
          <Form.Group className="mb-3">
            <h4>Directory Images</h4>
            {directory.directoryImages.length > 0 ? (
              <Row>
                {directory.directoryImages.map((image, index) => (
                  <Col key={image} md={4} xs={6} className="my-2">
                    <ImageCard image={image} index={index} />
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
          <h4>General Details</h4>
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={values.description}
                  onChange={(_, editor) => setFieldValue("description", editor.getData())}
                  style={{ height: "500px" }}
                />
                <div className="invalid-feedback">{errors.description}</div>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
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
                  Your website will be https://petohub.com/{values.username || "<username>"}{" "}
                </Form.Text>
                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
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
          />
          <TextArrayField
            name="products"
            label="Products"
            placeholder="Enter product's name"
            message="No products added!"
          />
          <TextArrayField
            name="services"
            label="Services"
            placeholder="Enter service's name"
            message="No services added!"
          />
          <TextArrayField
            name="features"
            label="Features"
            placeholder="Describe the feature briefly"
            size="md"
            message="No features added!"
          />
          <TextArrayOfObjectsField
            name="details"
            label="Details"
            placeholder={{ title: "Title", content: "Description" }}
            keys={["title", "content"]}
            fieldType={["", "textarea"]}
            message="No details added!"
          />
          <TextArrayOfObjectsField
            name="faq"
            label="FAQs"
            placeholder={{ question: "Question", answer: "Answer" }}
            keys={["question", "answer"]}
            fieldType={["", "textarea"]}
            message="No FAQs added!"
          />
          <TimingsField name="timings" label="Timings (From - To)" />
          {profile.error && (
            <Alert className="my-3" variant="danger">
              {profile.error}
            </Alert>
          )}
          {profile.isUpdatedProfile && (
            <Alert className="my-3" variant="success">
              Your profile has been updated successfully
            </Alert>
          )}
          <Button style={{ width: "100%" }} type="submit">
            Update Directory Profile
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const ImageCard = ({ image, index }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const directory = user.directory;

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
                dispatch(updateProfile(fd));
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

export default AdditionalDetails;
