// Dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Row, Col, Alert, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import { TextField, SelectField, CheckBoxOptions } from "components/InputFields.jsx";

// Config
import { serviceCategories, petTypes, days } from "config.json";

// Helpers
import { arrayToBinary } from "helpers/daysHandler";

// Actions
import { addService, addServiceReset } from "redux/actions/service";

const AddService = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, isAdded } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(addServiceReset());
  }, [dispatch]);

  const MAX_IMAGES = 5;
  const spaceLeft = MAX_IMAGES;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add a new service</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: "",
          description: "",
          address: "",
          nameOfIncharge: "",
          numberOfIncharge: "",
          timings: {
            from: "00:00",
            to: "00:00",
          },
          days: [],
          category: "Others",
          price: 0,
          petType: [],
          breedType: "",
          ageRange: {
            min: 0,
            max: 0,
          },
          serviceImages: [],
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(5, "Product name is too short")
            .max(32, "Product name is too long")
            .required("Please provide a product name"),
          description: Yup.string()
            .min(8, "Product description is too short")
            .max(1024, "Product description is too long")
            .required("Please provide a product description"),
          category: Yup.string().required("Pick atleast one category"),
          price: Yup.number()
            .positive("Price must be a positive number")
            .required("Please provide a price"),
          address: Yup.string()
            .min(8, "Address is too short")
            .max(128, "Address is too long")
            .required("Please provide address"),
          nameOfIncharge: Yup.string()
            .min(3, "Name of incharge is too short")
            .max(32, "Name of incharge is too long")
            .required("Please provide a name of the incharge for this service"),
          numberOfIncharge: Yup.string()
            .matches(
              /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/g,
              "Please provide a valid phone number of the incharge"
            )
            .required("Please provide a phone number of the incharge"),
          timings: Yup.object({
            from: Yup.string().required("Please provide timings of this service"),
            to: Yup.string().required("Please provide timings of this service"),
          }),
          days: Yup.array().min(1, "Please pick atleast one day when this service is provided"),
          petType: Yup.array().min(1, "Please provide a pet type").of(Yup.string()),
          breedType: Yup.string(),
          ageRange: Yup.object({
            min: Yup.number().min(0, "Minimum age should be atleast 0"),
            max: Yup.number().min(0, "Maximum age should be atleast 0"),
          }),
        })}
        onSubmit={(values) => {
          // Converting to FormData
          const fd = new FormData();
          for (const key in values) fd.append(key, values[key]);
          fd.set("timings", JSON.stringify(values.timings));
          fd.set("ageRange", JSON.stringify(values.ageRange));
          // Converting days to binary number
          fd.set("days", arrayToBinary(values.days));

          // Images
          const filesLength = values.serviceImages.length;
          if (filesLength > 0) {
            for (let i = 0; i < filesLength; i++) fd.set("serviceImages", values.serviceImages[i]);
          }

          dispatch(addService(fd));
        }}
      >
        {({ errors, setErrors, setFieldValue, handleSubmit }) => (
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3">
                <input
                  type="file"
                  name="serviceImages"
                  className={`form-control ${!!errors.serviceImages ? "is-invalid" : ""}`}
                  multiple
                  onChange={(e) => {
                    if (e.currentTarget.files.length > spaceLeft)
                      return setErrors({
                        serviceImages: `You can only upload upto ${spaceLeft} images`,
                      });
                    setFieldValue("serviceImages", e.currentTarget.files);
                  }}
                />
                <div className="invalid-feedback">{errors.serviceImages}</div>
              </Form.Group>
              <TextField name="name" label="Service Name" placeholder="Enter the service name" />
              <TextField
                name="description"
                label="Description"
                placeholder="Provide a service description"
                as="textarea"
              />
              <Row>
                <Col xs={12} sm={6}>
                  <TextField
                    name="price"
                    label="Price (in Rs.)"
                    placeholder="Price of this service"
                    type="number"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <SelectField
                    label="Category"
                    options={serviceCategories}
                    name="category"
                    defaultValue="Others"
                  />
                </Col>
              </Row>
              <TextField
                name="address"
                label="Address"
                placeholder="Provide the address for this service"
              />
              <Row>
                <Col xs={12} sm={6}>
                  <TextField name="timings.from" label="From" type="time" />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField name="timings.to" label="To" type="time" />
                </Col>
              </Row>
              <CheckBoxOptions label="Days" options={days} name="days" />
              <Row>
                <Col xs={12} sm={6}>
                  <TextField
                    name="nameOfIncharge"
                    label="Name of Incharge"
                    placeholder="Enter the name of the incharge"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField
                    name="numberOfIncharge"
                    label="Number of Incharge"
                    placeholder="Enter the number of the incharge"
                  />
                </Col>
              </Row>
              <CheckBoxOptions label="Pet Type" options={petTypes} name="petType" />
              <TextField name="breedType" label="Breed Type" placeholder="Compatible breeds" />
              <Row>
                <Col xs={12} sm={6}>
                  <TextField
                    name="ageRange.min"
                    type="number"
                    label="Minimum age (in yrs)"
                    placeholder="Minimum Age"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <TextField
                    name="ageRange.max"
                    type="number"
                    label="Maximum age (in yrs)"
                    placeholder="Maximum Age"
                  />
                </Col>
              </Row>
              {error && (
                <Alert className="my-3" variant="danger">
                  {error}
                </Alert>
              )}
              {isAdded && (
                <Alert className="my-3" variant="success">
                  Service successfully added
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={onHide}>
                Cancel
              </Button>
              <Button
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {loading ? "Adding" : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddService;
