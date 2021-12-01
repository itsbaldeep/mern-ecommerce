// Dependencies
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Alert, Button, Row, Col, Card, Modal } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";

// Config
import { serviceCategories, petTypes, days } from "config.json";

// Components
import { TextField } from "components/InputFields.jsx";

// Helpers
import { arrayToBinary, binaryToArray } from "helpers/daysHandler";

// Actions
import { editService, editServiceReset } from "redux/actions/service";

const EditService = ({ show, onHide, service, serviceId }) => {
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(editServiceReset());
  }, [dispatch]);

  const MAX_IMAGES = 5;
  const spaceLeft = MAX_IMAGES - service.serviceImages.length;

  const initialValues = {
    name: service.name,
    petType: [...service.petType],
    description: service.description,
    category: service.category,
    price: service.price,
    address: service.address,
    nameOfIncharge: service.nameOfIncharge,
    numberOfIncharge: service.numberOfIncharge,
    timings: JSON.parse(JSON.stringify(service.timings)),
    // Converting days to readable format
    days: binaryToArray(service.days),
    breedType: service.breedType,
    ageRange: JSON.parse(JSON.stringify(service.ageRange)),
    serviceImages: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Product name is too short")
      .max(32, "Product name is too long")
      .required("Please provide a product name"),
    description: Yup.string()
      .min(8, "Product description is too short")
      .max(1024, "Product description is too long")
      .required("Please provide a product description"),
    category: Yup.string().required("Pick atleast one category"),
    price: Yup.number()
      .positive("Price must be a positive number")
      .required("Please provide a price"),
    address: Yup.string()
      .min(8, "Address is too short")
      .max(128, "Address is too long")
      .required("Please provide address"),
    nameOfIncharge: Yup.string()
      .min(3, "Name of incharge is too short")
      .max(32, "Name of incharge is too long")
      .required("Please provide a name of the incharge for this service"),
    numberOfIncharge: Yup.string()
      .matches(
        /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
        "Please provide a valid phone number of the incharge"
      )
      .required("Please provide a phone number of the incharge"),
    timings: Yup.object({
      from: Yup.string().required("Please provide timings of this service"),
      to: Yup.string().required("Please provide timings of this service"),
    }),
    days: Yup.array().min(1, "Please pick atleast one day when this service is provided"),
    petType: Yup.array().min(1, "Please provide a pet type").of(Yup.string()),
    breedType: Yup.string(),
    ageRange: Yup.object({
      min: Yup.number().min(0, "Minimum age should be atleast 0"),
      max: Yup.number().min(0, "Maximum age should be atleast 0"),
    }),
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Converting days to binary number
          const daysBinary = arrayToBinary(values.days);

          // Converting to FormData and updating only modified fields
          const fd = new FormData();

          // Plain text fields
          if (values.name !== service.name) fd.append("name", values.name);
          if (values.description !== service.description)
            fd.append("description", values.description);
          if (values.category !== service.category) fd.append("category", values.category);
          if (values.price !== service.price) fd.append("price", values.price);
          if (values.address !== service.address) fd.append("address", values.address);
          if (values.nameOfIncharge !== service.nameOfIncharge)
            fd.append("nameOfIncharge", values.nameOfIncharge);
          if (values.numberOfIncharge !== service.numberOfIncharge)
            fd.append("numberOfIncharge", values.numberOfIncharge);
          if (values.breedType !== service.breedType) fd.append("breedType", values.breedType);
          if (daysBinary !== service.days) fd.append("days", daysBinary);

          // Object fields
          const timingsJSON = JSON.stringify(values.timings);
          if (timingsJSON !== JSON.stringify(service.timings)) fd.append("timings", timingsJSON);
          const ageRangeJSON = JSON.stringify(values.ageRange);
          if (ageRangeJSON !== JSON.stringify(service.ageRange))
            fd.append("ageRange", ageRangeJSON);

          // Array fields
          if (values.petType.toString() !== service.petType.toString())
            fd.append("petType", values.petType);

          // Images
          const filesLength = values.serviceImages.length;
          if (filesLength > 0) {
            for (let i = 0; i < filesLength; i++)
              fd.append("serviceImages", values.serviceImages[i]);
          }

          dispatch(editService(fd, serviceId));
        }}
      >
        {({ values, errors, touched, handleSubmit, setErrors, setFieldValue }) => (
          <Form>
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
                      {serviceCategories.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
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
                  {days.map((opt, index) => (
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
                  {petTypes.map((opt, index) => (
                    <Field
                      name="petType"
                      key={index}
                      as={Form.Check}
                      className="form-check-inline"
                      checked={values.petType.includes(opt)}
                      isInvalid={touched.petType && !!errors.petType}
                      type="checkbox"
                      value={opt}
                      label={opt}
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
              {isUpdated && (
                <Alert className="my-3" variant="success">
                  Service successfully updated
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

const ImageCard = ({ image, index, service }) => {
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
                const serviceImages = [...service?.serviceImages];
                serviceImages.splice(index, 1);
                const fd = new FormData();
                fd.append("serviceImages", serviceImages);
                dispatch(editService(fd, service._id));
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

export default EditService;
