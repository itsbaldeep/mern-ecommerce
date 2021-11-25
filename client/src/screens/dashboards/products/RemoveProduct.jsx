// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

// Actions
import { removeProduct } from "redux/actions/product";

const RemoveProduct = ({ show, onHide, product }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Remove Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to remove {product.name}?</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="danger"
          onClick={(e) => {
            e.preventDefault();
            dispatch(removeProduct(product._id));
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
