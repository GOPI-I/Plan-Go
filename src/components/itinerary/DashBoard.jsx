import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustDrop from "../CustDrop/CustDrop";
import "./dashboard.css";
import SideBar from "./SideBar";
import Heade from "./Heade";
import { useLocation, useNavigate } from "react-router-dom";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main stylesheet
import "react-date-range/dist/theme/default.css"; // Theme stylesheet

const DashBoard = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  const [selectedFrom, setSelectedFrom] = useState("");
  const navigate = useNavigate();

  const calculateTotalDays = () => {
    if (date[0]?.startDate && date[0]?.endDate) {
      return differenceInDays(date[0].endDate, date[0].startDate) + 1;
    }
    return 0;
  };

  const handleDateChange = (ranges) => {
    setDate([ranges.selection]);
  };

  const handleList = () => {
    navigate("/list", {
      state: {
        destination,
        date,
        selectedFrom,
        totalDays: calculateTotalDays(),
      },
    });
  };
const handleHotelList = ()=>{
  navigate("/hotelList", {
    state: {
      destination,
      date,
      options

    },
  });
};
  return (
    <div className="d-flex app">
      <SideBar />
      <div className="dashboard-main-content flex-grow-1">
        <Heade />
        <Container className="dashboard-container">
          {/* Dropdown Section */}
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <CustDrop
                label="From"
                onSelect={(value) => setSelectedFrom(value)}
                options={[
                  "USA, Turkish",
                  "Tokyo, Japan",
                  "Sydney, Australia",
                  "Melbourne, Australia",
                  "Paris, France",
                ]}
              />
            </Col>
            <Col md={6}>
              <div className="dashboard-lsItem">
                <label>Destination</label>
                <input
                  placeholder={destination}
                  type="text"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </Col>
          </Row>

          {/* Start and End Date Section */}
          <label>StartDate and EndDate: </label>
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

          {/* Button Section */}
          <Row>
            <Col className="text-center">
              <Button onClick={handleList} className="dashboard-next-button" size="lg">
                Flight Details
              </Button>
            </Col>
            <Col className="text-center">
              <Button onClick={handleHotelList} className="dashboard-next-button" size="lg">
                Hotel Details
              </Button>
            </Col>
            
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DashBoard;
