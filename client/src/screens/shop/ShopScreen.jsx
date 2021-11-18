import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import Product from "./Product.jsx";

import { getProducts } from "redux/actions/product";

import "./ShopScreen.css";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

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
      <Swiper loop pagination navigation={{ clickable: true }}>
        <SwiperSlide>
          <div class="content">
            <p className="display-6">AMAZING VALUE</p>
            <p className="lead">
              There are multiple offers and discounts running all the time so make sure to keep an
              eye on all the amazing offers so you don't miss out on anything for your pets.
            </p>
            <a href="#" class="btn btn-primary btn-lg">
              Check Now
            </a>
          </div>
          <div class="image">
            <img src="/assets/images/shop-3.png" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="content">
            <p className="display-6">BEST QUALITY PRODUCTS</p>
            <p className="lead">
              Get assured quality on the best products for your beloved companion. Browse through a
              variety of options and variations based on your pet with reasonable prices.
            </p>
            <a href="#" class="btn btn-primary btn-lg">
              Order Now
            </a>
          </div>
          <div class="image">
            <img src="/assets/images/shop-1.png" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="content">
            <p className="display-6">TOP RATED PRODUCTS</p>
            <p className="lead">
              All of our products are rated by the community itself so that you can be assure of the
              quality of the product for your pet. A high standard is maintained by our top analysts
              and reviewers
            </p>
            <a href="#" class="btn btn-primary btn-lg">
              Browse Now
            </a>
          </div>
          <div class="image">
            <img src="/assets/images/shop-2.png" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
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
