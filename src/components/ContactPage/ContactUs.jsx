import React, { useEffect, useRef, useState } from "react";
import "./contact.css";
import { BreadCrumbs } from "../Back-conact-about/BreadCrumbs";
import { Col, Container, Row, Card, ListGroup } from "react-bootstrap";
import image from "../../assets/images/contact/cont-us.jpg";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const ref = useRef();
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    document.title = "Contact us";
    window.scroll(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_6l8a24t",
        "template_1zmi8hf",
        ref.current,
        "fcRhxWn9CFq1TPHf4"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
        }
      );
  };

  return (
    <>
      <BreadCrumbs title="Contact us" pagename="Contact us" />
      <section className="contact pt-5">
        <Container>
          <Row>
            <Col md="12">
              <h1 className="mb-2 h1 font-bold">
                Let's connect and get to know each other
              </h1>
              <p className="body-text mt-1">
                Have questions or need assistance? We're here to help you make
                the most of our services.
              </p>
            </Col>
          </Row>
          <Row className="py-5">
            <Col lg="4" md="6" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                  <div className="bg-info rounded-circle text-info shadow-sm bg-opacity-10 p-3 mb-2">
                    <i className="bi bi-headset h3"></i>
                  </div>
                  <Card.Title className="fw-bold h5">Call Us</Card.Title>
                  <p className="mb-3 body-text">
                    Reach out to us anytime via phone for quick support and
                    guidance.
                  </p>
                  <div className="d-block">
                    <a type="button" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-phone me-1"></i> 9345543332
                    </a>
                    <a type="button" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-telephone me-1"></i> 044 4064 4064
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4" md="6" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                  <div className="bg-danger rounded-circle text-danger shadow-sm bg-opacity-10 p-3 mb-2">
                    <i className="bi bi-envelope h3"></i>
                  </div>
                  <Card.Title className="fw-bold h5">Email Us</Card.Title>
                  <p className="mb-3 body-text">
                    Drop us an email, and we'll respond promptly to your
                    inquiries.
                  </p>
                  <div className="d-block">
                    <a type="button" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-envelope me-2"></i> plango@gmail.com
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4" md="12" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                  <div className="bg-warning rounded-circle text-warning shadow-sm bg-opacity-10 p-3 mb-2">
                    <i className="bi bi-globe h3"></i>
                  </div>
                  <Card.Title className="fw-bold h5">Social Media</Card.Title>
                  <p className="mb-3 body-text">
                    Stay updated by connecting with us on social media
                    platforms.
                  </p>
                  <div className="d-block justify-content-center">
                    <ListGroup horizontal className="justify-content-center">
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-youtube"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-instagram"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-twitter"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-facebook"></i>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="py-5 align-items-center">
            <Col xl="6" md="6" className="d-none d-md-block">
              <img src={image} alt="" className="img-fluid me-3 medium-image" />
            </Col>
            <Col xl="6" md="6">
              <Card className="bg-light p-4 border-0 shadow-sm">
                <div className="form-box">
                  <form
                    ref={ref}
                    onSubmit={handleSubmit}
                    className="custom-form"
                  >
                    <h1 className="form-title">Contact Us</h1>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="form-input"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-input"
                    />
                    <textarea
                      name="message"
                      placeholder="Write your message"
                      rows={10}
                      className="form-textarea"
                    ></textarea>
                    <button type="submit" className="form-button">
                      Send
                    </button>
                    {success && (
                      <p className="form-success">
                        Your message has been sent. We'll get back to you soon
                        :)
                      </p>
                    )}
                  </form>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ContactUs;
