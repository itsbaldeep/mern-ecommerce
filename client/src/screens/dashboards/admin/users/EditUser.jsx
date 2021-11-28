// Dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Alert, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import { TextField } from "components/InputFields.jsx";

// Actions
import { editUser, editUserReset } from "redux/actions/user";

const EditUser = ({ show, onHide, user, userId }) => {
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(editUserReset());
  }, [dispatch]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="d-flex justify-content-between">
        <Modal.Title>Edit User</Modal.Title>
        {user.profileImage && (
          <a href={user.profileImage}>
            <img
              src={user.profileImage || "/assets/placeholders/portrait.png"}
              alt="Profile"
              height="50px"
            />
          </a>
        )}
      </Modal.Header>
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          number: user.number,
          password: "",
          profileImage: null,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string().email("Provide a valid email").required("Email is required"),
          password: Yup.string().min(8, "Password should be atleast 8 characters"),
        })}
        onSubmit={(values) => {
          // Converting to FormData
          const fd = new FormData();
          if (user.name !== values.name) fd.append("name", values.name);
          if (user.email !== values.email) fd.append("email", values.email);
          if (user.number !== values.number) fd.append("number", values.number);
          if (values.password !== "") fd.append("password", values.password);
          if (values.profileImage !== null) fd.append("profileImage", values.profileImage);
          // fd.forEach((value, key) => console.log(`${key}: ${value}`));
          dispatch(editUser(fd, userId));
          // console.log(values);
        }}
      >
        {({ values, errors, handleSubmit, setFieldValue }) => (
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Profile Image</Form.Label>
                <input
                  type="file"
                  name="profileImage"
                  className="form-control"
                  values={values.profileImage}
                  onChange={(e) => setFieldValue("profileImage", e.currentTarget.files[0])}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.profileImage}
                </Form.Control.Feedback>
              </Form.Group>
              <TextField name="name" label="Name" placeholder="Enter the user's name" />
              <TextField name="email" label="Email" placeholder="Enter the user's email" />
              <TextField
                name="password"
                label="Password (Enter a new password to update)"
                placeholder="Enter the user's password"
                type="password"
              />
              <TextField
                name="number"
                label="Phone Number"
                placeholder="9876543210"
                type="number"
              />
              {error && (
                <Alert className="my-1" variant="danger">
                  {error}
                </Alert>
              )}
              {isUpdated && (
                <Alert className="my-1" variant="success">
                  User has been updated succesfully
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

export default EditUser;
