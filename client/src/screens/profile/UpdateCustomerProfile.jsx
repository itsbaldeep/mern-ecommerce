// Dependencies
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import { TextField } from "components/InputFields";

// Actions
import { updateProfile } from "redux/actions/user";

const UpdateCustomerProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);

  const customerProfileChangeData = user;
  const customerProfileChangeValidate = Yup.object({
    name: Yup.string()
      .min(3, "Must be atleast 3 characters")
      .max(32, "Must be 32 characters or less")
      .required("Please enter your new name"),
  });

  return (
    <Formik
      initialValues={customerProfileChangeData}
      validationSchema={customerProfileChangeValidate}
      onSubmit={(values) => {
        // Updating only those fields that have been modified
        const data = {};
        for (const value in values) {
          if (values[value] !== user[value]) {
            data[value] = values[value];
          }
        }
        dispatch(updateProfile(data));
      }}
    >
      {({ values, setFieldValue, errors, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit} className="my-2">
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <input
              type="file"
              name="profileImage"
              className="form-control"
              values={values.profileImage}
              onChange={(e) => setFieldValue("profileImage", e.currentTarget.files[0])}
              isInvalid={!!errors.profileImage}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.profileImage}
            </Form.Control.Feedback>
          </Form.Group>
          <TextField label="Name" name="name" type="text" placeholder="Enter your new name" />
          {profile.error && (
            <Alert className="my-3" variant="danger">
              {profile.error}
            </Alert>
          )}
          {profile.isUpdatedProfile && (
            <Alert className="my-3" variant="success">
              Your profile details has been updated successfully
            </Alert>
          )}
          <Button style={{ width: "100%" }} type="submit">
            Update Details
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateCustomerProfile;
