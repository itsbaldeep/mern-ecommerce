// Dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

// Components
import Product from "./Product.jsx";

// Actions
import { searchProducts } from "redux/actions/product";

const PetScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);
  const { pets } = useSelector((state) => state.pet);

  useEffect(() => {
    dispatch(searchProducts({ pet: match.params.pet }));
  }, [dispatch, match.params.pet]);

  const pet = pets.find((item) => item.name === match.params.pet);

  return (
    <Container fluid>
      <div className="pet-shop-screen py-2">
        <div className="text-center my-2">
          <h1 className="gradient-heading">{pet?.name}</h1>
          <img src={pet?.image} height="400px" alt="" />
          <p>{pet?.description}</p>
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

export default PetScreen;
