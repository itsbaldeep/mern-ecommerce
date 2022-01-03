// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Alert, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import { TextField, TextArrayField } from "components/InputFields.jsx";

// Actions
import { addBrand } from "redux/actions/brand";

const AddBrand = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { loading, error, isAdded } = useSelector((state) => state.brand);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add a new brand</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: "",
          description: "",
          logo: "",
          sellers: [],
          images: [],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Brand name is required"),
          sellers: Yup.array().of(Yup.string().required("Seller ID is required")),
          images: Yup.array().of(Yup.string().required("Image link is required")),
        })}
        onSubmit={(values) => dispatch(addBrand(values))}
      >
        {({ handleSubmit }) => (
          <Form>
            <Modal.Body>
              <TextField name="logo" label="Brand logo" placeholder="Enter the link to the logo" />
              <TextField name="name" label="Brand name" placeholder="Enter the brand name" />
              <TextField
                name="description"
                as="textarea"
                label="Brand description"
                placeholder="Enter the brand description"
              />
              <TextArrayField
                name="sellers"
                label="Sellers"
                placeholder="Enter Seller ID"
                message="No sellers added"
              />
              <TextArrayField
                name="images"
                label="Images"
                placeholder="Enter image link"
                message="No images added"
              />
              {error && (
                <Alert className="my-1" variant="danger">
                  {error}
                </Alert>
              )}
              {isAdded && (
                <Alert className="my-1" variant="success">
                  Brand has been added successfully
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

export default AddBrand;
