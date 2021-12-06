// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Alert, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import { TextField, SelectField, CheckBoxOptions } from "components/InputFields.jsx";

// Actions
import { addCategory } from "redux/actions/category";

const AddCategory = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, isAdded } = useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);

  return (
    <Modal show={show} onHide={onHide}>
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
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Category name is required"),
          type: Yup.string().required("Category type is required"),
          pet: Yup.array().min(1, "Please pick atleast one pet type"),
        })}
        // onSubmit={console.log}
        onSubmit={(values) => dispatch(addCategory(values))}
      >
        {({ errors, handleSubmit }) => (
          <Form>
            <Modal.Body>
              <TextField
                name="image"
                label="Category image"
                placeholder="Enter the link to the image"
              />
              <TextField name="name" label="Category name" placeholder="Enter the category name" />
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
        )}
      </Formik>
    </Modal>
  );
};

export default AddCategory;
