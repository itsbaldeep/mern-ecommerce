// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

// Actions
import { approveDirectory } from "redux/actions/directory";

const ApproveDirectory = ({ show, onHide, directoryId, name }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.directory);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Verify this directory</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to verify {name}?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            dispatch(approveDirectory(directoryId));
            onHide();
          }}
        >
          {loading ? "Verifying" : "Verify"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApproveDirectory;
