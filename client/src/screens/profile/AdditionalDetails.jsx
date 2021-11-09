// Dependencies
import { useEffect } from "react";
import { Formik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { Form, Alert, Button, Row, Col, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { clearErrors, updateProfile } from "redux/actions/user";
import { useState } from "react";

const AdditionalDetails = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const MAX_IMAGES = 5;
  const spaceLeft = MAX_IMAGES - user.directoryImages.length;

  // Deep copying fields from user state object
  const features = [...user.features];
  const details = JSON.parse(JSON.stringify(user.details));

  const additionalData = { features, details, directoryImages: [] };
  const additionalDataValidate = Yup.object({
    features: Yup.array()
      .max(10, "You can only have a maximum of 10 features")
      .of(
        Yup.string()
          .required("This is a required field")
          .min(4, "This feature is too short")
          .max(16, "This feature is too long")
      ),
    details: Yup.array()
      .max(10, "You can only have a maximum of 10 details")
      .of(
        Yup.object({
          title: Yup.string()
            .required("The title is required")
            .min(4, "This title is too short")
            .max(12, "This title is too long"),
          content: Yup.string()
            .required("The description is required")
            .min(4, "This description is too short")
            .max(64, "This description is too long"),
        })
      ),
  });

  return (
    <Formik
      initialValues={additionalData}
      validationSchema={additionalDataValidate}
      onSubmit={async (values, actions) => {
        // Converting to FormData and updating only modified fields
        const fd = new FormData();

        // Details
        const detailsJSON = JSON.stringify(values.details);
        if (detailsJSON !== JSON.stringify(user.details)) fd.append("details", detailsJSON);

        // Features
        if (values.features.toString() !== user.features.toString())
          fd.append("features", values.features);

        // Images
        const filesLength = values.directoryImages.length;
        if (filesLength > 0) {
          for (let i = 0; i < filesLength; i++)
            fd.append("directoryImages", values.directoryImages[i]);
        }
        // fd.forEach((value, key) => console.log(`${key}: ${value}`));
        // if (filesLength > 0) console.log(fd.getAll("directoryImages[]"));
        dispatch(updateProfile(fd));
      }}
    >
      {({ errors, touched, values, handleSubmit, setErrors, setFieldValue }) => (
        <Form noValidate onSubmit={handleSubmit} className="my-2">
          <Form.Group className="mb-3">
            <h4>Images</h4>
            {user.directoryImages.length > 0 ? (
              <Row>
                {user.directoryImages.map((image, index) => (
                  <Col key={image} md={4} className="my-2">
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
          <Form.Group className="mb-3">
            <FieldArray name="features">
              {({ push, remove }) => (
                <div>
                  <div className="d-flex justify-content-between">
                    <h4>Features</h4>
                    <button
                      className="btn btn-success"
                      onClick={(e) => {
                        e.preventDefault();
                        push("");
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <p className="text-danger">
                    {typeof errors.features === "string" ? errors.features : ""}
                  </p>
                  {values.features.map((feature, index) => {
                    return (
                      <Row className="mt-3" key={index}>
                        <Col md={10}>
                          <Form.Group>
                            <Field
                              name={`features.${index}`}
                              isInvalid={touched.features?.[index] && !!errors.features?.[index]}
                              placeholder="Describe your feature briefly"
                              as={Form.Control}
                            ></Field>
                            <Form.Control.Feedback type="invalid">
                              {typeof errors.features === "object" ? errors.features?.[index] : ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={2} className="d-flex flex-row-reverse">
                          <Form.Group>
                            <button
                              className="btn btn-danger"
                              onClick={(e) => {
                                e.preventDefault();
                                remove(index);
                              }}
                            >
                              Remove
                            </button>
                          </Form.Group>
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              )}
            </FieldArray>
            <Form.Text>You can showcase various features your business provide</Form.Text>
            {values.features.length === 0 && <p className="mt-3">No features added!</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <FieldArray name="details">
              {({ push, remove }) => (
                <div>
                  <div className="d-flex justify-content-between">
                    <h4>Details</h4>
                    <button
                      className="btn btn-success"
                      onClick={(e) => {
                        e.preventDefault();
                        push({
                          title: "",
                          content: "",
                        });
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <p className="text-danger">
                    {typeof errors.details === "string" ? errors.details : ""}
                  </p>
                  {values.details.map((detail, index) => {
                    const title = `details.${index}.title`;
                    const content = `details.${index}.content`;
                    const containsError = touched.details?.[index] && !!errors.details?.[index];
                    const titleError =
                      containsError &&
                      touched.details[index].title &&
                      !!errors.details[index].title;
                    const contentError =
                      containsError &&
                      touched.details[index].content &&
                      !!errors.details[index].content;
                    return (
                      <Row className="mt-1">
                        <Col md={5}>
                          <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Field
                              name={title}
                              isInvalid={containsError || titleError}
                              placeholder="Name of the function"
                              as={Form.Control}
                            ></Field>
                            <Form.Control.Feedback type="invalid">
                              {typeof errors.details === "object"
                                ? errors.details?.[index]?.title
                                : ""}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={5}>
                          <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Field
                              name={content}
                              as="textarea"
                              rows={1}
                              isInvalid={contentError}
                              placeholder="Describe the function broadly"
                              className={`form-control ${
                                containsError || contentError ? "is-invalid" : ""
                              }`}
                            ></Field>
                            <div className="invalid-feedback">
                              {typeof errors.details === "object"
                                ? errors.details?.[index]?.content
                                : ""}
                            </div>
                          </Form.Group>
                        </Col>
                        <Col md={2} className="d-flex align-items-end flex-row-reverse">
                          <Form.Group>
                            <button
                              className="btn btn-danger"
                              onClick={(e, index) => {
                                e.preventDefault();
                                remove(index);
                              }}
                            >
                              Remove
                            </button>
                          </Form.Group>
                        </Col>
                        <Form.Control.Feedback type="invalid" tooltip>
                          <pre>{JSON.stringify(errors.details)}</pre>
                        </Form.Control.Feedback>
                      </Row>
                    );
                  })}
                </div>
              )}
            </FieldArray>
            <Form.Text>
              You can provide detailed description of various functions of your business
            </Form.Text>
            {values.details.length === 0 && <p className="mt-3">No details added!</p>}
          </Form.Group>
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
                const directoryImages = [...user.directoryImages];
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
