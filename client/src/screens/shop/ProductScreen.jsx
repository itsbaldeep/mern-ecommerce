// Dependencies
import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaCreditCard, FaShoppingBag, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Pagination } from "swiper";
import { Link } from "react-router-dom";

// Actions
import { getProduct } from "redux/actions/product";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(match.params.productId));
  }, [dispatch, match.params.productId]);

  return (
    <Container className="py-3 mt-3">
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <Row>
          <Col xs={12} md={6}>
            {product.productImages?.length > 0 ? (
              <Swiper
                loop
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation
              >
                {product.productImages?.map((image, index) => (
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
              <img src="/assets/placeholders/product.png" alt="Product" />
            )}
          </Col>
          <Col xs={12} md={6} className="pt-3">
            <h2>{product.name}</h2>
            <div className="ratings text-primary">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <p style={{ fontSize: "1.3rem" }}>Price: ₹{product.price}</p>
            <h4>Product Details</h4>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Suitable for: {product.petType?.join(", ")}</p>
            <p>Weighs: {product.weight} grams</p>
            <p>
              Dimensions: {product.size?.length}cm x {product.size?.height}cm x{" "}
              {product.size?.width}cm
            </p>
            {product.link && (
              <div className="d-flex justify-content-around">
                <Link to={{ pathname: product.link }} target="_blank" className="btn btn-primary">
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

export default ProductScreen;
