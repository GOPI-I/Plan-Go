import React from "react";
import { useSelector } from "react-redux";
const BudgetTracker = () => {
  const flights = useSelector((state) => state.flight?.flights);
  return (
    <div>
    <h2>Flight Details</h2>
    {flights.length === 0 ? (
      <p>No flights available.</p>
    ) : (
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            <p>Airline: {flight.airline}</p>
            <p>Price: ₹{flight.cost}</p>
            
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}

export default BudgetTracker