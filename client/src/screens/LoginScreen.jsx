// Libraries
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import { TextField } from "../components/InputFields";

// Actions
import { clearErrors, login } from "../redux/actions/user";

const LoginScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Don't let a user with token access this screen
  useEffect(() => {
    if (user.isAuthenticated) history.push("/");
    dispatch(clearErrors());
  }, [dispatch, history, user.isAuthenticated]);

  // Login form fields validation
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        dispatch(login(values.email, values.password));
      }}
    >
      {({ handleSubmit }) => (
        <Container style={{ maxWidth: "500px" }}>
          <h1 className="my-4">Welcome to Petohub</h1>
          <Form noValidate onSubmit={handleSubmit}>
            <TextField label="Email" name="email" type="email" placeholder="example@gmail.com" />
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password here"
            />
            <Form.Group className="pb-1">
              <Form.Text>
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Sign up here
                </Link>
              </Form.Text>
            </Form.Group>
            <Form.Group className="pb-2">
              <Form.Text>
                Forgot password?{" "}
                <Link to="/resetpassword" className="text-primary">
                  Reset here
                </Link>
              </Form.Text>
            </Form.Group>
            {user.error && (
              <Alert className="my-3" variant="danger">
                {user.error}
              </Alert>
            )}
            <Button style={{ width: "100%" }} variant="dark" type="submit">
              Login
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
