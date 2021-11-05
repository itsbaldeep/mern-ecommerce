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
      {({ handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit} className="my-2">
          <TextField label="Name" name="name" type="text" placeholder="Enter your new name" />
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
