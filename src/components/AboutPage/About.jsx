import React, { useState, useRef, useEffect } from "react";
import "./about.css";
import { Card, CardGroup, Container, Row, Col, Button } from "react-bootstrap";
import Karan from "../../assets/images/about/karan.png";
import Gopi from "../../assets/images/about/gopi.png";
import Vignesh from "../../assets/images/about/vignesh.png";
import Aqhib from "../../assets/images/about/aaqhib.png";
import { BreadCrumbs } from "../Back-conact-about/BreadCrumbs";

const About = () => {
  const [teamFact, setTeamFact] = useState("");
  const [dancing, setDancing] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [missionFact, setMissionFact] = useState("");
  const [valuesFact, setValuesFact] = useState("");

  const handleMeetTheTeamClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    if ((clickCount + 1) % 3 === 0) {
      setTeamFact("Congratulations! You've unlocked the team dance!");
      setDancing(true);
      setTimeout(() => setDancing(false), 3000);
    } else {
      setTeamFact("Keep clicking, you're getting closer...");
    }
  };
  const handleMissionClick = () => {
    const missionMessages = [
      "Mission Accomplished! Now you're ready to plan your best trip ever.",
      "The best mission? Helping you plan your dream vacations!",
      "We've set our mission to make your trip planning super easy and fun!",
    ];
    setMissionFact(
      missionMessages[Math.floor(Math.random() * missionMessages.length)]
    );
  };

  const handleValuesClick = () => {
    const valuesMessages = [
      "Simplicity, Innovation, and Customer Satisfaction — We’re not just about tech, we’re about YOU!",
      "We believe in keeping things simple. But when it comes to travel, we like to make it extraordinary.",
      "Innovation is our second name — just ask our team of rocket scientists!",
    ];
    setValuesFact(
      valuesMessages[Math.floor(Math.random() * valuesMessages.length)]
    );
  };

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
            <p className="text-lg text-gray-600">
              Simplifying travel planning, one trip at a time.
            </p>
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
                  <Card.Text>
                    At Interactive Travel Itinerary Planner, our mission is to
                    simplify trip planning with real-time updates, smart
                    recommendations, budget tracking, and collaborative features
                    for seamless travel experiences.
                  </Card.Text>
                  {missionFact && <p className="fun-fact">{missionFact}</p>}
                </Card.Body>
                <Card.Footer className="about-card-footer">
                  <Button className="about-button" onClick={handleMissionClick}>
                    Learn More
                  </Button>
                </Card.Footer>
              </Card>

              <Card as={Col} md={4} className="p-4 about-card">
                <Card.Header className="about-card-header">
                  <Card.Title>Our Team</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row className="g-3">
                    <Col md={6}>
                      <img
                        className={`about-profile ${dancing ? "dance" : ""}`}
                        src={Karan}
                        alt="Karan"
                      />
                      <p className="about-text-lg font-bold">KaranKumar</p>
                      <p className="about-text-gray-600">Founder & CEO</p>
                    </Col>
                    <Col md={6}>
                      <img
                        className={`about-profile ${dancing ? "dance" : ""}`}
                        src={Gopi}
                        alt="Gopi"
                      />
                      <p className="about-text-lg font-bold">Gopi</p>
                      <p className="about-text-gray-600">Co-Founder & CTO</p>
                    </Col>
                    <Col md={6}>
                      <img
                        className={`about-profile ${dancing ? "dance" : ""}`}
                        src={Vignesh}
                        alt="Vignesh"
                      />
                      <p className="about-text-lg font-bold">Vignesh</p>
                      <p className="about-text-gray-600">Product Manager</p>
                    </Col>
                    <Col md={6}>
                      <img
                        className={`about-profile ${dancing ? "dance" : ""}`}
                        src={Aqhib}
                        alt="Aqhib"
                      />
                      <p className="about-text-lg font-bold">Mohammad Aqhib</p>
                      <p className="about-text-gray-600">CIO</p>
                    </Col>
                  </Row>
                  {teamFact && <p className="fun-fact">{teamFact}</p>}
                </Card.Body>
                <Card.Footer className="about-card-footer">
                  <Button
                    className="about-button"
                    onClick={handleMeetTheTeamClick}
                  >
                    Make Team to Dance
                  </Button>
                </Card.Footer>
              </Card>

              <Card as={Col} md={4} className="p-4 about-card">
                <Card.Header className="about-card-header">
                  <Card.Title>Our Values</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    At Interactive Travel Itinerary Planner, we value
                    simplicity, innovation, and customer satisfaction.
                    <ul>
                      <li>
                        Simplicity: We believe that travel planning should be
                        easy and enjoyable.
                      </li>
                      <li>
                        Innovation: We're always looking for new ways to improve
                        our platform.
                      </li>
                      <li>
                        Customer Satisfaction: We're committed to providing the
                        best experience for our users.
                      </li>
                    </ul>
                  </Card.Text>
                  {valuesFact && <p className="fun-fact">{valuesFact}</p>}
                </Card.Body>
                <Card.Footer className="about-card-footer">
                  <Button className="about-button" onClick={handleValuesClick}>
                    Learn More
                  </Button>
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
