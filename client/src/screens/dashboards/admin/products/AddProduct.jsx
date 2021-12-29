// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Row, Col, Alert, Button } from "react-bootstrap";
import { Formik } from "formik";

// Components
import {
  TextField,
  SelectField,
  CheckBox,
  CheckBoxOptions,
  TextArrayField,
  TextArrayOfObjectsField,
} from "components/InputFields.jsx";

// Helpers
import { product as initialValues } from "helpers/initialValues";
import { product as validationSchema } from "helpers/validationSchemas";
import { newProduct as handleSubmit } from "helpers/handleSubmit";

// Actions
import { addProduct } from "redux/actions/product";

const AddProduct = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, isAdded } = useSelector((state) => state.product);
  const { productCategories } = useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);

  const MAX_IMAGES = 7;
  const spaceLeft = MAX_IMAGES;

  return (
    <Modal show={show} onHide={onHide} size="xl">
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
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Text>
                  Choose between either uploading images or putting links. If you choose both, the
                  links will get priority
                </Form.Text>
                <input
                  type="file"
                  name="productImagesUpload"
                  className={`form-control ${!!errors.productImagesUpload ? "is-invalid" : ""}`}
                  multiple
                  onChange={(e) => {
                    if (e.currentTarget.files.length > spaceLeft)
                      return setErrors({
                        productImagesUpload: `You can only upload upto ${spaceLeft} images`,
                      });
                    setFieldValue("productImagesUpload", e.currentTarget.files);
                  }}
                />
                <div className="invalid-feedback">{errors.productImagesUpload}</div>
              </Form.Group>
              <TextArrayField
                name="productImages"
                label="Product Images"
                placeholder="Enter link for product image"
                message="No image links added yet"
                size="sm"
              />
              <TextField name="name" label="Product Name" placeholder="Enter the product name" />
              <TextField
                name="description"
                label="Description"
                placeholder="Provide a product description"
                as="textarea"
              />
              <SelectField
                label="Category"
                options={productCategories.map((category) => category.name)}
                name="category"
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
              <TextArrayOfObjectsField
                name="affiliateLinks"
                label="Affiliate Links"
                message="No links added"
                fieldType={{ productPrice: "input" }}
                fieldProps={{
                  productPrice: { type: "number" },
                }}
                placeholder={{
                  productProvider: "Provider's Name",
                  productId: "ID, eg. ASIN",
                  productLink: "Affiliate Link",
                  productPrice: "Provider's price",
                }}
                keys={["productProvider", "productLink", "productId", "productPrice"]}
              />
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
              {isAdded && (
                <Alert className="my-3" variant="success">
                  Product successfully added
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

export default AddProduct;
