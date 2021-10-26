import { useState } from "react";
import { Button, Card } from "react-bootstrap";

import ViewProduct from "./ViewProduct.jsx";
import EditProduct from "./EditProduct.jsx";

const ProductCard = ({ product }) => {
  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const showViewDialog = () => setViewDialog(true);
  const hideViewDialog = () => setViewDialog(false);
  const showEditDialog = () => setEditDialog(true);
  const hideEditDialog = () => setEditDialog(false);
  return (
    <Card>
      <Card.Img variant="top" src="https://via.placeholder.com/286x150" alt="img" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button className="m-2" variant="dark" onClick={showViewDialog}>
          View
        </Button>
        <ViewProduct show={viewDialog} onHide={hideViewDialog} product={product} />
        <Button className="m-2" variant="success" onClick={showEditDialog}>
          Edit
        </Button>
        <Button className="m-2" variant="danger">
          Remove
        </Button>
        <EditProduct show={editDialog} onHide={hideEditDialog} product={product} />
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
