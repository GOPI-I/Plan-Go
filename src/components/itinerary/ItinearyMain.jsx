import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustDrop from "../CustDrop/CustDrop";
import "./itinearymain.css";
import SideBar from "./SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main stylesheet
import "react-date-range/dist/theme/default.css"; // Theme stylesheet
import ItinearyHeader from "./ItinearyHeader"; // Header component

const ItinearyMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [selectedFrom, setSelectedFrom] = useState("");

  // Helper functions
  const calculateTotalDays = () => {
    if (date[0]?.startDate && date[0]?.endDate) {
      return differenceInDays(date[0].endDate, date[0].startDate) + 1;
    }
    return 0;
  };

  const handleDateChange = (ranges) => {
    setDate([ranges.selection]);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleList = () => {
    if (!selectedFrom) {
      alert("Please select a departure location (From).");
      return; // Stop further execution if "From" is not selected
    }
  
    if (!date[0]?.startDate || !date[0]?.endDate) {
      alert("Please select valid start and end dates.");
      return; // Ensure dates are selected
    }
  
    navigate("/time", {
      state: {
        destination,
        selectedFrom,
        startDate: date[0].startDate,
        endDate: date[0].endDate,
      },
    });
  };
  

  return (
    <div className="d-flex app">
      {/* Sidebar Component */}
      <SideBar />
      
      {/* Main Content Section */}
      <div className="dashboard-main-content flex-grow-1">
        
        {/* Itinerary Header */}
        <ItinearyHeader />
        
        {/* Main Dashboard Container */}
        <Container className="dashboard-container">
          
          {/* Dropdown Section */}
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <CustDrop
                label="From"
                onSelect={(value) => setSelectedFrom(value)}
                options={[
                  "Mumbai, Maharashtra",
                  "Delhi, Delhi",
                  "Bengaluru, Karnataka",
                  "Chennai, Tamil Nadu",
                  "Kolkata, West Bengal",
                  "Hyderabad, Telangana",
                  "Ahmedabad, Gujarat",
                  "Pune, Maharashtra",
                  "Jaipur, Rajasthan",
                  "Lucknow, Uttar Pradesh",
                  "Surat, Gujarat",
                  "Bhopal, Madhya Pradesh",
                  "Indore, Madhya Pradesh",
                  "Chandigarh, Punjab & Haryana",
                  "Thiruvananthapuram, Kerala",
                  "Kochi, Kerala",
                  "Agra, Uttar Pradesh",
                  "Varanasi, Uttar Pradesh",
                  "Amritsar, Punjab",
                  "Shillong, Meghalaya"
                ]}
              />
            </Col>
            <Col md={6}>
              <div className="dashboard-lsItem">
                <label>Destination</label>
                {/* Destination displayed in a non-editable box */}
                <div className="destination-box">
                  {destination}
                </div>
              </div>
            </Col>
          </Row>

          {/* Start and End Date Section */}
          <label>Start Date and End Date: </label>
          <span>
            {date[0]
              ? `${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )}`
              : "Select Dates"}
          </span>
          <div className="dashboard-warning">
            Note: After this, you cannot change the dates.
          </div>

          {/* Edit Date Button */}
          <div className="mt-3">
            <Button
              variant="outline-primary"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              {showDatePicker ? "Close" : "Edit Dates"}
            </Button>
          </div>

          {/* Date Picker */}
          {showDatePicker && (
            <div className="mt-3">
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={date}
              />
            </div>
          )}

          {/* Total Days Section */}
          <div className="dashboard-total-days">
            <label>Total Days:</label>
            <span> {calculateTotalDays()} days</span>
          </div>

          {/* Guest and Adult Section */}
          <div className="dashboard-guest-details">
            <label>Guest Details:</label>
            <span> {options.adult} Adult(s) · {options.children} Child(ren)</span>
          </div>

          {/* Button Section for Flight and Hotel Details */}
          <Row>
            <Col className="text-center">
              <Button onClick={handleList} className="dashboard-next-button" size="lg">
                Create
              </Button>
            </Col>
            
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ItinearyMain;
