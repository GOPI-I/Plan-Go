import React, { useState } from "react";
import "./list.css";
import { useLocation } from "react-router-dom";
import ListHeader from "./ListHeader";
import { Button } from "react-bootstrap";

const FlightList = () => {
  // Extracting data from location state (passed from Dashboard.jsx)
  const location = useLocation();
  const { destination, date, selectedFrom, totalDays } = location.state || {};

  // Enhanced fake flight data
  const flightData = [
    { id: 1, flightNumber: "6E-123", airline: "IndiGo", logo: "https://via.placeholder.com/50", departure: "07:15 AM", arrival: "10:00 AM", duration: "2h 45m", price: "₹15,785.02", stops: "Direct", status: "On-Time" },
    { id: 2, flightNumber: "AI-456", airline: "Air India", logo: "https://via.placeholder.com/50", departure: "10:30 AM", arrival: "02:00 PM", duration: "3h 30m", price: "₹17,000.00", stops: "1 Stop", status: "Delayed" },
    { id: 3, flightNumber: "SG-789", airline: "SpiceJet", logo: "https://via.placeholder.com/50", departure: "01:00 PM", arrival: "03:30 PM", duration: "2h 30m", price: "₹14,500.00", stops: "Direct", status: "On-Time" },
    { id: 4, flightNumber: "AK-101", airline: "Akasa Air", logo: "https://via.placeholder.com/50", departure: "08:15 AM", arrival: "12:00 PM", duration: "3h 45m", price: "₹16,200.00", stops: "1 Stop", status: "Delayed" },
    { id: 5, flightNumber: "MH-555", airline: "Malaysia Airlines", logo: "https://via.placeholder.com/50", departure: "11:00 AM", arrival: "02:30 PM", duration: "3h 30m", price: "₹18,750.00", stops: "Direct", status: "On-Time" },
    // Add more flights as needed
  ];

  const [filters, setFilters] = useState({
    stops: "Any",
    airlines: {
      IndiGo: true,
      "Air India": true,
      "Akasa Air": true,
      SpiceJet: true,
      "Malaysia Airlines": true,
    },
  });

  const applyFilters = () => {
    return flightData.filter(
      (flight) =>
        (filters.stops === "Any" || flight.stops === filters.stops) &&
        filters.airlines[flight.airline]
    );
  };

  const filteredFlights = applyFilters();

  return (
    <>
      <ListHeader/>

      <div className="list-container">
        <div className="list-header">
          <div className="trip-options">
            <label>
              <input type="radio" name="trip" defaultChecked /> Round trip
            </label>
            <label>
              <input type="radio" name="trip" /> One way
            </label>
            <label>
              <input type="radio" name="trip" /> Multi-city
            </label>
            <label>
              <input type="checkbox" /> Direct flights only
            </label>
          </div>
          <div className="search-box">
            <span>
              <strong>From:</strong> {selectedFrom || "Unknown"}
            </span>
            <span>
              <strong>To:</strong> {destination || "Unknown"}
            </span>
            <span>
              <strong>Dates:</strong>{" "}
              {date?.[0]
                ? `${date[0].startDate.toDateString()} - ${date[0].endDate.toDateString()}`
                : "No dates selected"}
            </span>
          </div>
        </div>

        <div className="list-body">
          {/* Left Sidebar - Filters */}
          <div className="filters">
            <h3>Filters</h3>
            <div>
              <h4>Stops</h4>
              <label>
                <input
                  type="radio"
                  name="stops"
                  value="Any"
                  defaultChecked
                  onChange={() => setFilters({ ...filters, stops: "Any" })}
                />{" "}
                Any
              </label>
              <label>
                <input
                  type="radio"
                  name="stops"
                  value="Direct"
                  onChange={() => setFilters({ ...filters, stops: "Direct" })}
                />{" "}
                Direct only
              </label>
              <label>
                <input
                  type="radio"
                  name="stops"
                  value="1 Stop"
                  onChange={() => setFilters({ ...filters, stops: "1 Stop" })}
                />{" "}
                1 stop max
              </label>
            </div>
            <div>
              <h4>Airlines</h4>
              {Object.keys(filters.airlines).map((airline) => (
                <label key={airline}>
                  <input
                    type="checkbox"
                    checked={filters.airlines[airline]}
                    onChange={() =>
                      setFilters({
                        ...filters,
                        airlines: {
                          ...filters.airlines,
                          [airline]: !filters.airlines[airline],
                        },
                      })
                    }
                  />{" "}
                  {airline}
                </label>
              ))}
            </div>
          </div>

          {/* Main Content - Flight Details */}
          <div className="flight-results">
            <div className="sort-options">
              <button>Best</button>
              <button>Cheapest</button>
              <button>Fastest</button>
            </div>
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <div className="flight-card" key={flight.id}>
                  <img src={flight.logo} alt={flight.airline} className="flight-logo" />
                  <div>
                    <strong>Flight Number:</strong> {flight.flightNumber}
                  </div>
                  <div>
                    <strong>Airline:</strong> {flight.airline}
                  </div>
                  <div>
                    <strong>Departure:</strong> {flight.departure}
                  </div>
                  <div>
                    <strong>Arrival:</strong> {flight.arrival}
                  </div>
                  <div>
                    <strong>Duration:</strong> {flight.duration}
                  </div>
                  <div>
                    <strong>Price:</strong> {flight.price}
                  </div>
                  <div>
                    <strong>Stops:</strong> {flight.stops}
                  </div>
                  <div style={{ color: flight.status === "On-Time" ? "green" : "red" }}>
                    <strong>Status:</strong> {flight.status}
                  </div>
                  <Button variant="primary" href="#">
                Book Now
                  </Button>
                </div>
              ))
            ) : (
              <div>No flights match the selected filters.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightList;
