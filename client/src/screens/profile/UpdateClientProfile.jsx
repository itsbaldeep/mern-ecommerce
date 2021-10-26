// Dependencies
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Row, Col, Form, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { updateProfile } from "redux/actions/user";

const UpdateClientProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);

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
    number: Yup.string()
      .matches(
        /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
        "Please provide a valid phone number"
      )
      .required("Please provide a phone number"),
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

  return (
    <Formik
      initialValues={clientProfileChangeData}
      validationSchema={clientProfileChangeValidate}
      onSubmit={(values) => dispatch(updateProfile(values))}
    >
      {({ values, touched, errors, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit} className="pb-2">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Your Name</Form.Label>
            <Field
              name="name"
              as={Form.Control}
              value={values.name}
              isInvalid={touched.name && !!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="storeName">Business/Store Name</Form.Label>
            <Field
              name="storeName"
              as={Form.Control}
              value={values.storeName}
              isInvalid={touched.storeName && !!errors.storeName}
            />
            <Form.Control.Feedback type="invalid">{errors.storeName}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="category">Category</Form.Label>
            <div>
              {categoryOptions.map((opt, index) => (
                <Field
                  name="category"
                  key={index}
                  as={Form.Check}
                  className="form-check-inline"
                  checked={values.category.includes(opt)}
                  isInvalid={touched.category && !!errors.category}
                  type="checkbox"
                  value={opt}
                  label={opt}
                />
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="number">Phone Number</Form.Label>
            <Field
              name="number"
              as={Form.Control}
              value={values.number}
              isInvalid={touched.number && !!errors.number}
            />
            <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="address">Address</Form.Label>
            <Field
              name="address"
              as={Form.Control}
              value={values.address}
              isInvalid={touched.address && !!errors.address}
            />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="city">City</Form.Label>
                <Field
                  name="city"
                  as={Form.Control}
                  value={values.city}
                  isInvalid={touched.city && !!errors.city}
                />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="state">State</Form.Label>
                <Field as="select" name="state" className="form-control">
                  {stateOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Field>
                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="pincode">Pincode</Form.Label>
                <Field
                  name="pincode"
                  as={Form.Control}
                  value={values.pincode}
                  isInvalid={touched.pincode && !!errors.pincode}
                />
                <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
              </Form.Group>
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

export default UpdateClientProfile;
