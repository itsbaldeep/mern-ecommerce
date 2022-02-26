// Dependencies
import { Modal, Button } from "react-bootstrap";

// Helpers
import convertTime from "helpers/convertTime";

const ProductHistory = ({ show, onHide, edits }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Product edit history</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {edits?.map((edit, index) => {
          if (!edit || typeof edit === "string") return null;
          let changesInfo = [];
          for (const change in edit.changes) {
            changesInfo.push(`${change} -> ${edit.changes[change]}`);
          }
          return (
            <div key={index}>
              <div className={`${index !== 0 && "mt-3"}`}>
                <img
                  src={edit.user.profileImage || "/assets/placeholders/portrait.png"}
                  width="30px"
                  style={{ borderRadius: "100%" }}
                />
                <p className="d-inline mx-2">{edit.user.name}</p>
                <p className="mt-2">{convertTime(edit.date)}</p>
                <div
                  className="p-2"
                  style={{
                    borderRadius: "4px",
                    backgroundColor: "#e5e5e5",
                    wordWrap: "break-word",
                  }}
                >
                  {changesInfo.length === 0 ? (
                    <p className="mb-0" style={{ fontSize: 12 }}>
                      Nothing changed
                    </p>
                  ) : (
                    changesInfo.map((change, index) => (
                      <p className="mb-0" style={{ fontSize: 12 }} key={index}>
                        {change}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductHistory;
