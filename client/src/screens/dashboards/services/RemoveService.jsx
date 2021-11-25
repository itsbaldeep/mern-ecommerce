// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

// Actions
import { removeService } from "redux/actions/service";

const RemoveService = ({ show, onHide, service }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.service);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Remove Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to remove {service.name}?</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="danger"
          onClick={(e) => {
            e.preventDefault();
            dispatch(removeService(service._id));
            onHide();
          }}
        >
          {loading ? "Deleting" : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveService;
