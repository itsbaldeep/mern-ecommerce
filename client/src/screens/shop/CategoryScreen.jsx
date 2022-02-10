// Dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

// Components
import Product from "./Product.jsx";

// Actions
import { searchProducts } from "redux/actions/product";

const CategoryScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);
  const { productCategories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(searchProducts({ category: match.params.category }));
  }, [dispatch, match.params.category]);

  const category = productCategories.find((item) => item.name === match.params.category);

  return (
    <Container fluid>
      <div className="category-shop-screen py-2">
        <div className="text-center my-2">
          <h1 className="gradient-heading">{category?.name}</h1>
          <p>Browse through our collection of products listed under {category?.name}</p>
          <img src={category?.image} alt="" />
          <p>{category?.description}</p>
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

export default CategoryScreen;
