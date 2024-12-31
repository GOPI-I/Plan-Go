import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./placevisit.css";
import ListHeader from "./ListHeader";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PlaceVisit = () => {
  const navigate = useNavigate()
  const [placeName, setPlaceName] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [history, setHistory] = useState([]);


  const handleAdd = () => {
    if (placeName && startDateTime && endDateTime) {
      const newEntry = {
        id: Date.now(),
        placeName,
        startDateTime: startDateTime.toLocaleString(),
        endDateTime: endDateTime.toLocaleString(),
      };
      setHistory([...history, newEntry]);
      setPlaceName("");
      setStartDateTime(null);
      setEndDateTime(null);
    } else {
      alert("Please fill in all fields before adding.");
    }
  };

  const handleDelete = (id) => {
    const updatedHistory = history.filter((entry) => entry.id !== id);
    setHistory(updatedHistory);
  };

  const handleToStoreLocalStorage = () => {
    if (history.length > 0) {
      localStorage.setItem("visitHistory", JSON.stringify(history));
      alert("Visit history has been saved to local storage!");
    } else {
      alert("No visit history to save.");
    }
    navigate("/copassenger");
  };

  return (
    <>
    <ListHeader/>
      <div className="place-visit-container">
  <h2>Visit Planner</h2>
  <div className="place-visit-form-group">
    <label>
      Name of the Place:
      <input
        type="text"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        placeholder="Enter place name"
      />
    </label>
  </div>
  <div className="place-visit-form-group">
    <label>
      Start Date and Time:
      <DatePicker
        selected={startDateTime}
        onChange={(date) => setStartDateTime(date)}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Select start date and time"
      />
    </label>
  </div>
  <div className="place-visit-form-group">
    <label>
      End Date and Time:
      <DatePicker
        selected={endDateTime}
        onChange={(date) => setEndDateTime(date)}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Select end date and time"
      />
    </label>
  </div>
  <button className="place-visit-add-button" onClick={handleAdd}>
    Add
  </button>
  <h3>Visit History</h3>
  <ul className="place-visit-history-list">
    {history.map((entry) => (
      <li key={entry.id} className="place-visit-history-item">
        <div>
          <p>
            <strong>Place:</strong> {entry.placeName}
          </p>
          <p>
            <strong>Start:</strong> {entry.startDateTime}
          </p>
          <p>
            <strong>End:</strong> {entry.endDateTime}
          </p>
        </div>
        <button
          className="place-visit-delete-button"
          onClick={() => handleDelete(entry.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
  <Button
    className="place-visit-dashboard-next-button"
    onClick={handleToStoreLocalStorage}
  >
    Next page
  </Button>
</div>
</>
  );
};

export default PlaceVisit;
