import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./flightinfo.css"
import SideBar from "../itinerary/SideBar";
import Heade from "../itinerary/Heade";

const FlightInfo = () => {
  // Dummy flight data
  const flights = [
    {
      airline: "Air India",
      logo: "https://via.placeholder.com/50",
      flightNumber: "AI-202",
      departure: "Chennai (MAA)",
      departureTime: "10:30 AM",
      arrival: "Mumbai (BOM)",
      arrivalTime: "12:45 PM",
      duration: "2h 15m",
      status: "On Time",
    },
    {
      airline: "IndiGo",
      logo: "https://via.placeholder.com/50",
      flightNumber: "6E-765",
      departure: "Delhi (DEL)",
      departureTime: "2:00 PM",
      arrival: "Bangalore (BLR)",
      arrivalTime: "4:30 PM",
      duration: "2h 30m",
      status: "Delayed",
    },
    {
      airline: "SpiceJet",
      logo: "https://via.placeholder.com/50",
      flightNumber: "SG-308",
      departure: "Kolkata (CCU)",
      departureTime: "6:00 PM",
      arrival: "Delhi (DEL)",
      arrivalTime: "8:30 PM",
      duration: "2h 30m",
      status: "On Time",
    },
    {
      airline: "GoAir",
      logo: "https://via.placeholder.com/50",
      flightNumber: "G8-110",
      departure: "Mumbai (BOM)",
      departureTime: "9:00 AM",
      arrival: "Pune (PNQ)",
      arrivalTime: "9:50 AM",
      duration: "50m",
      status: "On Time",
    },
    {
      airline: "Vistara",
      logo: "https://via.placeholder.com/50",
      flightNumber: "UK-220",
      departure: "Hyderabad (HYD)",
      departureTime: "11:45 AM",
      arrival: "Chennai (MAA)",
      arrivalTime: "1:15 PM",
      duration: "1h 30m",
      status: "On Time",
    },
    {
      airline: "AirAsia",
      logo: "https://via.placeholder.com/50",
      flightNumber: "I5-801",
      departure: "Bangalore (BLR)",
      departureTime: "4:30 PM",
      arrival: "Delhi (DEL)",
      arrivalTime: "7:00 PM",
      duration: "2h 30m",
      status: "Delayed",
    },
    {
      airline: "Emirates",
      logo: "https://via.placeholder.com/50",
      flightNumber: "EK-505",
      departure: "Mumbai (BOM)",
      departureTime: "9:30 PM",
      arrival: "Dubai (DXB)",
      arrivalTime: "11:30 PM",
      duration: "2h",
      status: "On Time",
    },
    {
      airline: "Qatar Airways",
      logo: "https://via.placeholder.com/50",
      flightNumber: "QR-571",
      departure: "Delhi (DEL)",
      departureTime: "3:15 AM",
      arrival: "Doha (DOH)",
      arrivalTime: "6:00 AM",
      duration: "3h 45m",
      status: "On Time",
    },
    {
      airline: "Singapore Airlines",
      logo: "https://via.placeholder.com/50",
      flightNumber: "SQ-403",
      departure: "Mumbai (BOM)",
      departureTime: "11:15 PM",
      arrival: "Singapore (SIN)",
      arrivalTime: "7:15 AM",
      duration: "5h 30m",
      status: "On Time",
    },
    {
      airline: "British Airways",
      logo: "https://via.placeholder.com/50",
      flightNumber: "BA-142",
      departure: "Delhi (DEL)",
      departureTime: "3:30 AM",
      arrival: "London (LHR)",
      arrivalTime: "8:00 AM",
      duration: "8h 30m",
      status: "Delayed",
    },
  ];

  return (
    <div className="app d-flex">
      <SideBar/>
      <div className="main-content flex-grow-1">
        <Heade/>
        <Container className="flight-info-container py-4">
      <h1 className="text-center mb-4">Flight Information</h1>
      <div className="flight-spinner">
        {flights.map((flight, index) => (
          <Card key={index} className="flight-card shadow-sm mb-3">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <img
                  src={flight.logo}
                  alt={`${flight.airline} Logo`}
                  className="airline-logo"
                />
                <div className="ms-3">
                  <h5 className="m-0">{flight.airline}</h5>
                  <small>{flight.flightNumber}</small>
                </div>
              </div>
              <div className="flight-details">
                <p>
                  <strong>Departure:</strong> {flight.departure} at{" "}
                  {flight.departureTime}
                </p>
                <p>
                  <strong>Arrival:</strong> {flight.arrival} at{" "}
                  {flight.arrivalTime}
                </p>
                <p>
                  <strong>Duration:</strong> {flight.duration}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      flight.status === "On Time" ? "text-success" : "text-danger"
                    }
                  >
                    {flight.status}
                  </span>
                </p>
              </div>
              <Button variant="primary" href="#">
                Book Now
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
        
      </div>
    </div>
   
    
  );
};

export default FlightInfo;
