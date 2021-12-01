// Dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Alert, Button, Row, Col, Card, Modal } from "react-bootstrap";
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";

// Config
import { directoryCategories, states } from "config.json";

// Actions
import { editDirectory, editDirectoryReset } from "redux/actions/directory";

const EditDirectory = ({ show, onHide, directory, directoryId }) => {
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.directory);

  useEffect(() => {
    dispatch(editDirectoryReset());
  }, [dispatch]);

  const MAX_IMAGES = 5;
  const spaceLeft = MAX_IMAGES - directory.directoryImages.length;

  // Deep copying fields from directory state object
  const features = [...directory.features];
  const details = JSON.parse(JSON.stringify(directory.details));
  const website = directory.website;
  const tagline = directory.tagline;
  const description = directory.description;
  const username = directory.username;
  const storeName = directory.storeName;
  const category = [...directory.category];
  const number = directory.number;
  const address = directory.address;
  const state = directory.state;
  const city = directory.city;
  const pincode = directory.pincode;

  const initialValues = {
    features,
    details,
    directoryImages: [],
    website,
    tagline,
    description,
    username,
    storeName,
    category,
    number,
    address,
    state,
    city,
    pincode,
  };

  const validationSchema = Yup.object({
    storeName: Yup.string()
      .min(3, "Business Name must contain atleast 3 characters")
      .max(64, "Business Name is too long")
      .required("Please provide a business name"),
    category: Yup.array().min(1, "Pick atleast one category").of(Yup.string()),
    number: Yup.string()
      .matches(
        /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
        "Please provide a valid phone number"
      )
      .required("Please provide a phone number"),
    address: Yup.string()
      .min(8, "Address is too short")
      .max(256, "Address is too long")
      .required("Please provide an address"),
    state: Yup.string().required("Please provide a state"),
    city: Yup.string().required("Please provide a city"),
    pincode: Yup.number().required("Please provide a pincode"),
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
    website: Yup.string().matches(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
      "Please provide a valid website"
    ),
    tagline: Yup.string().max(32, "The tagline is too long"),
    description: Yup.string().max(1024, "The description is too long"),
    username: Yup.string(),
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Edit Directory</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Converting to FormData and updating only modified fields
          const fd = new FormData();

          // Plain text fields
          if (values.description !== directory.description)
            fd.append("description", values.description);
          if (values.tagline !== directory.tagline) fd.append("tagline", values.tagline);
          if (values.website !== directory.website) fd.append("website", values.website);
          if (values.username !== directory.username) fd.append("username", values.username);

          if (values.storeName !== directory.storeName) fd.append("storeName", values.storeName);
          if (values.address !== directory.address) fd.append("address", values.address);
          if (values.state !== directory.state) fd.append("state", values.state);
          if (values.city !== directory.city) fd.append("city", values.city);
          if (values.pincode !== directory.pincode) fd.append("pincode", values.pincode);
          if (values.number !== directory.number) fd.append("number", values.number);

          // Category
          if (values.category.toString() !== directory.category.toString())
            fd.append("category", values.category);

          // Details
          const detailsJSON = JSON.stringify(values.details);
          if (detailsJSON !== JSON.stringify(directory.details)) fd.append("details", detailsJSON);

          // Features
          if (values.features.toString() !== directory.features.toString())
            fd.append("features", values.features);

          // Images
          const filesLength = values.directoryImages.length;
          if (filesLength > 0) {
            for (let i = 0; i < filesLength; i++)
              fd.append("directoryImages", values.directoryImages[i]);
          }
          dispatch(editDirectory(fd, directoryId));
          fd.forEach((value, key) => console.log(`${key}: ${value}`));
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
                  {directoryCategories.map((opt, index) => (
                    <Field
                      name="category"
                      key={index}
                      as={Form.Check}
                      className="form-check-inline"
                      checked={values.category.includes(opt)}
                      isInvalid={touched.category && !!errors.category}
                      type="checkbox"
                      value={opt}
                      label={opt}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="number">Phone Number</Form.Label>
                <Field
                  name="number"
                  as={Form.Control}
                  value={values.number}
                  isInvalid={touched.number && !!errors.number}
                />
                <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
              </Form.Group>
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
                <Field
                  name="description"
                  as="textarea"
                  rows={4}
                  className={`form-control ${
                    touched.description && !!errors.description ? "is-invalid" : ""
                  }`}
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
                  Your website will be https://petohub.com/{values.username || "<username>"}{" "}
                </Form.Text>
                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
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
                                  placeholder="Describe your feature briefly"
                                  className={`form-control ${
                                    touched.features?.[index] && !!errors.features?.[index]
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                ></Field>
                                <Form.Control.Feedback type="invalid">
                                  {typeof errors.features === "object"
                                    ? errors.features?.[index]
                                    : ""}
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
                          <Row key={index} className="mt-1">
                            <Col md={5}>
                              <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Field
                                  name={title}
                                  placeholder="Name of the function"
                                  className={`form-control ${
                                    containsError || titleError ? "is-invalid" : ""
                                  }`}
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
                                  onClick={(e) => {
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
                {values.details.length === 0 && <p className="mt-3">No details added!</p>}
              </Form.Group>
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
