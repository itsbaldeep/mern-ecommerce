// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Row, Col, Alert, Button } from "react-bootstrap";
import { Formik, FieldArray, Field } from "formik";
import * as Yup from "yup";

// Components
import { TextField } from "components/InputFields.jsx";

// Actions
import { addPet } from "redux/actions/pet";

const AddPet = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, isAdded } = useSelector((state) => state.pet);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add a new pet</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: "",
          description: "",
          breeds: [],
          image: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Pet name is required"),
        })}
        onSubmit={(values) => dispatch(addPet(values))}
      >
        {({ values, touched, errors, handleSubmit }) => (
          <Form>
            <Modal.Body>
              <TextField name="image" label="Pet image" placeholder="Enter the link to the image" />
              <TextField name="name" label="Pet name" placeholder="Enter the pet name" />
              <TextField
                name="description"
                label="Pet description"
                placeholder="Enter the pet description"
              />
              <Form.Group className="mb-3">
                <FieldArray name="breeds">
                  {({ push, remove }) => (
                    <div>
                      <div className="d-flex justify-content-between">
                        <h4>Breeds</h4>
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
                      {values.breeds.map((_, index) => {
                        return (
                          <Row className="mt-3" key={index}>
                            <Col md={10}>
                              <Form.Group>
                                <Field
                                  name={`breeds.${index}`}
                                  placeholder="Breed name"
                                  className={`form-control ${
                                    touched.breeds?.[index] && !!errors.breeds?.[index]
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                ></Field>
                                <Form.Control.Feedback type="invalid">
                                  {errors.breeds?.[index]}
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
                {values.breeds.length === 0 && <p className="mt-3">No breeds added!</p>}
              </Form.Group>
              {error && (
                <Alert className="my-1" variant="danger">
                  {error}
                </Alert>
              )}
              {isAdded && (
                <Alert className="my-1" variant="success">
                  Pet has been added successfully
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
                {loading ? "Adding" : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddPet;
