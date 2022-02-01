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
        className="shop-swiper"
      >
        {array.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="shop-swiper-container" onClick={() => clickHandler(item)}>
              <img src={item.image || item.logo || placeholder} height="200px" alt="item" />
              <div className="shop-swiper-info py-2">
                {item.name}
                {item.docs && ` - ${item.docs.length} products`}
                {item.products && ` - ${item.products.length} products`}
              </div>
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
  const [categoryFilter, setCategoryFilter] = useState("");
  const [petFilter, setPetFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [showFilter, setShowFilter] = useState(window.innerWidth > 768);

  useEffect(() => {
    dispatch(getProducts());
    const handleResize = () => setShowFilter(window.innerWidth > 768);
    const listener = window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", listener);
  }, [dispatch]);

  const handleFilter = () => {
    console.log(categoryFilter, petFilter, sortFilter, priceRange);
  };

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
              <Form.Group>
                {productCategories?.map((category, index) => (
                  <Form.Check
                    type="radio"
                    name="category"
                    onClick={(e) => setCategoryFilter(e.target.value)}
                    value={category.name}
                    key={index}
                    label={category.name}
                  ></Form.Check>
                ))}
              </Form.Group>
            </div>
            <div className="pettype-section">
              <h4>Filter by Pet</h4>
              <Form.Group>
                {pets?.map((pet, index) => (
                  <Form.Check
                    type="radio"
                    name="pet"
                    onClick={(e) => setPetFilter(e.target.value)}
                    value={pet.name}
                    label={pet.name}
                    key={index}
                  ></Form.Check>
                ))}
              </Form.Group>
            </div>
            <div className="sort-section">
              <h4>Sort By</h4>
              <Form.Group>
                {["Newest", "Best Selling", "Price: High to Low", "Price: Low to High"].map(
                  (value, index) => (
                    <Form.Check
                      type="radio"
                      name="sort"
                      onClick={(e) => setSortFilter(e.target.value)}
                      value={value}
                      label={value}
                      key={index}
                    ></Form.Check>
                  )
                )}
              </Form.Group>
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
              <button className="btn btn-primary" onClick={handleFilter}>
                Apply Filters
              </button>
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
