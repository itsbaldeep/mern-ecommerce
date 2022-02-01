// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Alert, Button, Row, Col } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

// Components
import { TextField, SelectField, CheckBoxOptions } from "components/InputFields.jsx";

// Actions
import { addCategory } from "redux/actions/category";

const AddCategory = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, isAdded, productCategories, serviceCategories, directoryCategories } =
    useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header>
        <Modal.Title>Add a new category</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: "",
          description: "",
          type: "Product",
          pet: [],
          image: "",
          subCategories: [],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Category name is required"),
          type: Yup.string().required("Category type is required"),
          pet: Yup.array().min(1, "Please pick atleast one pet type"),
        })}
        onSubmit={(values) => dispatch(addCategory(values))}
      >
        {({ values, handleSubmit }) => {
          const releventCategories =
            values.type === "Product"
              ? productCategories
              : values.type === "Service"
              ? serviceCategories
              : directoryCategories;
          return (
            <Form>
              <Modal.Body>
                <TextField
                  name="image"
                  label="Category image"
                  placeholder="Enter the link to the image"
                />
                <TextField
                  name="name"
                  label="Category name"
                  placeholder="Enter the category name"
                />
                <TextField
                  name="description"
                  label="Category description"
                  placeholder="Enter the category description"
                />
                <SelectField
                  name="type"
                  label="Category type"
                  options={["Product", "Service", "Directory"]}
                  placeholder="Enter the category type"
                />
                <CheckBoxOptions
                  name="pet"
                  label="Pet type"
                  options={pets?.map((pet) => pet.name)}
                  placeholder="Enter the pet type"
                />
                <Form.Group>
                  <FieldArray name="subCategories">
                    {({ push, remove }) => (
                      <div>
                        <div className="d-flex justify-content-between mb-2">
                          <Form.Label>Subcategories</Form.Label>
                          <Button
                            variant="success"
                            size="md"
                            onClick={(e) => {
                              e.preventDefault();
                              push(releventCategories[0].name);
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        {values.subCategories.length === 0 && (
                          <p className="text-muted">No subcategories added</p>
                        )}
                        {values.subCategories?.map((_, index) => {
                          return (
                            <Row key={index}>
                              <Col xs={12} lg={10}>
                                <SelectField
                                  name={`subCategories.${index}`}
                                  options={releventCategories.map((category) => category.name)}
                                />
                              </Col>
                              <Col xs={12} lg={2} className="d-flex flex-row-reverse">
                                <Form.Group className="w-100 w-lg-0">
                                  <Button
                                    variant="danger"
                                    size="md"
                                    className="w-100 w-lg-0 mb-3 mb-lg-0"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      remove(index);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Form.Group>
                              </Col>
                            </Row>
                          );
                        })}
                      </div>
                    )}
                  </FieldArray>
                </Form.Group>
                {error && (
                  <Alert className="my-1" variant="danger">
                    {error}
                  </Alert>
                )}
                {isAdded && (
                  <Alert className="my-1" variant="success">
                    Category has been added successfully
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
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddCategory;
