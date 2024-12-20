import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import "./action.css";

const Actions = () => {
  return (
    <div className="actions px-4 py-3">
      <Row className="justify-content-center">
        <Col md={6} className="mb-4">
          <Card className="action-card">
            <Card.Body>
              <Card.Title className="action-title">Download Itinerary</Card.Title>
              <Card.Text className="action-text">
                Download a copy of your flight itinerary for offline access.
              </Card.Text>
              <Button variant="success" className="action-btn">
                Download →
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="action-card">
            <Card.Body>
              <Card.Title className="action-title">Share Itinerary</Card.Title>
              <Card.Text className="action-text">
                Share your flight itinerary with friends or family.
              </Card.Text>
              <Button variant="info" className="action-btn">
                Share →
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Actions;
