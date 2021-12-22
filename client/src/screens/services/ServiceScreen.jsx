// Dependencies
import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaCreditCard, FaShoppingBag, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Pagination } from "swiper";
import { Link } from "react-router-dom";

// Actions
import { getService } from "redux/actions/service";

// Helpers
import { binaryToArray } from "helpers/daysHandler";

const ServiceScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, service } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getService(match.params.serviceId));
  }, [dispatch, match.params.serviceId]);

  return (
    <Container className="py-3 mt-3">
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <Row>
          <Col xs={12} md={6}>
            {service.serviceImages?.length > 0 ? (
              <Swiper
                loop
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation
              >
                {service.serviceImages?.map((image, index) => (
                  <SwiperSlide
                    style={{ height: "450px" }}
                    className="d-flex justify-content-center align-items-center"
                    key={index}
                  >
                    <img src={image} key={index} width="300px" alt="" className="my-auto" />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img src="/assets/placeholders/service.png" alt="Service" />
            )}
          </Col>
          <Col xs={12} md={6} className="pt-3">
            <h2>{service.name}</h2>
            <div className="ratings text-primary">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <p style={{ fontSize: "1.3rem" }}>Price: ₹{service.price}</p>
            <h4>Service Details</h4>
            <p>{service.description}</p>
            <p>Category: {service.category}</p>
            <p>Suitable for: {service.petType?.join(", ")}</p>
            <p>
              Timings: {service.timings?.from} to {service.timings?.to}
            </p>
            <p>Days: {binaryToArray(service.days).join(", ")}</p>
            <p>Address: {service.address}</p>
            {service.link && (
              <div className="d-flex justify-content-around">
                <Link to={{ pathname: service.link }} target="_blank" className="btn btn-primary">
                  <FaCreditCard /> Buy Now
                </Link>
                <Button>
                  <FaShoppingBag /> Add to Cart
                </Button>
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ServiceScreen;
