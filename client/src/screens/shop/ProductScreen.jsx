import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import { getProduct } from "redux/actions/product";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, success, product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(match.params.productId));
  }, [dispatch]);

  return (
    <Container className="py-3 mt-3">
      {!loading && (
        <Row>
          <Col xs={12} md={6}>
            {product.productImages?.length > 0 ? (
              <Swiper navigation pagination>
                {product.productImages?.map((image, index) => (
                  <SwiperSlide>
                    <img src={image} key={index} width="300px" alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img src="/assets/placeholders/product.png" />
            )}
          </Col>
          <Col xs={12} md={6} className="pt-3">
            <h2>{product.name}</h2>
            <div className="ratings">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <p>Price: ₹{product.price}</p>
            <h4>Product Details</h4>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Suitable for: {product.petType}</p>
            <p>Weighs: {product.weight} grams</p>
            <p>
              Dimensions: {product.size.length}cm x {product.size.height}cm x {product.size.width}cm
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductScreen;
