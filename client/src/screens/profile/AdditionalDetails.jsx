// Dependencies
import { useEffect } from "react";
import { Formik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import { Form, Alert, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { clearErrors, updateProfile } from "redux/actions/user";

const AdditionalDetails = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const additionalData = JSON.parse(JSON.stringify(user));
  const additionalDataValidate = Yup.object({});

  return (
    <Formik
      initialValues={additionalData}
      validationSchema={additionalDataValidate}
      onSubmit={(values) => console.log(values.features, values.details)}
    >
      {({ errors, values, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit} className="my-2">
          <Form.Group className="mb-3">
            <FieldArray name="features">
              {({ push, remove }) => (
                <div>
                  <div className="d-flex justify-content-between">
                    <Form.Label>Features</Form.Label>
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
                  {values.features.map((feature, index) => {
                    return (
                      <Row className="mt-3">
                        <Col md={10}>
                          <Form.Group>
                            <Field
                              name={`features.${index}`}
                              placeholder="Describe your feature briefly"
                              className="form-control"
                            ></Field>
                          </Form.Group>
                        </Col>
                        <Col md={2} className="d-flex flex-row-reverse">
                          <Form.Group>
                            <button
                              className="btn btn-danger"
                              onClick={(e, index) => {
                                e.preventDefault();
                                remove(index);
                                console.log(values.features);
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
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.features}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <FieldArray name="details">
              {({ push, remove }) => (
                <div>
                  <div className="d-flex justify-content-between">
                    <Form.Label>Details</Form.Label>
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
                  {values.details.map((detail, index) => {
                    const title = `details.${index}.title`;
                    const content = `details.${index}.content`;
                    return (
                      <Row className="mt-1">
                        <Col md={5}>
                          <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Field
                              name={title}
                              placeholder="Name of the function"
                              className="form-control"
                            ></Field>
                          </Form.Group>
                        </Col>
                        <Col md={5}>
                          <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Field
                              name={content}
                              as="textarea"
                              rows="1"
                              placeholder="Describe the function broadly"
                              className="form-control"
                            ></Field>
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
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.details}
            </Form.Control.Feedback>
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

export default AdditionalDetails;
