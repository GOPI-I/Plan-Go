import React, { useEffect, useState } from "react";
import "./itinearyview.css"
const ItineraryView = () => {
  const [flightItinerary, setFlightItinerary] = useState([]);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [visitHistory, setVisitHistory] = useState([]);
  const [copassengerDetails, setCopassengerDetails] = useState([]);
  const [draggedFlight, setDraggedFlight] = useState(null);

  useEffect(() => {
    // Load flight itinerary


    // Load hotel details
    const storedHotelDetails = localStorage.getItem("selectedHotel");
    if (storedHotelDetails) {
      setHotelDetails(JSON.parse(storedHotelDetails));
    }

    // Load visit history
   
    const storedCopassengerDetails = localStorage.getItem("passengerData");
    if (storedCopassengerDetails) {
      setCopassengerDetails(JSON.parse(storedCopassengerDetails));
    }

    // Load dragged flight details
    const storedDraggedFlight = localStorage.getItem("draggedFlight");
    if (storedDraggedFlight) {
      setDraggedFlight(JSON.parse(storedDraggedFlight));
    }
  }, []);

  return (
    <div className="itineraryViewContainerUnique">
      <h1 className="itineraryTitleUnique">Your Complete Itinerary</h1>
     {/* Dragged Flight */}
<div className="itinerarySectionUnique">
  <h2 className="subTitleUnique">Dragged Flight:</h2>
  {draggedFlight ? (
    <div className="draggedFlightItemUnique">
      <p>{`Flight Number: ${draggedFlight.flightNumber}`}</p>
      <p>{`Airline: ${draggedFlight.airline}`}</p>
      <p>{`From: ${draggedFlight.from}`}</p>
      <p>{`To: ${draggedFlight.to}`}</p>
      <p>{`Departure: ${draggedFlight.departure}`}</p>
      <p>{`Arrival: ${draggedFlight.arrival}`}</p>
      <p>{`Duration: ${draggedFlight.duration}`}</p>
      <p>{`Stops: ${draggedFlight.stops}`}</p>
      <p>{`Cost: ₹${draggedFlight.cost}`}</p>
      <p>
        Website:{" "}
        <a href={draggedFlight.website} target="_blank" rel="noopener noreferrer">
          {draggedFlight.website}
        </a>
      </p>
    </div>
  ) : (
    <p>No dragged flight details available.</p>
  )}
</div>


      {/* Hotel Details */}
      <div className="itinerarySectionUnique">
        <h2 className="subTitleUnique">Hotel:</h2>
        {hotelDetails ? (
          <div className="hotelDetailsUnique">
            <p>{`Hotel: ${hotelDetails.hotel.name}`}</p>
            <p>{`Check-In: ${hotelDetails.checkInDate}`}</p>
            <p>{`Check-Out: ${hotelDetails.checkOutDate}`}</p>
            <p>{`Rooms: ${hotelDetails.rooms}`}</p>
          </div>
        ) : (
          <p>No hotel details available.</p>
        )}
      </div>

      {/* Visit History */}
      <div className="itinerarySectionUnique">
        <h2 className="subTitleUnique">Places Visited:</h2>
        {visitHistory.length > 0 ? (
    visitHistory.map((visit, index) => (
      <div key={index} className="visitItemUnique">
        <p>{`Place: ${visit.placeName}`}</p>
        <p>{`Start Time: ${visit.startDateTime}`}</p>
        <p>{`End Time: ${visit.endDateTime}`}</p>
      </div>
    ))
  ) : (
    <p>No visit history recorded.</p>
  )}
      </div>

      {/* Co-passenger Details */}
      <div className="itinerarySectionUnique">
        <h2 className="subTitleUnique">Co-Passengers:</h2>
        {copassengerDetails.length > 0 ? (
          copassengerDetails.map((passenger, index) => (
            <div key={index} className="copassengerItemUnique">
              <span>{`${passenger.name} (${passenger.relation}), Contact: ${passenger.contact}, Age: ${passenger.age}`}</span>
            </div>
          ))
        ) : (
          <p>No co-passenger details available.</p>
        )}
      </div>
    </div>
  );
};

export default ItineraryView;
