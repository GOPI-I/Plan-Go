import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./content.css";

const Content = () => {
  return (
    <div className="content px-4 py-3">
      <Row className="mb-4 justify-content-center">
        <Col md={4} className="d-flex justify-content-center">
          <NavLink to="/flight-information" className="info-link">
            <Button className="info-button">
              <div className="info-title">Flight Information</div>
              <p className="info-text">
                Airline logo, flight number, departure/arrival cities & times, flight duration
              </p>
            </Button>
          </NavLink>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <NavLink to="/traveler-information" className="info-link">
            <Button className="info-button">
              <div className="info-title">Traveler Information</div>
              <p className="info-text">Passenger name(s), seat number(s)</p>
            </Button>
          </NavLink>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <NavLink to="/document-uploads" className="info-link">
            <Button className="info-button">
              <div className="info-title">Document Uploads</div>
              <p className="info-text">Upload Your Documents like Tickets, Visa, etc.</p>
            </Button>
          </NavLink>
        </Col>
      </Row>
    </div>
  );
};

export default Content;
