// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Form, Modal, Alert, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import { TextField, TextArrayField } from "components/InputFields.jsx";

// Actions
import { editBrand } from "redux/actions/brand";

const EditBrand = ({ show, onHide, brandId, brand }) => {
  const dispatch = useDispatch();
  const { loading, error, isUpdated } = useSelector((state) => state.brand);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Edit brand</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: brand.name,
          logo: brand.logo,
          description: brand.description,
          sellers: brand.sellers.map((brand) => brand._id),
          images: [...brand.images],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Brand name is required"),
        })}
        onSubmit={(values) => dispatch(editBrand(values, brandId))}
      >
        {({ handleSubmit }) => (
          <Form>
            <Modal.Body>
              <TextField name="logo" label="Brand logo" placeholder="Enter the link to the logo" />
              <TextField name="name" label="Brand name" placeholder="Enter the brand name" />
              <TextField
                name="description"
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
              {isUpdated && (
                <Alert className="my-1" variant="success">
                  Brand has been edited successfully
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

export default EditBrand;
