import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

import { getOwnProducts } from "redux/actions/product";
import AddProduct from "./AddProduct.jsx";
import ProductCard from "./ProductCard.jsx";

const ProductDashboard = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);

  const [addDialog, setAddDialog] = useState(false);
  const showAddDialog = () => setAddDialog(true);
  const hideAddDialog = () => setAddDialog(false);

  useEffect(() => {
    dispatch(getOwnProducts());
  }, [dispatch]);

  return (
    <Container>
      <h2 className="py-2">Your Products</h2>
      <Button onClick={showAddDialog} className="mb-3">
        Add a new product
      </Button>
      <AddProduct show={addDialog} onHide={hideAddDialog} />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ProductDashboard;
