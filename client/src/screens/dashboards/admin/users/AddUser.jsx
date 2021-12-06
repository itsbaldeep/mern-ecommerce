// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Row, Col, Alert, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import { TextField, SelectField, CheckBoxOptions } from "components/InputFields.jsx";

// Config
import { states } from "config.json";

// Actions
import { addUser } from "redux/actions/user";

const AddUser = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, isAdded } = useSelector((state) => state.admin);
  const { directoryCategories } = useSelector((state) => state.category);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add a new user</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          role: "Customer",
          storeName: "",
          number: "",
          category: [],
          address: "",
          state: "Delhi",
          city: "",
          pincode: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string().email("Provide a valid email").required("Email is required"),
          password: Yup.string()
            .min(8, "Password should be atleast 8 characters")
            .required("Password is required"),
        })}
        // onSubmit={console.log}
        onSubmit={(values) => dispatch(addUser(values))}
      >
        {({ values, handleSubmit }) => (
          <Form>
            <Modal.Body>
              <TextField name="name" label="Name" placeholder="Enter the user's name" />
              <TextField name="email" label="Email" placeholder="Enter the user's email" />
              <TextField
                name="password"
                label="Password"
                placeholder="Enter the user's password"
                type="password"
              />
              <Row>
                <Col xs={12} sm={6}>
                  <TextField
                    name="number"
                    label="Phone Number"
                    placeholder="9876543210"
                    type="number"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <SelectField
                    name="role"
                    label="Role"
                    options={["Customer", "Client", "Admin"]}
                    defaultValue="Customer"
                  />
                </Col>
              </Row>
              {values.role === "Client" && (
                <>
                  <hr />
                  <TextField
                    name="storeName"
                    label="Business/Store name"
                    placeholder="Enter the business name"
                  />
                  <TextField
                    name="address"
                    label="Address"
                    placeholder="Enter the business address"
                  />
                  <CheckBoxOptions
                    name="category"
                    label="Category"
                    options={directoryCategories.map((category) => category.name)}
                  />
                  <Row>
                    <Col xs={12} sm={4}>
                      <SelectField
                        name="state"
                        label="State"
                        options={states}
                        defaultValue="Delhi"
                      />
                    </Col>
                    <Col xs={12} sm={4}>
                      <TextField name="city" label="City" placeholder="City" />
                    </Col>
                    <Col xs={12} sm={4}>
                      <TextField name="pincode" label="Pincode" placeholder="Pincode" />
                    </Col>
                  </Row>
                </>
              )}
              {error && (
                <Alert className="my-1" variant="danger">
                  {error}
                </Alert>
              )}
              {isAdded && (
                <Alert className="my-1" variant="success">
                  User has been added successfully
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

export default AddUser;
