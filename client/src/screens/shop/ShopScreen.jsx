// Dependencies
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Autoplay, Pagination } from "swiper";

// Components
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

const SwiperSection = ({ heading, array, placeholder, clickHandler }) => {
  return (
    <section className="py-3 text-center">
      <h1 className="gradient-heading">{heading}</h1>
      <Swiper
        loop
        slidesPerView={1}
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }}
        autoplay={{ delay: 5000 }}
        modules={[Pagination, Autoplay]}
        // pagination={{ clickable: true, dynamicBullets: true }}
        className="shop-swiper"
      >
        {array.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="shop-swiper-container" onClick={() => clickHandler(item)}>
              <img src={item.image || item.logo || placeholder} height="200px" alt="item" />
              <div className="shop-swiper-info py-2">{item.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const ShopScreen = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);
  const { productCategories } = useSelector((state) => state.category);
  const { pets } = useSelector((state) => state.pet);
  const { brands } = useSelector((state) => state.brand);

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
      <SwiperSection
        heading="Shop by category"
        array={productCategories}
        placeholder="/assets/placeholders/category.png"
        clickHandler={(category) => console.log(category.docs)}
      />
      <SwiperSection
        heading="Shop by brands"
        array={brands}
        placeholder="/assets/placeholders/brand.png"
        clickHandler={(brand) => console.log(brand.products)}
      />
      <SwiperSection
        heading="Shop by pet"
        array={pets}
        placeholder="/assets/placeholders/pet.png"
        clickHandler={(pet) => console.log(pet.categories)}
      />
      {/* <Row>
          {brands.map((brand, index) => (
            <Col xs={12} sm={6} md={4} key={index}>
              <p>{brand.name}</p>
              <img src={brand.logo || brandPlaceholder} height="50px" alt="brand" />
            </Col>
          ))}
        </Row>
        <Row>
          {pets.map((pet, index) => (
            <Col xs={12} sm={6} md={4} key={index}>
              <p>{pet.name}</p>
              <img src={pet.image || petPlaceholder} height="50px" alt="pet" />
            </Col>
          ))}
        </Row> */}
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
              {productCategories?.map((category, index) => (
                <CheckBox label={category.name} key={index} />
              ))}
            </div>
            <div className="pettype-section">
              <h4>Filter by Pet</h4>
              {pets?.map((pet, index) => (
                <CheckBox label={pet.name} key={index} />
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
          <div className="products">
            {loading ? (
              <h3>Loading</h3>
            ) : products.length > 0 ? (
              <Row>
                {products.map((product, index) => (
                  <Col sm={12} md={6} lg={4} key={index}>
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
    </>
  );
};

export default ShopScreen;
