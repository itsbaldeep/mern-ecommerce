// Dependencies
import { Formik } from "formik";
import { Form, Container, Alert, Row, Col, Button } from "react-bootstrap";
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
import { states } from "config.json";

// Helpers
import { customerRegistration as firstValidation } from "helpers/validationSchemas";
import { directoryRegistration as secondValidation } from "helpers/validationSchemas";
import { clientRegistration as initialValues } from "helpers/initialValues";

// Actions
import { register, clearErrors } from "redux/actions/user";

const RegisterMemberScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Keeping track of form data and step
  const [data, setData] = useState(initialValues);
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
const SecondStep = ({ data, prev, next }) => {
  const dispatch = useDispatch();
  const { directoryCategories } = useSelector((state) => state.category);

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
          <CheckBoxOptions
            label="Category"
            options={directoryCategories?.map((category) => category.name)}
            name="category"
          />
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
