import React, { useState, useRef, useEffect } from 'react';
import "./about.css";
import { Card, CardGroup, Container, Row, Col, Button } from 'react-bootstrap';
import Karan from "../../assets/images/about/karan.png";
import Gopi from "../../assets/images/about/gopi.png";
import Vignesh from "../../assets/images/about/vignesh.png";
import { BreadCrumbs } from "../Back-conact-about/BreadCrumbs";

const About = () => {
  const ref = useRef();
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    document.title = "About Us";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <BreadCrumbs title="About Us" pagename="About Us" />
      <Container className="about-container">
        <Row className="text-center mb-12">
          <Col>
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="text-lg text-gray-600">Simplifying travel planning, one trip at a time.</p>
          </Col>
        </Row>

        <Row className="mb-12">
          <Col>
            <CardGroup as={Row} className="g-3">
              <Card as={Col} md={4} className="p-4 about-card">
                <Card.Header className="about-card-header">
                  <Card.Title>Our Mission</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>At Interactive Travel Itinerary Planner, our mission is to simplify trip planning with real-time updates, smart recommendations, budget tracking, and collaborative features for seamless travel experiences.</Card.Text>
                </Card.Body>
                <Card.Footer className="about-card-footer">
                  <Button className="about-button">Learn More</Button>
                </Card.Footer>
              </Card>

              <Card as={Col} md={4} className="p-4 about-card">
                <Card.Header className="about-card-header">
                  <Card.Title>Our Team</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row className="g-3">
                    <Col md={6}>
                      <img className='about-profile' src={Karan} />
                      <p className="about-text-lg font-bold">KaranKuamr G</p>
                      <p className="about-text-gray-600">Founder & CEO</p>
                    </Col>
                    <Col md={6}>
                      <img className='about-profile' src={Gopi} />
                      <p className="about-text-lg font-bold">Gopi I</p>
                      <p className="about-text-gray-600">Co-Founder & CTO</p>
                    </Col>
                    <Col md={6}>
                      <img className='about-profile' src={Vignesh} />
                      <p className="about-text-lg font-bold">Vignesh M</p>
                      <p className="about-text-gray-600">Product Manager</p>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="about-card-footer">
                  <Button className="about-button">Meet the Team</Button>
                </Card.Footer>
              </Card>

              <Card as={Col} md={4} className="p-4 about-card">
                <Card.Header className="about-card-header">
                  <Card.Title>Our Values</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>At Interactive Travel Itinerary Planner, we value simplicity, innovation, and customer satisfaction.</Card.Text>
                  <ul>
                    <li>Simplicity: We believe that travel planning should be easy and enjoyable.</li>
                    <li>Innovation: We're always looking for new ways to improve our platform.</li>
                    <li>Customer Satisfaction: We're committed to providing the best experience for our users.</li>
                  </ul>
                </Card.Body>
                <Card.Footer className="about-card-footer">
                  <Button className="about-button">Learn More</Button>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
