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
  const profile = useSelector((state) => state.profile);

  const customerProfileChangeData = {
    name: "",
  };
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
      onSubmit={(values) => dispatch(updateProfile(values))}
    >
      {({ handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit} className="my-2">
          <TextField label="Name" name="name" type="text" placeholder="Enter your new name" />
          {profile.isUpdatedDetails && (
            <Alert className="my-3" variant="success">
              Your profile details has been updated successfully
            </Alert>
          )}
          <Button style={{ width: "100%" }} variant="dark" type="submit">
            Update Details
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateCustomerProfile;
