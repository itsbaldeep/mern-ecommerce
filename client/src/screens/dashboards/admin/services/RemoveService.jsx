// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

// Actions
import { removeService } from "redux/actions/service";

const RemoveService = ({ show, onHide, serviceId, name }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.service);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Remove this service</Modal.Title>
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
            dispatch(removeService(serviceId));
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
