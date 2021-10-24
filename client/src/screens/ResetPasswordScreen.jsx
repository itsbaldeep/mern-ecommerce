import { useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import { TextField } from "../components/InputFields";

import { clearErrors, resetPassword } from "../redux/actions/user";

const ResetPasswordScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(8, "Password must be at least 8 charaters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Re-enter your password"),
      })}
      onSubmit={({ password }) => {
        dispatch(resetPassword(match.params.resetToken, password));
      }}
    >
      {({ handleSubmit }) => (
        <Container style={{ maxWidth: "500px" }}>
          <h1 className="my-4">Reset Password</h1>
          <Form noValidate onSubmit={handleSubmit}>
            <TextField
              label="New Password"
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
            />
            <TextField
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your new password"
            />
            {error && (
              <Alert className="my-3" variant="danger">
                {error}
              </Alert>
            )}
            {success && (
              <Alert className="my-3" variant="success">
                Your password has been reset successfully.
                <br />
                <Link to="/login" className="text-primary">
                  Go to the Login Page
                </Link>
              </Alert>
            )}
            <Button style={{ width: "100%" }} variant="dark" type="submit">
              Reset Password
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default ResetPasswordScreen;
