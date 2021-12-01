// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

// Actions
import { removeProduct } from "redux/actions/product";

const RemoveProduct = ({ show, onHide, productId, name }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Remove this product</Modal.Title>
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
            dispatch(removeProduct(productId));
            onHide();
          }}
        >
          {loading ? "Deleting" : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveProduct;
