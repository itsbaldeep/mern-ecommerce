// Dependencies
import { useEffect } from "react";
import { Container, Row, Col, Form, Button, Accordion, Tabs, Tab } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Pagination, Autoplay } from "swiper";
import parse from "html-react-parser";
import {
  FaBookmark,
  FaBookOpen,
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaGoogle,
  FaMapMarkedAlt,
  FaMapMarker,
  FaPencilAlt,
  FaPhone,
  FaTag,
  FaWhatsapp,
} from "react-icons/fa";

// Actions
import {
  loadDirectory,
  loadDirectoryProducts,
  loadDirectoryServices,
  reviewDirectory,
  removeReview,
} from "redux/actions/directory";
import { addInquiry } from "redux/actions/inquiry";

// Helpers
import { directoryInquiry as dirInqInitialValues } from "helpers/initialValues";
import { directoryInquiry as dirInqValidationSchema } from "helpers/validationSchemas";
import { directoryReview as dirRevInitialValues } from "helpers/initialValues";
import { directoryReview as dirRevValidationSchema } from "helpers/validationSchemas";

// Components
import Ratings from "components/Ratings";
import Review from "components/Review";
import ReviewGraph from "components/ReviewGraph";
import { TextField } from "components/InputFields.jsx";

// Config
import { days } from "config.json";

function tConvert(timeString) {
  if (timeString === "") return;
  const H = +timeString.substr(0, 2);
  const h = H % 12 || 12;
  const ampm = H < 12 ? " AM" : " PM";
  timeString = h + timeString.substr(2, 3) + ampm;
  return timeString;
}

const BannerInfo = ({ directory }) => {
  const diffTime = Math.abs(new Date() - new Date(directory.createdAt));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="dir-slider-info">
      <h4>{directory.storeName}</h4>
      <Ratings rating={directory.averageRating} size={20} />
      <p className="pt-2">
        <FaMapMarker /> {directory.address}, {directory.city}, {directory.state},{" "}
        {directory.pincode}
      </p>
      <p>
        <FaBookmark /> {directory.category?.join(", ")}
      </p>
      <p>Added: {diffDays} days ago</p>
    </div>
  );
};

const BannerButtons = ({ directory }) => {
  return (
    <div className="dir-slider-buttons">
      <div className="dir-slider-button">
        <a
          target="_blank"
          rel="noreferrer"
          href={`http://maps.google.com/maps?z=12&t=m&q=loc:${directory.location?.lat}+${directory.location?.lng}`}
        >
          <FaGoogle size={25} />
        </a>
      </div>
      <div className="dir-slider-button">
        <a href={`tel:${directory.number}`}>
          <FaPhone size={25} />
        </a>
      </div>
      <div className="dir-slider-button">
        <a href={`mailto:${directory.email}`}>
          <FaEnvelope size={25} />
        </a>
      </div>
      <div className="dir-slider-button">
        <a href={`https://api.whatsapp.com/send?phone=${directory.number}`}>
          <FaWhatsapp size={25} />
        </a>
      </div>
    </div>
  );
};

