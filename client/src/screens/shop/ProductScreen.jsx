// Dependencies
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Tabs, Tab, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Pagination } from "swiper";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  FaCreditCard,
  FaPencilAlt,
  FaExclamationTriangle,
  FaBookOpen,
  FaArrowRight,
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
import convertTime from "helpers/convertTime";

// Components
import Product from "./Product";
import Ratings from "components/Ratings";
import Review from "components/Review";
import ReviewGraph from "components/ReviewGraph";
import Question from "components/Question";
import { TextField, SelectField } from "components/InputFields.jsx";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProduct(match.params.productId));
  }, [dispatch, match.params.productId]);

  const [brandProducts, setBrandProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/product/search?brand=${product.brand}`)
      .then((res) => setBrandProducts(res.data.results.results))
      .catch((_) => setBrandProducts([]));
    axios
      .get(`/api/product/search?category=${product.category}`)
      .then((res) => setCategoryProducts(res.data.results.results))
      .catch((_) => setCategoryProducts([]));
  }, [product.category, product.brand]);

  const existingReview = product.reviews?.filter(
    (review) => review?.reviewer?._id?.toString() === user?._id?.toString()
  )?.[0];

  const existingQuestion = product.questions?.filter(
    (question) => question?.askedBy?._id?.toString() === user?._id?.toString()
  )?.[0];

  const answeredQuestions = [];
  const unansweredQuestions = [];

  product.questions?.forEach((question) => {
    if (question?.answers.length > 0) answeredQuestions.push(question);
    else unansweredQuestions.push(question);
  });

  const prices = product.affiliateLinks?.map((link) => link.productPrice) || [];
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  return (
    <Container className="py-3 mt-3">
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <FaArrowRight className="mx-2" />
            <Link to="/shop">Shop</Link>
            <FaArrowRight className="mx-2" />
            <Link to={`/shop/category/${product.category}`}>{product.category}</Link>
          </div>
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
              <p>
                Brand: <Link to={`/shop/brand/${product.brand}`}>{product.brand || "Generic"}</Link>
              </p>
              <div className="d-flex justify-content-start align-items-center">
                <Ratings
                  rating={product.averageRating}
                  size={26}
                  className="d-inline ratings text-primary"
                />
                <span className="mx-2">{product.averageRating} average rating</span>
              </div>
              <div className="my-2">
                {product.reviews?.length} reviews
                <a href="#product-page-reviews" className="mx-2">
                  Read all reviews
                </a>
              </div>
              <div className="mb-2">
                {answeredQuestions?.length} answered questions, {unansweredQuestions?.length}{" "}
                unanswered questions{" "}
                <a href="#product-page-qna" className="d-block">
                  Read all questions
                </a>
              </div>
              <p style={{ fontSize: "1.3rem" }}>
                Price: ₹{lowestPrice} - {highestPrice}
              </p>
              <div className="buying-options p-3">
                <h4>Buying Options</h4>
                <div className="w-100">
                  {product.affiliateLinks?.map((link, index) => (
                    <a href={link.productLink} target="_blank" rel="noopener noreferrer">
                      <div
                        key={index}
                        className="px-4 py-3 d-sm-flex align-items-center justify-content-between text-center"
                      >
                        {link.productProvider.toLowerCase() === "amazon" ? (
                          <img src="/assets/icons/amazon.svg" height="35px" />
                        ) : link.productProvider.toLowerCase() === "flipkart" ? (
                          <img src="/assets/icons/flipkart.svg" height="35px" />
                        ) : (
                          <FaCreditCard className="mx-2" />
                        )}
                        <div className="w-sm-50 mt-sm-0 mt-2">
                          <p className="m-0">Buy now on {link.productProvider}</p>
                          <p className="m-0"> @ ₹{link.productPrice}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} md={6}>
              <div className="p-3 product-page-details">
                <h3>Product Specifications</h3>
                <div>
                  <span>Weight</span>
                  <span>{product.weight} Kg</span>
                </div>
                <div>
                  <span>Length</span>
                  <span>{product.size?.length || "N/A"} Cm</span>
                </div>
                <div>
                  <span>Height</span>
                  <span>{product.size?.height || "N/A"} Cm</span>
                </div>
                <div>
                  <span>Width</span>
                  <span>{product.size?.width || "N/A"} Cm</span>
                </div>
                <div>
                  <span>Brand</span>
                  <span>{product.brand}</span>
                </div>
                <div>
                  <span>Added on</span>
                  <span>{convertTime(product.createdAt)}</span>
                </div>
                <div>
                  <span>Category</span>
                  <span>{product.category}</span>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="p-3 mt-3 mt-md-0 product-page-description">
                <h3>Product Description</h3>
                <p>{product.description}</p>
              </div>
            </Col>
          </Row>
          <section id="product-page-reviews" className="product-reviews pt-3">
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
                  {!product.reviews || product.reviews.length === 0 ? (
                    <h5 className="text-center my-4">No reviews yet!</h5>
                  ) : (
                    product.reviews?.map((review, index) => <Review key={index} review={review} />)
                  )}
                </>
              </Tab>
            </Tabs>
          </section>
          <section id="product-page-qna" className="product-qna pt-3">
            <Tabs defaultActiveKey="read" className="mb-3">
              <Tab
                eventKey="write"
                title={
                  <>
                    <FaPencilAlt className="mx-2" />
                    Write Question
                  </>
                }
              >
                {isAuthenticated ? (
                  existingQuestion ? (
                    <div>
                      <p>Your question on {product.name}</p>
                      <Question question={existingQuestion} existingQuestion={true} />
                    </div>
                  ) : (
                    <Formik
                      initialValues={{ question: "" }}
                      validationSchema={Yup.object({
                        question: Yup.string().required("Question is required"),
                      })}
                      onSubmit={(values) => dispatch(addQuestion(values, match.params.productId))}
                    >
                      {({ handleSubmit }) => (
                        <Form>
                          <TextField
                            name="question"
                            label="Question"
                            placeholder="Enter question here"
                          />
                          <div className="text-center">
                            <Button
                              variant="primary"
                              type="submit"
                              onClick={handleSubmit}
                              className="w-100"
                            >
                              Post question
                            </Button>
                            <Form.Text>
                              Your question will be posted publicly as {user.name}
                            </Form.Text>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )
                ) : (
                  <div className="px-1">
                    <p className="text-danger mb-0">
                      <FaExclamationTriangle /> You need to be logged in to write a question!
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
                    Read Questions
                  </>
                }
              >
                <>
                  {!product.questions || product.questions.length === 0 ? (
                    <h5 className="text-center my-4">No questions yet!</h5>
                  ) : (
                    product.questions?.map((question, index) => (
                      <Question
                        key={index}
                        question={question}
                        productId={product._id}
                        existingQuestion={question._id === existingQuestion?._id}
                      />
                    ))
                  )}
                </>
              </Tab>
            </Tabs>
          </section>
          {brandProducts.length > 0 && (
            <section id="product-page-brand" className="product-brand pt-3">
              <h3>
                Other products from <span className="text-primary">{product.brand}</span>{" "}
              </h3>
              <Swiper
                slidesPerView={1}
                breakpoints={{
                  576: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                }}
                modules={[Pagination]}
                pagination={{ clickable: true, dynamicBullets: true }}
                className="product-page-brand-swiper"
              >
                {brandProducts.map((product, index) => (
                  <SwiperSlide key={index}>
                    <Product product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          )}
          {categoryProducts.length > 0 && (
            <section id="product-page-category" className="product-category pt-3">
              <h3>
                Other products under <span className="text-primary">{product.category}</span>{" "}
                category
              </h3>
              <Swiper
                slidesPerView={1}
                breakpoints={{
                  576: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                }}
                modules={[Pagination]}
                pagination={{ clickable: true, dynamicBullets: true }}
                className="product-page-category-swiper"
              >
                {categoryProducts.map((product, index) => (
                  <SwiperSlide key={index}>
                    <Product product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductScreen;
