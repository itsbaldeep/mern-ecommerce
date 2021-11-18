// Dependencies
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import { TextField } from "components/InputFields.jsx";

// Actions
import { clearErrors, login } from "redux/actions/user";

const LoginScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Don't let a user with token access this screen
  useEffect(() => {
    if (user.isAuthenticated) history.push("/");
    dispatch(clearErrors());
  }, [dispatch, history, user.isAuthenticated]);

  // Initial values and validation schema
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => dispatch(login(values.email, values.password))}
    >
      {({ handleSubmit }) => (
        <Container className="my-2 py-4" style={{ maxWidth: "500px" }}>
          <h2 className="py-2 text-center">Welcome to Petohub</h2>
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
                <Link to="/forgotpassword" className="text-primary">
                  Reset here
                </Link>
              </Form.Text>
            </Form.Group>
            {user.error && (
              <Alert className="my-3" variant="danger">
                {user.error}
              </Alert>
            )}
            <Button style={{ width: "100%" }} disabled={user.loading} type="submit">
              {user.loading ? "Logging In" : "Login"}
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
