// Dependencies
import { Formik } from "formik";
import { Row, Col, Form, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Config
import { states } from "config.json";

// Components
import { TextField, CheckBoxOptions, SelectField } from "components/InputFields.jsx";

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
      initialValues={initialValues(user, directory)}
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
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.profileImage}
            </Form.Control.Feedback>
          </Form.Group>
          <TextField name="name" label="Your Name" placeholder="Enter your name" />
          <TextField
            name="storeName"
            label="Business/Store Name"
            placeholder="Enter your business/store name"
          />
          <CheckBoxOptions
            name="category"
            label="Category"
            options={directoryCategories?.map((category) => category.name)}
          />
          <TextField name="number" label="Phone Number" placeholder="9876543210" />
          <TextField name="address" label="Address" placeholder="Enter your address" />
          <Row>
            <Col xs={12} sm={4}>
              <TextField name="city" label="City" placeholder="City" />
            </Col>
            <Col xs={12} sm={4}>
              <SelectField name="state" label="State" options={states} />
            </Col>
            <Col xs={12} sm={4}>
              <TextField name="pincode" label="Pincode" placeholder="Pincode" />
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
