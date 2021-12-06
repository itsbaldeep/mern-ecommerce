// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Alert, Button } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";

// Components
import { TextField, SelectField } from "components/InputFields.jsx";

// Actions
import { editCategory } from "redux/actions/category";

const EditCategory = ({ show, onHide, categoryId, category }) => {
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Edit category</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: category.name,
          description: category.description,
          type: category.type,
          pet: [...category.pet],
          image: category.image,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Category name is required"),
          type: Yup.string().required("Category type is required"),
          pet: Yup.array().min(1, "Please pick atleast one pet type"),
        })}
        onSubmit={(values) => dispatch(editCategory(values, categoryId))}
      >
        {({ values, handleSubmit }) => (
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
              <Form.Group className="mb-3">
                <Form.Label htmlFor="pet">Pet Type</Form.Label>
                <div>
                  {pets.map((pet, index) => (
                    <Field
                      name="pet"
                      key={index}
                      as={Form.Check}
                      className="form-check-inline"
                      checked={values.pet.includes(pet.name)}
                      type="checkbox"
                      value={pet.name}
                      label={pet.name}
                    />
                  ))}
                </div>
              </Form.Group>
              {error && (
                <Alert className="my-1" variant="danger">
                  {error}
                </Alert>
              )}
              {isUpdated && (
                <Alert className="my-1" variant="success">
                  Category has been updated successfully
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
                {loading ? "Updating" : "Update"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditCategory;
