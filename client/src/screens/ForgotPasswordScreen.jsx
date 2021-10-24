// Libraries
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import { TextField } from "../components/InputFields";

// Actions
import { clearErrors, forgotPassword } from "../redux/actions/user";

const ForgotPasswordScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { error, emailSent } = useSelector((state) => state.forgotPassword);

  // Don't let a user with token access this screen
  useEffect(() => {
    if (user.isAuthenticated) history.push("/");
    dispatch(clearErrors());
  }, [dispatch, history, user.isAuthenticated]);
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Email is invalid").required("Email is required"),
      })}
      onSubmit={({ email }) => {
        dispatch(forgotPassword(email));
      }}
    >
      {({ values, handleSubmit }) => (
        <Container style={{ maxWidth: "500px" }}>
          <h1 className="my-4">Forgot Password</h1>
          <Form noValidate onSubmit={handleSubmit}>
            <TextField label="Email" name="email" type="email" placeholder="example@gmail.com" />
            {error && (
              <Alert className="my-3" variant="danger">
                {error}
              </Alert>
            )}
            {emailSent && (
              <Alert className="my-3" variant="success">
                Email with link to reset password has been sent successfully to{" "}
                <b>{values.email}</b>
              </Alert>
            )}
            <Button style={{ width: "100%" }} variant="dark" type="submit">
              Send Reset Link
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default ForgotPasswordScreen;
