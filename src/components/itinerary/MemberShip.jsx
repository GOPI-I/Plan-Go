import React from 'react'
import "./membership.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
const MemberShip = () => {
  return (
    <Container className="pricing-container my-5">
      <h1 className="text-center mb-4">Travel Itinerary Planner - Pricing Plans</h1>
      <Row className="gy-4">
        {/* Basic Plan */}
        <Col md={4}>
          <Card className="pricing-card text-center">
            <Card.Body>
              <Card.Title>Basic</Card.Title>
              <Card.Text>
                <h2 className="pricing-price">₹0<span>/mo</span></h2>
                <ul className="features-list">
                  <li>Single Trip Itinerary</li>
                  <li>5 Document Uploads</li>
                  <li>Basic Travel Recommendations</li>
                  <li>Standard Support</li>
                </ul>
              </Card.Text>
              <Button variant="outline-success" className="w-100">
                Start For Free
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Premium Plan */}
        <Col md={4}>
          <Card className="pricing-card text-center premium-plan">
            <Card.Body>
              <Card.Title>Premium</Card.Title>
              <Card.Text>
                <h2 className="pricing-price">₹999<span>/mo</span></h2>
                <ul className="features-list">
                  <li>Unlimited Trip Itineraries</li>
                  <li>Real-Time Updates</li>
                  <li>Smart Travel Recommendations</li>
                  <li>Priority Support</li>
                  <li>Collaboration Tools</li>
                </ul>
              </Card.Text>
              <Button variant="success" className="w-100">
                Upgrade to Premium
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Enterprise Plan */}
        <Col md={4}>
          <Card className="pricing-card text-center">
            <Card.Body>
              <Card.Title>Enterprise</Card.Title>
              <Card.Text>
                <h2 className="pricing-price">₹2999<span>/mo</span></h2>
                <ul className="features-list">
                  <li>Everything in Premium</li>
                  <li>Team Collaboration</li>
                  <li>Custom Branding</li>
                  <li>Advanced Analytics</li>
                  <li>24/7 Dedicated Support</li>
                </ul>
              </Card.Text>
              <Button variant="success" className="w-100">
                Get Enterprise Plan
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default MemberShip