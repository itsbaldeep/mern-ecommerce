// Dependencies
import { Button, Modal, Form, Row, Col, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Components
import { TextField, SelectField, CheckBoxOptions } from "components/InputFields.jsx";

// Config
import { days } from "config.json";

// Helpers
import { service as validationSchema } from "helpers/validationSchemas";
import { service as initialValues } from "helpers/initialValuess";
import { newService as handleSubmit } from "helpers/handleSubmit";

// Actions
import { addService, clearErrors } from "redux/actions/service";

const AddService = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.service);
  const { serviceCategories } = useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const MAX_IMAGES = 3;
  const spaceLeft = MAX_IMAGES;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add a new service</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const fd = handleSubmit(values);
          dispatch(addService(fd));
        }}
      >
        {({ errors, setErrors, setFieldValue, handleSubmit }) => (
          <Form noValidation onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <input
                  type="file"
                  name="serviceImages"
                  className={`form-control ${!!errors.serviceImages ? "is-invalid" : ""}`}
                  multiple
                  onChange={(e) => {
                    if (e.currentTarget.files.length > spaceLeft)
                      return setErrors({
                        serviceImages: `You can only upload upto ${spaceLeft} images`,
                      });
                    setFieldValue("serviceImages", e.currentTarget.files);
                  }}
                />
                <div className="invalid-feedback">{errors.serviceImages}</div>
              </Form.Group>
              <TextField name="name" label="Service Name" placeholder="Enter the service name" />
              <TextField
                name="description"
                label="Description"
                placeholder="Provide a service description"
                as="textarea"
              />
              <Row>
                <Col xs={12} sm={6}>
                  <TextField
                    name="price"
                    label="Price (in Rs.)"
                    placeholder="Price of this service"
                    type="number"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <SelectField
                    label="Category"
                    options={serviceCategories.map((category) => category.name)}
                    name="category"
                    defaultValue="Others"
                  />
                </Col>
              </Row>
              <TextField
                name="address"
                label="Address"
                placeholder="Provide the address for this service"
              />
              <Row>
                <Col xs={12} sm={6}>
                  <TextField name="timings.from" label="From" type="time" />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField name="timings.to" label="To" type="time" />
                </Col>
              </Row>
              <CheckBoxOptions label="Days" options={days} name="days" />
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
              <CheckBoxOptions
                label="Pet Type"
                options={pets.map((pet) => pet.name)}
                name="petType"
              />
              <TextField name="breedType" label="Breed Type" placeholder="Compatible breeds" />
              <Row>
                <Col xs={12} sm={6}>
                  <TextField
                    name="ageRange.min"
                    type="number"
                    label="Minimum age (in yrs)"
                    placeholder="Minimum Age"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField
                    name="ageRange.max"
                    type="number"
                    label="Maximum age (in yrs)"
                    placeholder="Maximum Age"
                  />
                </Col>
              </Row>
              {error && (
                <Alert className="my-3" variant="danger">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert className="my-3" variant="success">
                  Service successfully added
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={onHide}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                {loading ? "Adding" : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddService;
