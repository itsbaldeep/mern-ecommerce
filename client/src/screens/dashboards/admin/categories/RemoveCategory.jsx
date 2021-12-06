// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

// Actions
import { removeCategory } from "redux/actions/category";

const RemoveCategory = ({ show, onHide, categoryId, name }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.category);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Delete this category</Modal.Title>
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
            dispatch(removeCategory(categoryId));
            onHide();
          }}
        >
          {loading ? "Deleting" : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveCategory;
