import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import Product from "./Product";

import { getProducts } from "redux/actions/product";

const ShopScreen = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container>
      <h2 className="py-2">All Products</h2>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={4} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ShopScreen;
