// Dependencies
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

// Components
import MainSlider from "components/MainSlider.jsx";
import Product from "./Product.jsx";

// Actions
import { getProducts } from "redux/actions/product";

// Custom CSS
import "./ShopScreen.css";

// Checkbox helper component
const CheckBox = ({ label }) => (
  <Form.Group>
    <Form.Check type="checkbox" label={label}></Form.Check>
  </Form.Group>
);

const ShopScreen = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);

  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [showFilter, setShowFilter] = useState(window.innerWidth > 768);

  useEffect(() => {
    dispatch(getProducts());
    const handleResize = () => setShowFilter(window.innerWidth > 768);
    const listener = window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", listener);
  }, [dispatch]);

  return (
    <>
      <MainSlider />
      <Container fluid>
        <div className="shop-screen py-2">
          <div
            className="collapse-button text-end text-primary"
            onClick={() => {
              setShowFilter((x) => !x);
            }}
          >
            <FaFilter /> Add Filters
          </div>
          <div className={`filters ${showFilter ? "d-block" : "d-none"}`}>
            <div className="category-section">
              <h4>Filter by Category</h4>
              <CheckBox label="Food" />
              <CheckBox label="Cosmetic" />
              <CheckBox label="Accessory" />
              <CheckBox label="Other" />
            </div>
            <div className="pettype-section">
              <h4>Filter by Pet</h4>
              <CheckBox label="Dog" />
              <CheckBox label="Cat" />
              <CheckBox label="Bird" />
              <CheckBox label="Other" />
            </div>
            <div className="sort-section">
              <h4>Sort By</h4>
              <CheckBox label="Newest" />
              <CheckBox label="Best Selling" />
              <CheckBox label="Price: High to Low" />
              <CheckBox label="Price: Low to High" />
            </div>
            <div className="price-range">
              <h4>Price Range</h4>
              <p>Minimum: {priceRange.min}</p>
              <input
                type="range"
                name="pricerange"
                className="form-range"
                min="0"
                max="20000"
                step="50"
                onInput={(e) =>
                  setPriceRange((x) => {
                    return {
                      ...x,
                      min: e.target.value,
                    };
                  })
                }
              />
              <p>Maximum: {priceRange.max}</p>
              <input
                type="range"
                name="pricerange"
                className="form-range"
                min="0"
                max="20000"
                step="50"
                onInput={(e) =>
                  setPriceRange((x) => {
                    return {
                      ...x,
                      max: e.target.value,
                    };
                  })
                }
              />
              <button className="btn btn-primary">Apply Filters</button>
            </div>
          </div>
          <div className="products">
            {loading ? (
              <h3>Loading</h3>
            ) : (
              <Row>
                {products.length > 0 ? (
                  products.map((product) => (
                    <Col sm={12} md={6} lg={4} key={product._id}>
                      <Product product={product} />
                    </Col>
                  ))
                ) : (
                  <h3>No products to show</h3>
                )}
              </Row>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ShopScreen;
