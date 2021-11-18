// Dependencies
import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { FaBookmark, FaFilter, FaMapMarker } from "react-icons/fa";

// Actions
import { loadDirectories } from "redux/actions/directory";

import "./DirectoriesScreen.css";

const CheckBox = ({ label }) => (
  <Form.Group>
    <Form.Check type="checkbox" label={label}></Form.Check>
  </Form.Group>
);
const DirectoriesScreen = () => {
  const dispatch = useDispatch();
  const { loading, directories } = useSelector((state) => state.directory);
  const [showFilter, setShowFilter] = useState(window.innerWidth > 768);

  useEffect(() => {
    dispatch(loadDirectories());
    const handleResize = () => setShowFilter(window.innerWidth > 768);
    const listener = window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", listener);
  }, [dispatch]);
  const stateOptions = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
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
      <Container className="my-2" fluid>
        <div className="directory-screen">
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
            <div className="area-section">
              <h4>Filter by State</h4>
              <Form.Select aria-label="Default select example">
                {stateOptions.map((state) => (
                  <option value={state} key={state}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="sort-section">
              <h4>Sort By</h4>
              <CheckBox label="Newest" />
              <CheckBox label="Top Rated" />
              <CheckBox label="Most Selling" />
            </div>
            <button className="btn btn-primary">Apply Filters</button>
          </div>

          <Row>
            {loading ? (
              <h3>Loading</h3>
            ) : (
              directories.map((directory, index) => (
                <Col lg={4} sm={6} xs={12}>
                  <DirectoryCard directory={directory} key={index} />
                </Col>
              ))
            )}
          </Row>
        </div>
      </Container>
    </>
  );
};

const DirectoryCard = ({ directory }) => {
  const diffTime = Math.abs(new Date() - new Date(directory.createdAt));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <Card className="m-2">
      <Link to={`/${directory.username}`}>
        <Card.Img
          variant="top"
          src={directory.directoryImages?.[0] || "/assets/placeholders/store.png"}
        />
        <Card.Body>
          <Card.Title>{directory.storeName}</Card.Title>
          <Card.Text>
            <FaBookmark className="text-secondary" /> {directory.category.join(", ")}
            <br />
            <FaMapMarker className="text-secondary" /> {directory.address}, {directory.state},{" "}
            {directory.pincode}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{diffDays} days ago</Card.Footer>
      </Link>
    </Card>
  );
};

export default DirectoriesScreen;
