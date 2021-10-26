import { useState } from "react";
import { Button, Card } from "react-bootstrap";

import ViewProduct from "./ViewProduct.jsx";

const ProductCard = ({ product }) => {
  const [viewDialog, setViewDialog] = useState(false);
  const showViewDialog = () => setViewDialog(true);
  const hideViewDialog = () => setViewDialog(false);
  return (
    <Card>
      <Card.Img variant="top" src="https://via.placeholder.com/286x150" alt="img" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text className="text-muted">Rs. {product.price}</Card.Text>
        <Button className="m-2" variant="dark" onClick={showViewDialog}>
          View
        </Button>
        <ViewProduct show={viewDialog} onHide={hideViewDialog} product={product} />
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
