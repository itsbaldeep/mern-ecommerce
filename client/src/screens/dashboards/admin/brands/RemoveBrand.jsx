// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

// Actions
import { removeBrand } from "redux/actions/brand";

const RemoveBrand = ({ show, onHide, brandId, name }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.brand);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Delete this brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to remove {name}?</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="danger"
          onClick={(e) => {
            e.preventDefault();
            dispatch(removeBrand(brandId));
            onHide();
          }}
        >
          {loading ? "Deleting" : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveBrand;
