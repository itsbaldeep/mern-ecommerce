// Dependencies
import { Button, Modal, Form, Row, Col, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Components
import { TextField, SelectField, CheckBoxOptions, CheckBox } from "components/InputFields.jsx";

// Helpers
import { product as validationSchema } from "helpers/validationSchemas";
import { product as initialValues } from "helpers/initialValues";
import { newProduct as handleSubmit } from "helpers/handleSubmit";

// Actions
import { addProduct, clearErrors } from "redux/actions/product";

const AddProduct = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const MAX_IMAGES = 7;
  const spaceLeft = MAX_IMAGES;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add a new product</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues()}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const fd = handleSubmit(values);
          dispatch(addProduct(fd));
        }}
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
                        productImages: `You can only upload upto ${spaceLeft} images`,
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
                options={categories.map((category) => category.name)}
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
              <CheckBoxOptions
                label="Pet Type"
                options={pets.map((pet) => pet.name)}
                name="petType"
              />
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
                    name="size.length"
                    type="number"
                    label="Length (in cm)"
                    placeholder="Length"
                  />
                </Col>
                <Col sm={12} md={4}>
                  <TextField
                    name="size.height"
                    type="number"
                    label="Height (in cm)"
                    placeholder="Height"
                  />
                </Col>
                <Col sm={12} md={4}>
                  <TextField
                    name="size.width"
                    type="number"
                    label="Width (in cm)"
                    placeholder="Width"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={6}>
                  <TextField
                    name="ageRange.min"
                    type="number"
                    label="Minimum age (in yrs)"
                    placeholder="Minimum Age"
                  />
                </Col>
                <Col sm={12} md={6}>
                  <TextField
                    name="ageRange.max"
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
                {loading ? "Adding" : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddProduct;
