import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <main>
      <section className="jumbotron main-section py-3">
        <div
          style={{
            content: "",
            backgroundImage: "url('assets/images/cat-watching.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            opacity: 0.85,
            filter: "brightness(60%)",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            zIndex: -1,
          }}
        ></div>
        <Container>
          <div>
            <h1 className="display-5 mt-2">Love and treat pets like royalty</h1>
            <p className="lead">
              Welcome to Petohub. Best place for pet lovers, made by pet lovers
            </p>
            <p>
              Provide love and care to pets by becoming a part of the Petohub community. Discover
              what's the best way to care for your pets.
            </p>
            <p className="lead mb-2">
              <a className="btn btn-light btn-lg" href="/directories" role="button">
                Get Started
              </a>
            </p>
          </div>
        </Container>
      </section>
      <section className="pt-4 content-section">
        <Container>
          <Row className="text-center mb-5">
            <Col xs={12} sm={6} md={3}>
              <div className="img-container">
                <img src="assets/images/cats-gradient.png" alt="" />
              </div>
              <h3 className="my-3">Pet Training</h3>
              <p>
                Find a trainer specially suited for your type of pet and book an appointment right
                at your convenience.
              </p>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="img-container">
                <img src="assets/images/supplement-gradient.png" alt="" />
              </div>
              <h3 className="my-3">Pet Grooming</h3>
              <p>
                Make your pet shine with the special grooming services provided by top rated
                specialists.
              </p>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="img-container">
                <img src="assets/images/shampoo-gradient.png" alt="" />
              </div>
              <h3 className="my-3">Care Service</h3>
              <p>Get all rounded care from certified professional from all over the city.</p>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="img-container">
                <img src="assets/images/house-pet-gradient.png" alt="" />
              </div>
              <h3 className="my-3">Pet Adoption</h3>
              <p>Give homeless pets a home by adopting a pet and contributing to the society.</p>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col xs={12} md={6} className="our-company-section">
              <h3>Our Company</h3>
              <p>
                We provide specialised and personalised care catered for your and your pet's needs
                in a fast and reliable manner.
              </p>
              <p>
                You can choose from various top brands and professionals to give your pets the care
                they deserve. Our company aims to make sure that your pet is taken care of in the
                best possible way.
              </p>
              <Row className="text-center mt-2">
                <Col xs={12} sm={6}>
                  <i className="fas fa-building"></i>
                  <h5 className="my-3">Our Office</h5>
                  <p>Mukhram Garden, Tilak Nagar, New Delhi, 110018</p>
                </Col>
                <Col xs={12} sm={6}>
                  <i className="fas fa-phone"></i>
                  <h5 className="my-3">Our Contact</h5>
                  <p>
                    (+91) 7011923045 <br /> petohubofficial@gmail.com
                  </p>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className="px-4 our-company-images">
              <Row className="text-center">
                <Col className="p-0">
                  <img style={{ marginTop: "30px" }} src="assets/images/our-company-1.jpg" alt="" />
                </Col>
                <Col className="p-0">
                  <img src="assets/images/our-company-2.jpg" alt="" />
                </Col>
                <Col className="p-0">
                  <img style={{ marginTop: "30px" }} src="assets/images/our-company-3.jpg" alt="" />
                </Col>
                <Col className="p-0">
                  <img src="assets/images/our-company-4.jpg" alt="" />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="my-2 donation-adoption-section">
            <Col
              md={3}
              sm={6}
              xs={12}
              className="donation-section px-2"
              style={{
                backgroundImage: 'url("assets/images/donation-section-image.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                height: "394px",
              }}
            >
              <h3 className="text-light">Donate and support us</h3>
              <a className="btn btn-dark btn-md" href="/donate" role="button">
                Donate now
              </a>
            </Col>
            <Col md={3} sm={6} xs={12} className="adopt-pet-section px-2">
              <img src="assets/images/adopt-cat.jpg" alt="" />
              <h4 className="my-4">Adopt a Cat</h4>
              <p>
                Cats are believed to be the only mammals who don't taste sweetness. Show sweetness
                to homeless cats by providing them shelter.
              </p>
              <button className="btn btn-dark btn-md">See the cats</button>
            </Col>
            <Col md={3} sm={6} xs={12} className="adopt-pet-section px-2">
              <img src="assets/images/adopt-dog.jpg" alt="" />
              <h4 className="my-4">Adopt a Dog</h4>
              <p>
                Their sense of smell is at least 40x better than ours. Let these dogs smell the
                scent of home by taking one home
              </p>
              <button className="btn btn-dark btn-md">See the dogs</button>
            </Col>
            <Col md={3} sm={6} xs={12} className="adopt-pet-section px-2">
              <img src="assets/images/adopt-others.jpg" alt="" />
              <h4 className="my-4">Other Pets</h4>
              <p>
                75% of pet owners celebrate their pet's birthday. A companion is sometimes all you
                need to enrich your life with positivity.
              </p>
              <button className="btn btn-dark btn-md">See the pets</button>
            </Col>
          </Row>
          <Row>
            <Row className="newsletter py-5 text-center my-2">
              <Col xs={12} md={6}>
                <h4 className="text-light">Subscribe to our newsletter</h4>
              </Col>
              <Col xs={12} md={6}>
                <form className="newsletter-form">
                  <input type="email" className="form-control" placeholder="Enter your email" />
                  <button className="btn btn-dark my-2" type="submit">
                    Subscribe
                  </button>
                </form>
              </Col>
            </Row>
          </Row>
        </Container>
        <Row className="footer-section text-center text-light pt-3">
          <Col md={3} sm={6} xs={12} className="footer-first">
            <div className="footer-img-container">
              <img src="assets/logo/Petohub-Logo-Wide.png" alt="" width="160px" />
            </div>
            <div className="py-2">
              <i className="fas fa-home"></i>
              <p> Mukhram Garden, Tilak Nagar, New Delhi, 110018</p>
            </div>
            <div className="py-2">
              <i className="fas fa-envelope"></i>
              <p> petohubofficial@gmail.com</p>
            </div>
            <div className="py-2">
              <i className="fas fa-phone"></i>
              <p> +91 9999999999</p>
            </div>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <div className="quick-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">Services</Link>
                </li>
                <li>
                  <Link to="/">Shop</Link>
                </li>
                <li>
                  <Link to="/">NGOs</Link>
                </li>
                <li>
                  <Link to="/">Contact Us</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <div className="information">
              <h4>Information</h4>
              <ul>
                <li>
                  <Link to="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/">Terms of Use</Link>
                </li>
                <li>
                  <Link to="/">Disclaimer</Link>
                </li>
                <li>
                  <Link to="/">FAQ</Link>
                </li>
                <li>
                  <Link to="/">Help Center</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col md={3} sm={6} xs={12} className="pb-2">
            <h4>Catch us on Social Media</h4>
            <div className="social-links">
              <div className="facebook">
                <Link to="/">
                  <i className="fab fa-facebook"></i>
                  <p> Facebook</p>
                </Link>
              </div>
              <div className="twitter">
                <Link to="/">
                  <i className="fab fa-twitter"></i>
                  <p> Twitter</p>
                </Link>
              </div>
              <div className="instagram">
                <Link to="/">
                  <i className="fab fa-instagram"></i>
                  <p> Instagram</p>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </main>
  );
};

export default HomeScreen;
