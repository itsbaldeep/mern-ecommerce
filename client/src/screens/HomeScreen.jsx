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
            <h1 class="display-5 mt-2">Love and treat pets like royalty</h1>
            <p class="lead">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum non, tenetur iure
              sequi iste amet dolores quibusdam reprehenderit. Maxime, non?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, laborum et
              voluptatum atque sed maxime recusandae voluptate at iure tempora.
            </p>
            <p class="lead mb-2">
              <a class="btn btn-light btn-lg" href="#" role="button">
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
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, tenetur quaerat</p>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="img-container">
                <img src="assets/images/supplement-gradient.png" alt="" />
              </div>
              <h3 className="my-3">Pet Grooming</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, tenetur quaerat</p>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="img-container">
                <img src="assets/images/shampoo-gradient.png" alt="" />
              </div>
              <h3 className="my-3">Care Service</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, tenetur quaerat</p>
            </Col>
            <Col xs={12} sm={6} md={3}>
              <div className="img-container">
                <img src="assets/images/house-pet-gradient.png" alt="" />
              </div>
              <h3 className="my-3">Pet Adoption</h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, tenetur quaerat</p>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col xs={12} md={6} className="our-company-section">
              <h3>Our Company</h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam maxime alias eius.
                Aliquid, cum exercitationem.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam assumenda quia
                molestias! Corrupti, consequatur hic?
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
                    (+91) 9999999999 <br /> petohubofficial@gmail.com
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
                backgroundPosition: "center",
                height: "300px",
              }}
            >
              <h3 className="text-light">Donate and support us</h3>
              <a className="btn btn-dark btn-md" href="#" role="button">
                Donate now
              </a>
            </Col>
            <Col md={3} sm={6} xs={12} className="adopt-pet-section px-2">
              <img src="assets/images/adopt-cat.jpg" alt="" />
              <h4 className="my-4">Adopt a Cat</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <a href="#" className="btn btn-dark btn-md">
                See the cats
              </a>
            </Col>
            <Col md={3} sm={6} xs={12} className="adopt-pet-section px-2">
              <img src="assets/images/adopt-dog.jpg" alt="" />
              <h4 className="my-4">Adopt a Dog</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <a href="#" className="btn btn-dark btn-md">
                See the dogs
              </a>
            </Col>
            <Col md={3} sm={6} xs={12} className="adopt-pet-section px-2">
              <img src="assets/images/adopt-others.jpg" alt="" />
              <h4 className="my-4">Other Pets</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <a href="#" className="btn btn-dark btn-md">
                See the pets
              </a>
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
                  <button className="btn btn-dark" type="submit">
                    Subscribe
                  </button>
                </form>
              </Col>
            </Row>
          </Row>
        </Container>
        <Row className="footer-section text-center text-light">
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
          <Col md={3} sm={6} xs={12}>
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
          <div className="py-2">
            <p>Copyright &copy; 2021 Petohub. All rights reserved</p>
          </div>
        </Row>
      </section>
    </main>
  );
};

export default HomeScreen;
