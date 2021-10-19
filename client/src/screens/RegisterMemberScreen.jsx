// Dependencies
import { Formik } from "formik";
import { Form, Container, Alert } from "react-bootstrap";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// Componenets
import { CheckBox, SelectField, TextField, FormButton } from "../components/InputFields";

// Actions
import { register, clearErrors } from "../redux/actions/user";

const RegisterMemberScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Don't let a user with token access this screen
  useEffect(() => {
    if (user.isAuthenticated) history.push("/");
    dispatch(clearErrors());
  }, [dispatch, history, user.isAuthenticated]);

  // Keeping track of form data and step
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    storeName: "",
    category: "",
    number: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    website: "",
    imageURL: "",
  });
  const [step, setStep] = useState(0);

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
    <Container style={{ maxWidth: "500px" }}>
      <h1 className="my-4 text-center">Become a member with Petohub</h1>
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
          <FormButton label="Proceed" variant="dark" type="submit" />
        </Form>
      )}
    </Formik>
  );
};

// Second Step
const secondValidation = Yup.object({
  storeName: Yup.string().required(),
  number: Yup.number().required(),
  address: Yup.string().required(),
  state: Yup.string().required(),
  city: Yup.string().required(),
  pincode: Yup.number().required(),
});
const SecondStep = ({ data, prev, next }) => {
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
          <TextField label="Phone Number" name="number" type="number" placeholder="9876543210" />
          <TextField
            label="Address"
            name="address"
            type="text"
            placeholder="Enter your business address here"
          />
          <TextField label="State" name="state" type="text" placeholder="Enter your state" />
          <TextField label="City" name="city" type="text" placeholder="Enter your city" />
          <TextField
            label="Pincode"
            name="pincode"
            type="number"
            placeholder="Enter your pincode"
          />
          <FormButton label="Back" variant="dark" onClick={() => prev(values)} />
          <FormButton label="Proceed" variant="dark" type="submit" />
        </Form>
      )}
    </Formik>
  );
};

// Third Step
const ThirdStep = ({ data, prev, next }) => {
  const user = useSelector((state) => state.user);
  return (
    <Formik
      initialValues={data}
      validationSchema={firstValidation.concat(secondValidation)}
      onSubmit={(values) => next(values, true)}
    >
      {({ values, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h1 className="text-center">Confirm your details</h1>
          <fieldset disabled>
            <TextField label="Name" name="name" />
            <TextField label="Email" name="email" />
            <TextField label="Business Name" name="storeName" />
            <TextField label="Phone Number" name="number" />
            <TextField label="Address" name="address" />
            <TextField label="City" name="city" />
            <TextField label="State" name="state" />
            <TextField label="Pincode" name="pincode" />
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
          <FormButton label="Back" variant="dark" onClick={() => prev(values)} />
          <FormButton label="Create an account" variant="dark" type="submit" />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterMemberScreen;
