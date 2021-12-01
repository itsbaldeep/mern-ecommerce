// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

// Actions
import { approveProduct } from "redux/actions/product";

const ApproveProduct = ({ show, onHide, productId, name }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Approve this product</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to approve {name}?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            dispatch(approveProduct(productId));
            onHide();
          }}
        >
          {loading ? "Approving" : "Approve"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApproveProduct;
