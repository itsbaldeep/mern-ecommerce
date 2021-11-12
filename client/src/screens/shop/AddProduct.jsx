import { Button, Modal, Form, Row, Col, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { TextField, SelectField, CheckBoxOptions, CheckBox } from "components/InputFields.jsx";
import { addProduct, clearErrors } from "redux/actions/product";

const AddProduct = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const initialValues = {
    name: "",
    description: "",
    category: "Others",
    price: 0,
    countInStock: 0,
    petType: [],
    breedType: "",
    weight: 0,
    size: {
      length: 0,
      height: 0,
      width: 0,
    },
    isVeg: false,
    ageRange: {
      min: 0,
      max: 0,
    },
    productImages: null,
  };

  const validationSchema = Yup.object({
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
    countInStock: Yup.number()
      .positive("Please provide a positive count")
      .required("Please provide a count in stock"),
    petType: Yup.array().min(1, "Please provide a pet type").of(Yup.string()),
    breedType: Yup.string(),
    weight: Yup.number().positive("Weight must be positive"),
    size: Yup.object({
      length: Yup.number().positive("Length must be positive"),
      height: Yup.number().positive("Height must be positive"),
      width: Yup.number().positive("Width must be positive"),
    }),
    isVeg: Yup.boolean(),
    ageRange: Yup.object({
      min: Yup.number().min(0, "Minimum age should be atleast 0"),
      max: Yup.number().min(0, "Maximum age should be atleast 0"),
    }),
  });

  const handleProductAdd = (values) => {
    // const product = {
    //   ...values,
    //   size: {
    //     length: values.length,
    //     width: values.width,
    //     height: values.height,
    //   },
    //   ageRange: {
    //     min: values.min,
    //     max: values.max,
    //   },
    // };

    // delete product.length;
    // delete product.height;
    // delete product.width;
    // delete product.min;
    // delete product.max;

    // dispatch(addProduct(product));
    console.log(values);
  };

  const categoryOptions = [
    "Food",
    "Cosmetic",
    "Accessory",
    "Vaccination",
    "Medicine",
    "Clothing",
    "Other",
  ];
  const petTypeOptions = ["Dog", "Cat", "Bird", "Fish", "Other"];

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add a new product</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleProductAdd(values)}
      >
        {({ errors, setErrors, setFieldValue, handleSubmit }) => (
          <Form noValidation onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <input
                  type="file"
                  name="productImages"
                  className={`form-control ${!!errors.productImages ? "is-invalid" : ""}`}
                  multiple
                  onChange={(e) => {
                    if (e.currentTarget.files.length > spaceLeft)
                      return setErrors({
                        productImages: `You can only upload ${spaceLeft} more images`,
                      });
                    setFieldValue("productImages", e.currentTarget.files);
                  }}
                />
                <div className="invalid-feedback">{errors.productImages}</div>
              </Form.Group>
              <TextField name="name" label="Product Name" placeholder="Enter the product name" />
              <TextField
                name="description"
                label="Description"
                placeholder="Provide a product description"
                as="textarea"
              />
              <SelectField
                label="Category"
                options={categoryOptions}
                name="category"
                defaultValue="Others"
              />
              <Row>
                <Col sm={12} md={6}>
                  <TextField
                    name="price"
                    label="Price (in Rs.)"
                    placeholder="Enter the price"
                    type="number"
                  />
                </Col>

                <Col sm={12} md={6}>
                  <TextField
                    name="countInStock"
                    label="Count in stock"
                    placeholder="Available quantity"
                    type="number"
                  />
                </Col>
              </Row>
              <CheckBoxOptions label="Pet Type" options={petTypeOptions} name="petType" />
              <TextField name="breedType" label="Breed Type" placeholder="Compatible breeds" />
              <TextField
                name="weight"
                type="number"
                label="Weight (in grams)"
                placeholder="Weight"
              />
              <Row>
                <Col sm={12} md={4}>
                  <TextField
                    name="length"
                    type="number"
                    label="Length (in cm)"
                    placeholder="Length"
                  />
                </Col>
                <Col sm={12} md={4}>
                  <TextField
                    name="height"
                    type="number"
                    label="Height (in cm)"
                    placeholder="Height"
                  />
                </Col>
                <Col sm={12} md={4}>
                  <TextField name="width" type="number" label="Width (in cm)" placeholder="Width" />
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={6}>
                  <TextField
                    name="min"
                    type="number"
                    label="Minimum age (in yrs)"
                    placeholder="Minimum Age"
                  />
                </Col>
                <Col sm={12} md={6}>
                  <TextField
                    name="max"
                    type="number"
                    label="Maximum age (in yrs)"
                    placeholder="Maximum Age"
                  />
                </Col>
              </Row>
              <CheckBox name="isVeg" label="This product is vegetarian" />
              {error && (
                <Alert className="my-3" variant="danger">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert className="my-3" variant="success">
                  Product successfully added
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={onHide}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddProduct;