const DirectoryProfileScreen = ({ match }) => {
  const dispatch = useDispatch();
  const { loading: directoryLoading, directory } = useSelector((state) => state.directory);
  const { loading: inquiryLoading, success } = useSelector((state) => state.inquiry);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadDirectory(match.params.username));
    dispatch(loadDirectoryProducts(match.params.username));
    dispatch(loadDirectoryServices(match.params.username));
  }, []);

  const existingReview = directory.reviews?.filter(
    (review) => review?.reviewer._id.toString() === user?._id.toString()
  )?.[0];

  return (
    <>
      {directoryLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Swiper
            loop
            autoplay={{ delay: 2000 }}
            slidesPerView={"auto"}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="dir-swiper"
          >
            {directory.directoryImages?.length > 0 ? (
              directory.directoryImages?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="dir-slider-container">
                    <BannerInfo directory={directory} />
                    <img
                      className="dir-slider-img"
                      src={image}
                      alt={`Directory profile for ${directory.storeName}`}
                    />
                    <BannerButtons directory={directory} />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="dir-slider-container">
                  <BannerInfo directory={directory} />
                  <img
                    className="dir-slider-img"
                    src={"/assets/placeholders/store.png"}
                    alt={`Directory profile for ${directory.storeName}`}
                  />
                  <BannerButtons directory={directory} />
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          <Container fluid>
            <Row className="dir-gallery-and-info p-3">
              <Col md="6" sm="12">
                <h3 className="px-4">Gallery</h3>
                <Row className="dir-gallery-images">
                  {directory.gallery?.map((image, index) => (
                    <Col xs={4} className="py-1" key={index}>
                      <a href={image}>
                        <img src={image} alt={`Gallery for ${directory.storeName} #${index}`} />
                      </a>
                    </Col>
                  ))}
                  <Col xs={4} className="dir-add-photo">
                    <span>+</span>Add Photo
                  </Col>
                </Row>
              </Col>
              <Col md="6" sm="12" className="dir-store-info">
                <h3>Store Information</h3>
                <h4>{directory.storeName}</h4>
                <p>
                  <FaMapMarkedAlt className="mx-2 text-primary" size={20} />
                  {directory.address}, {directory.city}, {directory.state}, {directory.pincode}
                </p>
                <p>
                  <FaEnvelope className="mx-2 text-primary" size={20} />
                  <a href={`mailto:${directory.email}`}>Send inquiry by email</a>
                </p>
                <p>
                  <FaPhone className="mx-2 text-primary" size={20} />
                  <a href={`tel:${directory.number}`}>{directory.number}</a>
                </p>
                <div>
                  <p>Ratings: {directory.averageRating}</p>
                  <Ratings rating={directory.averageRating} size={20} />
                  <a href="#dir-reviews">View all reviews</a>
                </div>
                <br />
                <br />
                <p>Listed in the following categories:</p>
                {directory.category?.map((category, index) => (
                  <p key={index}>
                    <FaTag className="text-primary mx-2" size={18} />
                    {category}
                  </p>
                ))}
                {directory.features?.length > 0 && (
                  <>
                    <p>Features</p>
                    {directory.features?.map((feature, index) => (
                      <p key={index}>
                        <FaCheckCircle className="text-primary mx-2" size={18} />
                        {feature}
                      </p>
                    ))}
                  </>
                )}
              </Col>
            </Row>
          </Container>
          <Container className="py-2">
            <Row className="pt-4">
              <Col md="6" sm="12">
                <div>
                  <h3>Product Details</h3>
                  <p>
                    <strong>{directory.storeName}</strong> offers you the following products:
                  </p>
                  {directory.products?.length === 0 && <p>No products available at this moment.</p>}
                  <ul>
                    {directory.products?.map((product, index) => (
                      <li key={index}>{product}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3">
                  <h3>Service Details</h3>
                  <p>
                    <strong>{directory.storeName}</strong> offers you the following services:
                  </p>
                  {directory.services?.length === 0 && <p>No services available at this moment.</p>}
                  <ul>
                    {directory.services?.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="dir-inquiry-form p-3">
                  <div>
                    <h3>Send an inquiry to {directory.storeName}</h3>
                  </div>
                  <Formik
                    initialValues={dirInqInitialValues}
                    validationSchema={dirInqValidationSchema}
                    onSubmit={(values) => {
                      const data = { ...values, directory: directory._id };
                      dispatch(addInquiry(data));
                    }}
                  >
                    {({ handleSubmit }) => (
                      <Form onSubmit={handleSubmit}>
                        <fieldset disabled={success}>
                          <TextField name="name" label="Name*" placeholder="Enter your name here" />
                          <TextField name="number" label="Phone Number*" placeholder="9876543210" />
                          <TextField name="email" label="Email" placeholder="email@example.com" />
                          <TextField
                            name="message"
                            label="Your message*"
                            placeholder="Enter your detailed message here"
                            as="textarea"
                            rows={5}
                          />
                        </fieldset>
                        <Button
                          type="submit"
                          size="lg"
                          variant={success ? "success" : "primary"}
                          disabled={inquiryLoading || success}
                        >
                          {inquiryLoading ? "Sending" : success ? "Sent" : "Send"}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
            <section id="dir-reviews" className="dir-reviews pt-3">
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
                        <p>Your review on {directory.storeName}</p>
                        <Review review={existingReview} />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => dispatch(removeReview(match.params.username))}
                        >
                          Delete Review
                        </Button>
                      </div>
                    ) : (
                      <Formik
                        initialValues={dirRevInitialValues}
                        validationSchema={dirRevValidationSchema}
                        onSubmit={(values) =>
                          dispatch(reviewDirectory(values, match.params.username))
                        }
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
                            <TextField
                              name="rating"
                              label="Rating"
                              type="number"
                              placeholder="1-5"
                            />
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
                      ratings={directory.rating}
                      average={directory.averageRating}
                      total={directory.reviews?.length}
                    />
                    {directory.reviews?.map((review, index) => (
                      <Review key={index} review={review} />
                    ))}
                  </>
                </Tab>
              </Tabs>
            </section>
            <section className="dir-faq pt-4">
              <h3>Frequently asked questions</h3>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>What are the timings of this store?</Accordion.Header>
                  <Accordion.Body>
                    {directory.timings?.map((timing, index) => {
                      const from = tConvert(timing.from);
                      const to = tConvert(timing.to);
                      return (
                        <p key={index}>
                          {days[index]}: {from && to ? `${from} to ${to}` : `Closed`}
                        </p>
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>
                {directory.faq?.map((qa, index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{qa.question}</Accordion.Header>
                    <Accordion.Body>{qa.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </section>
            <section className="dir-business-info py-3">
              <h3>Business Information</h3>
              <div>
                {parse(directory.description || "<p>No information available at the moment</p>")}
              </div>
            </section>
          </Container>
        </>
      )}
    </>
  );
};

export default DirectoryProfileScreen;
