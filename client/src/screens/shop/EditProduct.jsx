import { Button, Modal, Form, Row, Col, Alert } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { editProduct, clearErrors } from "redux/actions/product";

const EditProduct = ({ show, onHide, product }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const initialValues = {
    ...product,
    length: product.size.length,
    height: product.size.height,
    width: product.size.width,
    min: product.ageRange.min,
    max: product.ageRange.max,
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
    length: Yup.number().positive("Length must be positive"),
    height: Yup.number().positive("Height must be positive"),
    width: Yup.number().positive("Width must be positive"),
    isVeg: Yup.boolean(),
    min: Yup.number().min(0, "Minimum age should be atleast 0"),
    max: Yup.number().min(0, "Maximum age should be atleast 0"),
  });

  const handleProductEdit = (values) => {
    const product = {
      ...values,
      size: {
        length: values.length,
        width: values.width,
        height: values.height,
      },
      ageRange: {
        min: values.min,
        max: values.max,
      },
    };

    delete product.length;
    delete product.height;
    delete product.width;
    delete product.min;
    delete product.max;

    dispatch(editProduct(product, product._id));
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
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleProductEdit(values)}
      >
        {({ values, touched, errors, handleSubmit }) => (
          <Form noValidation onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Product Name</Form.Label>
                <Field
                  name="name"
                  as={Form.Control}
                  value={values.name}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Field
                  name="description"
                  className="form-control"
                  as="textarea"
                  value={values.description}
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="category">Category</Form.Label>
                <Field
                  as="select"
                  name="category"
                  className="form-control"
                  defaultValue={values.category}
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Field>
                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="price">Price</Form.Label>
                    <Field
                      name="price"
                      as={Form.Control}
                      type="number"
                      value={values.price}
                      isInvalid={touched.price && !!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="countInStock">Count in stock</Form.Label>
                    <Field
                      name="countInStock"
                      as={Form.Control}
                      type="number"
                      value={values.countInStock}
                      isInvalid={touched.countInStock && !!errors.countInStock}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.countInStock}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="petType">Pet Type</Form.Label>
                <div>
                  {petTypeOptions.map((opt, index) => (
                    <Field
                      name="petType"
                      key={index}
                      as={Form.Check}
                      className="form-check-inline"
                      checked={values.petType.includes(opt)}
                      isInvalid={touched.petType && !!errors.petType}
                      type="checkbox"
                      value={opt}
                      label={opt}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="breedType">Breed Type</Form.Label>
                <Field
                  name="breedType"
                  as={Form.Control}
                  value={values.breedType}
                  isInvalid={touched.breedType && !!errors.breedType}
                />
                <Form.Control.Feedback type="invalid">{errors.breedType}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="weight">Weight (in grams)</Form.Label>
                <Field
                  name="weight"
                  as={Form.Control}
                  type="number"
                  value={values.weight}
                  isInvalid={touched.weight && !!errors.weight}
                />
                <Form.Control.Feedback type="invalid">{errors.weight}</Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="length">Length (in cms)</Form.Label>
                    <Field
                      name="length"
                      as={Form.Control}
                      type="number"
                      value={values.length}
                      isInvalid={touched.length && !!errors.length}
                    />
                    <Form.Control.Feedback type="invalid">{errors.length}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="height">Height (in cms)</Form.Label>
                    <Field
                      name="height"
                      as={Form.Control}
                      type="number"
                      value={values.height}
                      isInvalid={touched.height && !!errors.height}
                    />
                    <Form.Control.Feedback type="invalid">{errors.height}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="width">Width (in cms)</Form.Label>
                    <Field
                      name="width"
                      as={Form.Control}
                      type="number"
                      value={values.width}
                      isInvalid={touched.width && !!errors.width}
                    />
                    <Form.Control.Feedback type="invalid">{errors.width}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="min">Minimum Age (in yrs)</Form.Label>
                    <Field
                      name="min"
                      as={Form.Control}
                      type="number"
                      value={values.min}
                      isInvalid={touched.min && !!errors.min}
                    />
                    <Form.Control.Feedback type="invalid">{errors.min}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="max">Maximum Age (in yrs)</Form.Label>
                    <Field
                      name="max"
                      as={Form.Control}
                      type="number"
                      value={values.max}
                      isInvalid={touched.max && !!errors.max}
                    />
                    <Form.Control.Feedback type="invalid">{errors.max}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Field
                  name="isVeg"
                  as={Form.Check}
                  checked={values.isVeg}
                  isInvalid={touched.isVeg && !!errors.isVeg}
                  label="This product is vegetarian"
                />
                <Form.Control.Feedback type="invalid">{errors.isVeg}</Form.Control.Feedback>
              </Form.Group>
              {error && (
                <Alert className="my-3" variant="danger">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert className="my-3" variant="success">
                  Product successfully updated
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={onHide}>
                Cancel
              </Button>
              <Button disabled={loading} variant="dark" type="submit">
                Update
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditProduct;
