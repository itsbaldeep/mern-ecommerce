// Dependencies
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

// Actions
import { verifyUser } from "redux/actions/user";

const VerifyUser = ({ show, onHide, userId, name }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.admin);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Verify this user</Modal.Title>
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
            dispatch(verifyUser(userId));
            onHide();
          }}
        >
          {loading ? "Verifying" : "Verify"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerifyUser;
