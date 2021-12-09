// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Row, Col, Alert, Button } from "react-bootstrap";
import { Formik } from "formik";

// Components
import { TextField, SelectField, CheckBoxOptions } from "components/InputFields.jsx";

// Config
import { states } from "config.json";

// Helpers
import { directory as initialValues } from "helpers/initialValues";
import { directoryRegistration as validationSchema } from "helpers/validationSchemas";

// Actions
import { addDirectory } from "redux/actions/directory";

const AddDirectory = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, isAdded } = useSelector((state) => state.directory);
  const { directoryCategories } = useSelector((state) => state.category);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add a new directory</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => dispatch(addDirectory(values))}
      >
        {({ handleSubmit }) => (
          <Form>
            <Modal.Body>
              <TextField
                name="storeName"
                label="Business/Store name"
                placeholder="Enter the business name"
              />
              <TextField name="email" label="Email" placeholder="Enter the email address" />
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
              <TextField name="address" label="Address" placeholder="Enter the business address" />
              <CheckBoxOptions
                name="category"
                label="Category"
                options={directoryCategories.map((category) => category.name)}
              />
              <Row>
                <Col xs={12} sm={4}>
                  <SelectField name="state" label="State" options={states} defaultValue="Delhi" />
                </Col>
                <Col xs={12} sm={4}>
                  <TextField name="city" label="City" placeholder="City" />
                </Col>
                <Col xs={12} sm={4}>
                  <TextField name="pincode" label="Pincode" placeholder="Pincode" />
                </Col>
              </Row>
              {error && (
                <Alert className="my-1" variant="danger">
                  {error}
                </Alert>
              )}
              {isAdded && (
                <Alert className="my-1" variant="success">
                  Directory has been added successfully
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

export default AddDirectory;
