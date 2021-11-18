import { useState } from "react";
import { Button, Card } from "react-bootstrap";

import ViewProduct from "./ViewProduct.jsx";
import EditProduct from "./EditProduct.jsx";
import RemoveProduct from "./RemoveProduct.jsx";

const ProductCard = ({ product }) => {
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
      {!product.isApproved && <p className="approved-text">Approval Pending</p>}
      <div
        style={{
          background: `url(${product.productImages[0] || "/assets/placeholders/product.png"})`,
          height: "250px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex align-items-center justify-content-center">
        <Button className="mx-1" size="sm" onClick={showViewDialog}>
          View
        </Button>
        <ViewProduct show={viewDialog} onHide={hideViewDialog} product={product} />

        <Button className="mx-1" size="sm" variant="success" onClick={showEditDialog}>
          Edit
        </Button>
        <EditProduct show={editDialog} onHide={hideEditDialog} product={product} />

        <Button className="mx-1" size="sm" variant="danger" onClick={showRemoveDialog}>
          Remove
        </Button>
        <RemoveProduct show={removeDialog} onHide={hideRemoveDialog} product={product} />
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
