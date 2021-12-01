// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

// Actions
import { approveService } from "redux/actions/service";

const ApproveService = ({ show, onHide, serviceId, name }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.service);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Approve this service</Modal.Title>
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
            dispatch(approveService(serviceId));
            onHide();
          }}
        >
          {loading ? "Approving" : "Approve"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApproveService;
