// Dependencies
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import { TextField } from "components/InputFields";

// Actions
import { updatePassword } from "redux/actions/user";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const passwordChangeData = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const passwordChangeValidate = Yup.object({
    oldPassword: Yup.string().required("Please enter your current password"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 charaters")
      .required("Password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Re-enter your password"),
  });

  return (
    <Formik
      initialValues={passwordChangeData}
      validationSchema={passwordChangeValidate}
      onSubmit={(values) => dispatch(updatePassword(values))}
    >
      {({ handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit} className="my-2">
          <TextField
            label="Current Password"
            name="oldPassword"
            type="password"
            placeholder="Enter your current password"
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter your new password"
          />
          <TextField
            label="Re-enter New Password"
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm your new password"
          />
          {profile.error && (
            <Alert className="my-3" variant="danger">
              {profile.error}
            </Alert>
          )}
          {profile.isUpdatedPassword && (
            <Alert className="my-3" variant="success">
              Your password has been changed successfully
            </Alert>
          )}
          <Button style={{ width: "100%" }} variant="dark" type="submit">
            Update Password
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePassword;
