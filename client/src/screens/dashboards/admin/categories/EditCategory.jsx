// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Modal, Alert, Button } from "react-bootstrap";
import { Formik } from "formik";
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
          pet: category.pet,
          image: category.image,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Category name is required"),
          type: Yup.string().required("Category type is required"),
          pet: Yup.string().required("Pet type is required"),
        })}
        onSubmit={(values) => dispatch(editCategory(values, categoryId))}
      >
        {({ handleSubmit }) => (
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
              <Row>
                <Col xs={12} sm={6}>
                  <SelectField
                    name="type"
                    label="Category type"
                    options={["Product", "Service", "Directory"]}
                    placeholder="Enter the category type"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <SelectField
                    name="pet"
                    label="Pet type"
                    options={pets.map((pet) => pet.name)}
                    placeholder="Enter the pet type"
                  />
                </Col>
              </Row>
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
                {loading ? "Editing" : "Edit"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditCategory;
