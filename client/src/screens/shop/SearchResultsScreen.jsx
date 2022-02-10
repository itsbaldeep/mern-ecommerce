// Dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

// Components
import Product from "./Product.jsx";

// Actions
import { searchProducts } from "redux/actions/product";

const SearchResultsScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(searchProducts({ query: match.params.query }));
  }, [dispatch, match.params.query]);

  return (
    <Container fluid>
      <div className="search-results-shop-screen py-2">
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

export default SearchResultsScreen;
