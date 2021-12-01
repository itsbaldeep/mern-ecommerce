// Dependencies
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

// Components
import MainSlider from "components/MainSlider.jsx";
import Service from "./Service.jsx";

// Config
import { serviceCategories, petTypes } from "config.json";

// Actions
import { getServices } from "redux/actions/service";

// Custom CSS
import "./ServicesScreen.css";

// Checkbox helper component
const CheckBox = ({ label }) => (
  <Form.Group>
    <Form.Check type="checkbox" label={label}></Form.Check>
  </Form.Group>
);

const ServicesScreen = () => {
  const dispatch = useDispatch();
  const { loading, services } = useSelector((state) => state.service);

  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [showFilter, setShowFilter] = useState(window.innerWidth > 768);

  useEffect(() => {
    dispatch(getServices());
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
              {serviceCategories.map((value, index) => (
                <CheckBox label={value} key={index} />
              ))}
            </div>
            <div className="pettype-section">
              <h4>Filter by Pet</h4>
              {petTypes.map((value, index) => (
                <CheckBox label={value} key={index} />
              ))}
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
          <div className="services">
            {loading ? (
              <h3>Loading</h3>
            ) : services.length > 0 ? (
              <Row>
                <Col sm={12} md={6} lg={4}></Col>
                {services.map((service, index) => (
                  <Col sm={12} md={6} lg={4} key={index}>
                    <Service service={service} />
                  </Col>
                ))}
              </Row>
            ) : (
              <h3>No services to show</h3>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ServicesScreen;
