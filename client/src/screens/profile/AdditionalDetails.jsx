// Dependencies
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { clearErrors, updateProfile } from "redux/actions/user";

const AdditionalDetails = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const additionalData = {
    profileImage: undefined,
  };
  const additionalDataValidate = Yup.object({});

  return (
    <Formik
      initialValues={additionalData}
      validationSchema={additionalDataValidate}
      onSubmit={(values) => dispatch(updateProfile(values))}
    >
      {({ errors, values, handleSubmit, setFieldValue }) => (
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
            Update Profile Image
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AdditionalDetails;
