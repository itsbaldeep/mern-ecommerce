// Dependencies
import { Formik } from "formik";
import { Form, Container, Alert, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// Componenets
import {
  CheckBox,
  TextField,
  FormButton,
  CheckBoxOptions,
  SelectField,
} from "components/InputFields.jsx";

// Config
import { directoryCategories, states } from "config.json";

// Actions
import { register, clearErrors } from "redux/actions/user";

const RegisterMemberScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Keeping track of form data and step
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    storeName: "",
    category: [],
    number: "",
    address: "",
    state: "Delhi",
    city: "",
    pincode: "",
    role: "Client",
  });
  const [step, setStep] = useState(0);

  // Don't let a user with token access this screen
  useEffect(() => {
    if (user.isAuthenticated) history.push("/");
    dispatch(clearErrors());
  }, [dispatch, history, user.isAuthenticated]);

  // Final submit function
  const submit = (data) => {
    dispatch(register(data));
  };

  // Step helper functions
  const nextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) return submit(newData);
    setStep((step) => step + 1);
  };
  const prevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setStep((step) => step - 1);
  };

  // Components for each step
  const steps = [
    <FirstStep next={nextStep} data={data} />,
    <SecondStep next={nextStep} prev={prevStep} data={data} />,
    <ThirdStep next={nextStep} prev={prevStep} data={data} />,
  ];
  return (
    <Container style={{ maxWidth: "500px" }} className="my-2 py-4">
      <h2 className="my-2 text-center">Become a member with Petohub</h2>
      <div>{steps[step]}</div>
    </Container>
  );
};

// First Step
const firstValidation = Yup.object({
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

export const FirstStep = ({ data, next }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <Formik
      initialValues={data}
      validationSchema={firstValidation}
      onSubmit={(values) => next(values)}
    >
      {({ handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
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
          <FormButton label="Proceed" type="submit" />
        </Form>
      )}
    </Formik>
  );
};

// Second Step
const secondValidation = Yup.object({
  storeName: Yup.string()
    .min(3, "Business Name must contain atleast 3 characters")
    .max(64, "Business Name is too long")
    .required("Please provide a business name"),
  category: Yup.array().min(1, "Pick atleast one category").of(Yup.string()),
  number: Yup.number("Please provide a valid number").required("Please provide a phone number"),
  address: Yup.string()
    .min(8, "Address is too short")
    .max(256, "Address is too long")
    .required("Please provide an address"),
  state: Yup.string().required("Please provide a state"),
  city: Yup.string().required("Please provide a city"),
  pincode: Yup.number().required("Please provide a pincode"),
});

const SecondStep = ({ data, prev, next }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <Formik
      initialValues={data}
      validationSchema={secondValidation}
      onSubmit={(values) => next(values)}
    >
      {({ values, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <TextField
            label="Business/Store name"
            name="storeName"
            type="text"
            placeholder="Enter your business name here"
          />
          <CheckBoxOptions label="Category" options={directoryCategories} name="category" />
          <TextField label="Phone Number" name="number" type="number" placeholder="9876543210" />
          <TextField
            label="Address"
            name="address"
            type="text"
            placeholder="Enter your business address here"
          />
          <Row>
            <Col sm={12} md={4}>
              <TextField label="City" name="city" type="text" placeholder="City" />
            </Col>
            <Col sm={12} md={4}>
              <SelectField label="State" name="state" options={states} defaultValue="Delhi" />
            </Col>
            <Col sm={12} md={4}>
              <TextField label="Pincode" name="pincode" type="number" placeholder="Zip" />
            </Col>
          </Row>
          <FormButton label="Back" onClick={() => prev(values)} />
          <FormButton label="Proceed" type="submit" />
        </Form>
      )}
    </Formik>
  );
};

// Third Step
const ThirdStep = ({ data, prev, next }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return (
    <Formik
      initialValues={data}
      validationSchema={firstValidation.concat(secondValidation)}
      onSubmit={(values) => next(values, true)}
    >
      {({ values, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h3 className="text-center">Confirm your details</h3>
          <fieldset disabled>
            <Row>
              <Col sm={12} md={6}>
                <TextField label="Name" name="name" />
              </Col>
              <Col sm={12} md={6}>
                <TextField label="Email" name="email" />
              </Col>
            </Row>
            <TextField label="Business Name" name="storeName" />
            <Row>
              <Col sm={12} md={6}>
                <TextField label="Phone Number" name="number" />
              </Col>
              <Col sm={12} md={6}>
                <TextField label="Category" name="category" value={values.category.join(", ")} />
              </Col>
            </Row>
            <TextField label="Address" name="address" />
            <Row>
              <Col sm={12} md={4}>
                <TextField label="City" name="city" />
              </Col>
              <Col sm={12} md={4}>
                <TextField label="State" name="state" />
              </Col>
              <Col sm={12} md={4}>
                <TextField label="Pincode" name="pincode" />
              </Col>
            </Row>
          </fieldset>
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
          <FormButton label="Back" onClick={() => prev(values)} />
          <Button style={{ width: "100%" }} disabled={user.loading} type="submit">
            {user.loading ? "Creating your account" : "Create an Account"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterMemberScreen;
