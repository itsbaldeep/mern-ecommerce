// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Row, Col, Alert, Button } from "react-bootstrap";
import { Formik, FieldArray, Field } from "formik";
import * as Yup from "yup";

// Components
import { TextField } from "components/InputFields.jsx";

// Actions
import { editPet } from "redux/actions/pet";

const EditPet = ({ show, onHide, petId, pet }) => {
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.pet);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Edit pet</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: pet.name,
          description: pet.description,
          breeds: [...pet.breeds],
          image: pet.image,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Pet name is required"),
        })}
        onSubmit={(values) => dispatch(editPet(values, petId))}
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
                {values.breeds.length === 0 && <p className="mt-3">No breeds edited!</p>}
              </Form.Group>
              {error && (
                <Alert className="my-1" variant="danger">
                  {error}
                </Alert>
              )}
              {isUpdated && (
                <Alert className="my-1" variant="success">
                  Pet has been edited successfully
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

export default EditPet;
