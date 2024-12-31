import React, { useState } from "react";
import "./why.css";
import FlightDesign from "./FlightDesign";
import HotelDesign from "./HotelDesign";
import Expense from "./Expense";
import Document from "./Document";

const data = ["Flight", "Hotel", "ExpenseTracker", "Document"];

const WhyUs = () => {
  const [work, setWork] = useState("Flight");

  return (
    <div className="works-section">
      <div className="works-heading"></div>
      <div className="works-container">
        <div className="works-left">
          <ul className="works-list">
            {data.map((item) => (
              <li
                key={item}
                className="works-list-item"
                data-text={item}
                onClick={() => setWork(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="works-right">
          {work === "Flight" && <FlightDesign />}
          {work === "Hotel" && <HotelDesign />}
          {work === "ExpenseTracker" && <Expense />}
          {work === "Document" && <Document />}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
