// Dependencies
import { useEffect } from "react";
import { Container, Row, Col, Button, Tabs, Tab, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Pagination } from "swiper";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import {
  FaCreditCard,
  FaShoppingBag,
  FaStar,
  FaStarHalfAlt,
  FaPencilAlt,
  FaExclamationTriangle,
  FaBookOpen,
} from "react-icons/fa";

// Actions
import {
  addQuestion,
  getProduct,
  removeQuestion,
  removeReview,
  reviewProduct,
} from "redux/actions/product";

// Helpers
import { review as reviewInitialValues } from "helpers/initialValues";
import { review as reviewValidationSchema } from "helpers/validationSchemas";

// Components
import Review from "components/Review";
import ReviewGraph from "components/ReviewGraph";
import { TextField, SelectField } from "components/InputFields.jsx";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProduct(match.params.productId));
  }, [dispatch, match.params.productId]);

  const existingReview = product.reviews?.filter(
    (review) => review?.reviewer._id.toString() === user?._id.toString()
  )?.[0];

  const existingQuestion = product.questions?.filter(
    (question) => question?.askedBy._id.toString() === user?._id.toString()
  )?.[0];

  return (
    <Container className="py-3 mt-3">
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <>
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
          <section id="product-reviews" className="product-reviews pt-3">
            <Tabs defaultActiveKey="read" className="mb-3">
              <Tab
                eventKey="write"
                title={
                  <>
                    <FaPencilAlt className="mx-2" />
                    Write Review
                  </>
                }
              >
                {isAuthenticated ? (
                  existingReview ? (
                    <div>
                      <p>Your review on {product.name}</p>
                      <Review review={existingReview} />
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => dispatch(removeReview(match.params.productId))}
                      >
                        Delete Review
                      </Button>
                    </div>
                  ) : (
                    <Formik
                      initialValues={reviewInitialValues}
                      validationSchema={reviewValidationSchema}
                      onSubmit={(values) => dispatch(reviewProduct(values, match.params.productId))}
                    >
                      {({ handleSubmit }) => (
                        <Form>
                          <TextField
                            name="subject"
                            label="Subject"
                            placeholder="Enter review subject here"
                          />
                          <TextField
                            name="comment"
                            label="Comment"
                            as="textarea"
                            rows={3}
                            placeholder="Enter review comment here"
                          />
                          <SelectField name="rating" label="Rating" options={[1, 2, 3, 4, 5]} />

                          <div className="text-center">
                            <Button
                              variant="primary"
                              type="submit"
                              onClick={handleSubmit}
                              className="w-100"
                            >
                              Post review
                            </Button>
                            <Form.Text>
                              Your review will be posted publicly as {user.name}
                            </Form.Text>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )
                ) : (
                  <div className="px-1">
                    <p className="text-danger mb-0">
                      <FaExclamationTriangle /> You need to be logged in to write a review!
                    </p>
                    <Link to="/register">Sign up here</Link>
                    <br />
                    <Link to="/login">Already have an account? Login here</Link>
                  </div>
                )}
              </Tab>
              <Tab
                eventKey="read"
                title={
                  <>
                    <FaBookOpen className="mx-2" />
                    Read Reviews
                  </>
                }
              >
                <>
                  <ReviewGraph
                    ratings={product.rating}
                    average={product.averageRating}
                    total={product.reviews?.length}
                  />
                  {product.reviews?.map((review, index) => (
                    <Review key={index} review={review} />
                  ))}
                </>
              </Tab>
            </Tabs>
          </section>
        </>
      )}
    </Container>
  );
};

export default ProductScreen;
