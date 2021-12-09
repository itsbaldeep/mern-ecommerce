// Dependencies
import { Formik, Field } from "formik";
import { Row, Col, Form, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Config
import { states } from "config.json";

// Helpers
import { clientUpdate as initialValues } from "helpers/initialValues";
import { clientUpdate as validationSchema } from "helpers/validationSchemas";
import { clientUpdate as submit } from "helpers/handleSubmit";

// Actions
import { updateProfile } from "redux/actions/user";

const UpdateClientProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const { directoryCategories } = useSelector((state) => state.category);
  const directory = user.directory;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const fd = submit(values, user, directory);
        dispatch(updateProfile(fd));
      }}
    >
      {({ values, setFieldValue, touched, errors, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit} className="pb-2">
          <Form.Group className="mb-3">
            <Form.Label>Profile Image</Form.Label>
            <input
              type="file"
              name="profileImage"
              className="form-control"
              values={values.profileImage}
              onChange={(e) => setFieldValue("profileImage", e.currentTarget.files[0])}
              isInvalid={!!errors.profileImage}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.profileImage}
            </Form.Control.Feedback>
          </Form.Group>
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
              {directoryCategories.map((category, index) => (
                <Field
                  name="category"
                  key={index}
                  as={Form.Check}
                  className="form-check-inline"
                  checked={values.category.includes(category.name)}
                  isInvalid={touched.category && !!errors.category}
                  type="checkbox"
                  value={category.name}
                  label={category.name}
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
            <Col xs={12} sm={4}>
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
            <Col xs={12} sm={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="state">State</Form.Label>
                <Field as="select" name="state" className="form-control">
                  {states.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Field>
                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} sm={4}>
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
          {profile.isUpdatedProfile && (
            <Alert className="my-3" variant="success">
              Your profile details has been updated successfully
            </Alert>
          )}
          <Button style={{ width: "100%" }} type="submit">
            Update Details
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateClientProfile;
