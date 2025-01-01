import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import SideBar from "./SideBar";
import { format, differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./itineraryCreation.css";

const locations = [
  { label: "Mumbai, Maharashtra", value: "Mumbai" },
  { label: "Delhi, Delhi", value: "Delhi" },
  { label: "Bengaluru, Karnataka", value: "Bengaluru" },
  { label: "Chennai, Tamil Nadu", value: "Chennai" },
  { label: "Kolkata, West Bengal", value: "Kolkata" },
  { label: "Hyderabad, Telangana", value: "Hyderabad" },
  { label: "Ahmedabad, Gujarat", value: "Ahmedabad" },
  { label: "Pune, Maharashtra", value: "Pune" },
  { label: "Jaipur, Rajasthan", value: "Jaipur" },
  { label: "Lucknow, Uttar Pradesh", value: "Lucknow" },
  { label: "Surat, Gujarat", value: "Surat" },
  { label: "Bhopal, Madhya Pradesh", value: "Bhopal" },
  { label: "Indore, Madhya Pradesh", value: "Indore" },
  { label: "Chandigarh, Punjab & Haryana", value: "Chandigarh" },
  { label: "Thiruvananthapuram, Kerala", value: "Thiruvananthapuram" },
  { label: "Kochi, Kerala", value: "Kochi" },
  { label: "Agra, Uttar Pradesh", value: "Agra" },
  { label: "Varanasi, Uttar Pradesh", value: "Varanasi" },
  { label: "Amritsar, Punjab", value: "Amritsar" },
  { label: "Shillong, Meghalaya", value: "Shillong" },
];

const Itinerary = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [days, setDays] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [fromLocation, setFromLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedDates = JSON.parse(localStorage.getItem("dates"));
    const storedGuests = JSON.parse(localStorage.getItem("guests"));
    const storedToLocation = localStorage.getItem("to");

    if (storedDates) {
      setDateRange(storedDates);
      const dayDifference =
        differenceInDays(
          new Date(storedDates[0].endDate),
          new Date(storedDates[0].startDate)
        ) + 1;
      setDays(dayDifference);
    }

    if (storedGuests) {
      setAdults(storedGuests.adult);
      setChildren(storedGuests.children);
    }

    if (storedToLocation) {
      const selectedLocation = locations.find(
        (location) => location.label === storedToLocation
      );
      setDestinationLocation(selectedLocation);
    }
  }, []);

  const handleDateChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([ranges.selection]);
    const dayDifference = differenceInDays(endDate, startDate) + 1;
    setDays(dayDifference);
    setShowDatePicker(false);
  };

  const handleAdultChange = (e) => {
    setAdults(e.target.value);
  };

  const handleChildrenChange = (e) => {
    setChildren(e.target.value);
  };

  const totalPassengers = parseInt(adults) + parseInt(children);

  const formattedRange = `${format(
    dateRange[0].startDate,
    "MMM dd, yyyy"
  )} - ${format(dateRange[0].endDate, "MMM dd, yyyy")}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("dates", JSON.stringify(dateRange));
    localStorage.setItem("guests", JSON.stringify({ adult: adults, children }));
    localStorage.setItem("to", destinationLocation?.label);
    localStorage.setItem("from", fromLocation?.label);
    navigate("/time");
  };

  return (
    <div className="itinerary-container">
      <SideBar />
      <div className="content">
        <h1 className="itinerary-title">Create Your Itinerary</h1>
        <form className="itinerary-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="from">From</label>
              <Select
                id="from"
                options={locations}
                value={fromLocation}
                onChange={setFromLocation}
                placeholder="Enter starting location"
              />
            </div>
            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <Select
                id="destination"
                options={locations}
                value={destinationLocation}
                onChange={setDestinationLocation}
                placeholder="Enter destination"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="date-range">Date Range</label>
              <div className="date-picker-container">
                <input
                  type="text"
                  id="date-range"
                  className="custom-input"
                  value={formattedRange}
                  readOnly
                  onClick={() => setShowDatePicker(!showDatePicker)}
                />
                {showDatePicker && (
                  <div className="date-picker-overlay">
                    <DateRange
                      ranges={dateRange}
                      onChange={handleDateChange}
                      className="date-picker"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="days">Number of Days</label>
              <input
                type="number"
                id="days"
                className="custom-input"
                value={days}
                readOnly
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="adults">Adults</label>
              <input
                type="number"
                id="adults"
                className="custom-input"
                value={adults}
                onChange={handleAdultChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="children">Children</label>
              <input
                type="number"
                id="children"
                className="custom-input"
                value={children}
                onChange={handleChildrenChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="total-passengers">Total Passengers</label>
              <input
                type="number"
                id="total-passengers"
                className="custom-input"
                value={totalPassengers}
                readOnly
              />
            </div>
          </div>

          <div className="form-row">
            <button type="submit" className="create-button">
              Create Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Itinerary;
