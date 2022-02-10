// Dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

// Components
import Product from "./Product.jsx";

// Actions
import { searchProducts } from "redux/actions/product";

const BrandScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);
  const { brands } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(searchProducts({ brand: match.params.brand }));
  }, [dispatch, match.params.brand]);

  const brand = brands.find((item) => item.name === match.params.brand);

  return (
    <Container fluid>
      <div className="brand-shop-screen py-2">
        <div className="text-center my-2">
          <h1 className="gradient-heading">{brand?.name}</h1>
          <img src={brand?.logo} height="100px" className="my-3" alt="" />
          <p>{brand?.description}</p>
        </div>
        <div className="products">
          {loading ? (
            <h3>Loading</h3>
          ) : products.length > 0 ? (
            <Row>
              {products.map((product, index) => (
                <Col sm={12} md={4} lg={3} key={index}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <h3>No products to show</h3>
          )}
        </div>
      </div>
    </Container>
  );
};

export default BrandScreen;
