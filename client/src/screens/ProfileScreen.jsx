import React, { useEffect } from "react";
import { Tab, Row, Col, Nav, Form, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import { TextField, CheckBoxOptions, SelectField } from "../components/InputFields";
import { clearErrors, updatePassword, updateProfile } from "../redux/actions/user";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

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

  const customerProfileChangeData = {
    name: "",
  };
  const customerProfileChangeValidate = Yup.object({
    name: Yup.string()
      .min(3, "Must be atleast 3 characters")
      .max(32, "Must be 32 characters or less")
      .required("Please enter your new name"),
  });

  const clientProfileChangeData = user;
  const clientProfileChangeValidate = Yup.object({
    name: Yup.string()
      .min(3, "Must be atleast 3 characters")
      .max(32, "Must be 32 characters or less")
      .required("Please enter your new name"),
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

  const categoryOptions = ["Dog", "Cat", "Bird", "Others"];
  const stateOptions = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const CustomerProfileUpdate = () => {
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

  const ClientProfileUpdate = () => {
    return (
      <Formik
        initialValues={clientProfileChangeData}
        validationSchema={clientProfileChangeValidate}
        onSubmit={(values) => dispatch(updateProfile(values))}
      >
        {({ handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <TextField
              label="Business/Store name"
              name="storeName"
              type="text"
              placeholder="Enter your business name here"
            />
            <CheckBoxOptions label="Category" options={categoryOptions} name="category" />
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
                <SelectField
                  label="State"
                  name="state"
                  options={stateOptions}
                  defaultValue={user.state}
                />
              </Col>
              <Col sm={12} md={4}>
                <TextField label="Pincode" name="pincode" type="number" placeholder="Zip" />
              </Col>
            </Row>
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

  return (
    <Container className="my-3">
      <Tab.Container id="profile-tabs" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Profile Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Update Password</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Update Details</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control placeholder={user.name} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control placeholder={user.email} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Account Type</Form.Label>
                  <Form.Control placeholder={user.role} disabled />
                </Form.Group>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
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
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                {user.role === "Client" ? <ClientProfileUpdate /> : <CustomerProfileUpdate />}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default ProfileScreen;
