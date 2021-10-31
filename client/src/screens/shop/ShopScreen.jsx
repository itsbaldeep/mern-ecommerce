import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import Product from "./Product.jsx";

import { getProducts } from "redux/actions/product";

const ShopScreen = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container>
      <h2 className="py-2">All Products</h2>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <Row>
          {products.length > 0 ? (
            products.map((product) => (
              <Col sm={12} md={4} key={product._id}>
                <Product product={product} />
              </Col>
            ))
          ) : (
            <h3>No products to show</h3>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ShopScreen;
