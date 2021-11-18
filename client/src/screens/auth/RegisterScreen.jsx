// Dependencies
import { Formik } from "formik";
import { Form, Button, Container, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Componenets
import { CheckBox, TextField } from "components/InputFields.jsx";

// Actions
import { register, clearErrors } from "redux/actions/user";

const RegisterScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Don't let a user with token access this screen
  useEffect(() => {
    if (user.isAuthenticated) history.push("/");
    dispatch(clearErrors());
  }, [dispatch, history, user.isAuthenticated]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Must be atleast 3 characters")
      .max(32, "Must be 32 characters or less")
      .required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Re-enter your password"),
    terms: Yup.bool().oneOf([true], "You are required to check this"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => dispatch(register(values))}
    >
      {({ handleSubmit }) => (
        <Container className="my-2 py-4" style={{ maxWidth: "500px" }}>
          <h2 className="py-2 text-center">Sign Up With Petohub</h2>
          <Form noValidate onSubmit={handleSubmit} className="pb-3">
            <TextField label="Name" name="name" type="text" placeholder="Full Name" />
            <TextField label="Email" name="email" type="email" placeholder="example@company.com" />
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
            />
            <TextField
              label="Re-enter Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />
            <CheckBox label="I agree to the terms and conditions and privacy policy" name="terms" />
            <Form.Group className="pb-2">
              <Form.Text>
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Login here
                </Link>
              </Form.Text>
            </Form.Group>
            {user.error && (
              <Alert className="my-3" variant="danger">
                {user.error}
              </Alert>
            )}
            {user.emailSent && (
              <Alert className="my-3" variant="success">
                {user.message}
              </Alert>
            )}
            <Button style={{ width: "100%" }} disabled={user.loading} type="submit">
              {user.loading ? "Creating your account" : "Create an Account"}
            </Button>
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default RegisterScreen;
