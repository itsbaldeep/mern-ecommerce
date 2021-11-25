// Dependencies
import { Button, Modal, Form, Row, Col, Alert, Card } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// Actions
import { editProduct, clearErrors } from "redux/actions/product";

const EditProduct = ({ show, onHide, product }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const MAX_IMAGES = 7;
  const spaceLeft = MAX_IMAGES - product.productImages.length;

  const initialValues = {
    name: product.name,
    petType: [...product.petType],
    description: product.description,
    category: product.category,
    price: product.price,
    countInStock: product.countInStock,
    breedType: product.breedType,
    size: JSON.parse(JSON.stringify(product.size)),
    ageRange: JSON.parse(JSON.stringify(product.ageRange)),
    weight: product.weight,
    isVeg: product.isVeg,
    productImages: [],
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
    breedType: Yup.string().max(32, "Breed Type is too long"),
    weight: Yup.number().min(0, "Weight must be positive"),
    size: Yup.object({
      length: Yup.number().min(0, "Length must be positive"),
      height: Yup.number().min(0, "Height must be positive"),
      width: Yup.number().min(0, "Width must be positive"),
    }),
    isVeg: Yup.boolean(),
    ageRange: Yup.object({
      min: Yup.number().min(0, "Minimum age should be atleast 0"),
      max: Yup.number().min(0, "Maximum age should be atleast 0"),
    }),
  });

  const handleProductEdit = (values) => {
    // Converting to FormData and updating only modified fields
    const fd = new FormData();

    // Plain text fields
    if (values.name !== product.name) fd.append("name", values.name);
    if (values.description !== product.description) fd.append("description", values.description);
    if (values.category !== product.category) fd.append("category", values.category);
    if (values.price !== product.price) fd.append("price", values.price);
    if (values.countInStock !== product.countInStock)
      fd.append("countInStock", values.countInStock);
    if (values.isVeg !== product.isVeg) fd.append("isVeg", values.isVeg);
    if (values.weight !== product.weight) fd.append("weight", values.weight);
    if (values.breedType !== product.breedType) fd.append("breedType", values.breedType);

    // Object fields
    const sizeJSON = JSON.stringify(values.size);
    if (sizeJSON !== JSON.stringify(product.size)) fd.append("size", sizeJSON);
    const ageRangeJSON = JSON.stringify(values.ageRange);
    if (ageRangeJSON !== JSON.stringify(product.ageRange)) fd.append("ageRange", ageRangeJSON);

    // Array fields
    if (values.petType.toString() !== product.petType.toString())
      fd.append("petType", values.petType);

    // Images
    const filesLength = values.productImages.length;
    if (filesLength > 0) {
      for (let i = 0; i < filesLength; i++) fd.append("productImages", values.productImages[i]);
    }

    dispatch(editProduct(fd, product._id));
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
        {({ values, touched, errors, setFieldValue, setErrors, handleSubmit }) => (
          <Form noValidation onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <h4>Images</h4>
                {product.productImages.length > 0 ? (
                  <Row>
                    {product.productImages.map((image, index, array) => (
                      <Col
                        key={image}
                        xs={6}
                        className="my-2 d-flex align-items-center justify-content-center"
                      >
                        <ImageCard
                          image={image}
                          index={index}
                          _productImages={array}
                          id={product._id}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>You have no images!</p>
                )}
                {spaceLeft ? (
                  <>
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
                  </>
                ) : (
                  <p>You can't upload any more images</p>
                )}
              </Form.Group>
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
                    <Form.Label htmlFor="size.length">Length (in cms)</Form.Label>
                    <Field
                      name="size.length"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.size?.length && !!errors.size?.length}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.size?.length}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="size.height">Height (in cms)</Form.Label>
                    <Field
                      name="size.height"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.size?.height && !!errors.size?.height}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.size?.height}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="size.width">Width (in cms)</Form.Label>
                    <Field
                      name="size.width"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.size?.width && !!errors.size?.width}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.size?.width}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="ageRange.min">Minimum Age (in yrs)</Form.Label>
                    <Field
                      name="ageRange.min"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.ageRange?.min && !!errors.ageRange?.min}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ageRange?.min}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="max">Maximum Age (in yrs)</Form.Label>
                    <Field
                      name="ageRange.max"
                      as={Form.Control}
                      type="number"
                      isInvalid={touched.ageRange?.max && !!errors.ageRange?.max}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ageRange?.max}
                    </Form.Control.Feedback>
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
              <Button disabled={loading} type="submit">
                Update
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const ImageCard = ({ image, index, _productImages, id }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card style={{ width: "10rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body className="d-flex justify-content-center align-items-center">
        <Button variant="danger" onClick={handleShow}>
          Delete
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete image</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                const productImages = [..._productImages];
                productImages.splice(index, 1);
                const fd = new FormData();
                fd.append("productImages", productImages);
                dispatch(editProduct(fd, id));
                handleClose();
              }}
            >
              {loading ? "Deleting" : "Yes"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default EditProduct;