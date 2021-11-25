// Dependencies
import { useState } from "react";
import { Button, Card } from "react-bootstrap";

// Components
import ViewService from "./ViewService.jsx";
import EditService from "./EditService.jsx";
import RemoveService from "./RemoveService.jsx";

const ServiceCard = ({ service }) => {
  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const showViewDialog = () => setViewDialog(true);
  const hideViewDialog = () => setViewDialog(false);
  const showEditDialog = () => setEditDialog(true);
  const hideEditDialog = () => setEditDialog(false);
  const showRemoveDialog = () => setRemoveDialog(true);
  const hideRemoveDialog = () => setRemoveDialog(false);

  return (
    <Card className="my-2">
      {!service.isApproved && <p className="approved-text">Approval Pending</p>}
      <div
        style={{
          background: `url(${service.serviceImages[0] || "/assets/placeholders/service.png"})`,
          height: "250px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      <Card.Body>
        <Card.Title>{service.name}</Card.Title>
        <Card.Text>
          {service.description.length > 100
            ? `${service.description.slice(0, 100)}...`
            : service.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex align-items-center justify-content-center">
        <Button className="mx-1" size="sm" onClick={showViewDialog}>
          View
        </Button>
        <ViewService show={viewDialog} onHide={hideViewDialog} service={service} />

        <Button className="mx-1" size="sm" variant="success" onClick={showEditDialog}>
          Edit
        </Button>
        <EditService show={editDialog} onHide={hideEditDialog} service={service} />

        <Button className="mx-1" size="sm" variant="danger" onClick={showRemoveDialog}>
          Remove
        </Button>
        <RemoveService show={removeDialog} onHide={hideRemoveDialog} service={service} />
      </Card.Footer>
    </Card>
  );
};

export default ServiceCard;
