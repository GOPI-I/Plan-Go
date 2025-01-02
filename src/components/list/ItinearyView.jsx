import React, { useEffect, useState } from "react";
import axios from "axios";
import "./itinearyview.css";
import SideBar from "../itinerary/SideBar";
import ListHeader from "./ListHeader";
import { useNavigate } from "react-router-dom";

const ItineraryView = () => {
  const [flightItinerary, setFlightItinerary] = useState([]);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [visitHistory, setVisitHistory] = useState([]);
  const [copassengerDetails, setCopassengerDetails] = useState([]);
  const [draggedFlight, setDraggedFlight] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedVisitDetails = localStorage.getItem("visitHistory");
    if (storedVisitDetails) {
      setVisitHistory(JSON.parse(storedVisitDetails));
    }

    const storedHotelDetails = localStorage.getItem("selectedHotel");
    if (storedHotelDetails) {
      setHotelDetails(JSON.parse(storedHotelDetails));
    }

    const storedCopassengerDetails = localStorage.getItem("copassenger");
    if (storedCopassengerDetails) {
      setCopassengerDetails(JSON.parse(storedCopassengerDetails));
    }

    const storedDraggedFlight = localStorage.getItem("draggedFlight");
    if (storedDraggedFlight) {
      setDraggedFlight(JSON.parse(storedDraggedFlight));
    }
  }, []);

  const handleSubmit = async () => {
    try {
      // Retrieve data from local storage
      const from = localStorage.getItem("from");
      const to = localStorage.getItem("to");
      const dates = JSON.parse(localStorage.getItem("dates"));
      const guests = JSON.parse(localStorage.getItem("guests"));
      const authToken = localStorage.getItem("authToken");

      // Construct the payload
      const payload = {
        startPlace: from,
        endPlace: to,
        startDate: dates?.[0]?.startDate || "",
        endDate: dates?.[0]?.endDate || "",
        placesToVisit: visitHistory.map((visit) => ({
          name: visit.placeName,
          startTime: visit.startDateTime,
          endTime: visit.endDateTime,
        })),
        flightDetails: [
          {
            airline: draggedFlight.airline,
            flightNumber: draggedFlight.flightNumber,
            boardingTime: draggedFlight.departure,
            departureTime: draggedFlight.departure,
            arrivalTime: draggedFlight.arrival,
            fromAirport: draggedFlight.from,
            toAirport: draggedFlight.to,
            seatNumber: "N/A", // Adjust if seatNumber is available
          },
        ],
        hotelDetails: [
          {
            name: hotelDetails?.hotel?.name,
            address: hotelDetails?.hotel?.address,
            checkIn: hotelDetails?.checkInDate,
            checkOut: hotelDetails?.checkOutDate,
            rooms: [
              {
                roomNumber: "N/A", // Adjust if roomNumber is available
                occupants: guests?.adult || 0,
              },
            ],
          },
        ],
        coPassengers: copassengerDetails.map((passenger) => ({
          name: passenger.name,
          relation: passenger.relation,
          contact: passenger.contact,
        })),
      };

      // Make the POST request
      const response = await axios.post(
        "https://plangobackend.onrender.com/api/itinerary/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Itinerary created successfully");
        navigate("/myitineraries");
      }
    } catch (error) {
      console.error("Error creating itinerary:", error);
      alert("Failed to create itinerary. Please try again.");
    }
  };

  return (
    <>
      <ListHeader />
      <div className="itinerary-container">
        <SideBar />
        <div className="content">
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
                    <a
                      href={draggedFlight.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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

            <button className="submitItineraryButton" onClick={handleSubmit}>
              Submit Itinerary
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItineraryView;
