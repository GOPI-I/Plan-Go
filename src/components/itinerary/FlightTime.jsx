import React, { useState, useEffect } from "react";
import { NavLink, useLocation ,useNavigate} from "react-router-dom";
import { format } from "date-fns";
import "./flighttime.css";
import ListHeader from "../list/ListHeader";
import { Button } from "react-bootstrap";

const FlightTime = () => {
  const location = useLocation();
  const { destination, selectedFrom, startDate, endDate } = location.state || {};
  const navigate = useNavigate();
  const [from, setFrom] = useState(selectedFrom || "");
  const [to, setTo] = useState(destination || "");
  const [start, setStart] = useState(startDate || "");
  const [end, setEnd] = useState(endDate || "");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [stopsFilter, setStopsFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [airlinesFilter, setAirlinesFilter] = useState([]);
  const [draggedFlight, setDraggedFlight] = useState(null); // New state to store the dragged flight

  const handleNextPage = () => {
    navigate("/hotelList", {
      state: {
        from, // Pass 'from' data
        to,   // Pass 'to' data
      }
    });
  };

  const flightData = [
    {
      id: 1,
      flightNumber: "6E-201",
      airline: "IndiGo",
      departure: "06:30",
      arrival: "08:15",
      duration: "1h 45m",
      cost: 4586,
      from: "Mumbai, Maharashtra",
      to: "Delhi, Delhi",
      stops: "Non-Stop",
      website: "https://www.goindigo.in",
    },
    {
      id: 2,
      flightNumber: "SG-302",
      airline: "SpiceJet",
      departure: "09:30",
      arrival: "11:10",
      duration: "1h 40m",
      cost: 5120,
      from: "Bengaluru, Karnataka",
      to: "Chennai, Tamil Nadu",
      stops: "1 Stop",
      website: "https://www.spicejet.com",
    },
    {
      id: 3,
      flightNumber: "AI-501",
      airline: "Air India",
      departure: "12:15",
      arrival: "14:00",
      duration: "1h 45m",
      cost: 6200,
      from: "Hyderabad, Telangana",
      to: "Kolkata, West Bengal",
      stops: "Non-Stop",
      website: "https://www.airindia.in",
    },
    {
      id: 4,
      flightNumber: "G8-702",
      airline: "Go First",
      departure: "15:30",
      arrival: "17:15",
      duration: "1h 45m",
      cost: 4900,
      from: "Ahmedabad, Gujarat",
      to: "Pune, Maharashtra",
      stops: "1 Stop",
      website: "https://www.flygofirst.com",
    },
    {
      id: 5,
      flightNumber: "UK-501",
      airline: "Vistara",
      departure: "18:00",
      arrival: "20:00",
      duration: "2h",
      cost: 5800,
      from: "Jaipur, Rajasthan",
      to: "Lucknow, Uttar Pradesh",
      stops: "Non-Stop",
      website: "https://www.airvistara.com",
    },
    {
      id: 6,
      flightNumber: "6E-303",
      airline: "IndiGo",
      departure: "05:30",
      arrival: "07:15",
      duration: "1h 45m",
      cost: 5300,
      from: "Surat, Gujarat",
      to: "Bhopal, Madhya Pradesh",
      stops: "Non-Stop",
      website: "https://www.goindigo.in",
    },
    {
      id: 7,
      flightNumber: "SG-406",
      airline: "SpiceJet",
      departure: "08:30",
      arrival: "10:15",
      duration: "1h 45m",
      cost: 5400,
      from: "Indore, Madhya Pradesh",
      to: "Chandigarh, Punjab & Haryana",
      stops: "1 Stop",
      website: "https://www.spicejet.com",
    },
    {
      id: 8,
      flightNumber: "AI-602",
      airline: "Air India",
      departure: "11:15",
      arrival: "13:00",
      duration: "1h 45m",
      cost: 6200,
      from: "Thiruvananthapuram, Kerala",
      to: "Kochi, Kerala",
      stops: "Non-Stop",
      website: "https://www.airindia.in",
    },
    {
      id: 9,
      flightNumber: "G8-903",
      airline: "Go First",
      departure: "14:30",
      arrival: "16:15",
      duration: "1h 45m",
      cost: 4900,
      from: "Agra, Uttar Pradesh",
      to: "Varanasi, Uttar Pradesh",
      stops: "1 Stop",
      website: "https://www.flygofirst.com",
    },
    {
      id: 10,
      flightNumber: "UK-304",
      airline: "Vistara",
      departure: "17:00",
      arrival: "19:00",
      duration: "2h",
      cost: 5800,
      from: "Amritsar, Punjab",
      to: "Shillong, Meghalaya",
      stops: "Non-Stop",
      website: "https://www.airvistara.com",
    },
    {
      id: 11,
      flightNumber: "6E-401",
      airline: "IndiGo",
      departure: "06:00",
      arrival: "08:15",
      duration: "2h 15m",
      cost: 5900,
      from: "Tokyo, Japan",
      to: "Paris, France",
      stops: "1 Stop",
      website: "https://www.goindigo.in",
    },
    {
      id: 12,
      flightNumber: "SG-507",
      airline: "SpiceJet",
      departure: "07:00",
      arrival: "10:00",
      duration: "3h",
      cost: 7200,
      from: "Sydney, Australia",
      to: "Melbourne, Australia",
      stops: "Non-Stop",
      website: "https://www.spicejet.com",
    },
    {
      id: 13,
      flightNumber: "AI-703",
      airline: "Air India",
      departure: "08:00",
      arrival: "12:00",
      duration: "4h",
      cost: 10200,
      from: "London, UK",
      to: "Rome, Italy",
      stops: "1 Stop",
      website: "https://www.airindia.in",
    },
    {
      id: 14,
      flightNumber: "G8-804",
      airline: "Go First",
      departure: "09:30",
      arrival: "12:30",
      duration: "3h",
      cost: 8900,
      from: "Bangkok, Thailand",
      to: "Dubai, UAE",
      stops: "Non-Stop",
      website: "https://www.flygofirst.com",
    },
    {
      id: 15,
      flightNumber: "UK-905",
      airline: "Vistara",
      departure: "10:00",
      arrival: "14:00",
      duration: "4h",
      cost: 9500,
      from: "Rio de Janeiro, Brazil",
      to: "Cape Town, South Africa",
      stops: "1 Stop",
      website: "https://www.airvistara.com",
    },
    {
      id: 16,
      flightNumber: "6E-505",
      airline: "IndiGo",
      departure: "11:30",
      arrival: "13:30",
      duration: "2h",
      cost: 5800,
      from: "New Delhi, India",
      to: "Singapore",
      stops: "Non-Stop",
      website: "https://www.goindigo.in",
    },
    {
      id: 17,
      flightNumber: "SG-601",
      airline: "SpiceJet",
      departure: "12:30",
      arrival: "14:30",
      duration: "2h",
      cost: 5600,
      from: "Athens, Greece",
      to: "Istanbul, Turkey",
      stops: "Non-Stop",
      website: "https://www.spicejet.com",
    },
    {
      id: 18,
      flightNumber: "AI-805",
      airline: "Air India",
      departure: "13:30",
      arrival: "17:30",
      duration: "4h",
      cost: 8900,
      from: "Cairo, Egypt",
      to: "Santorini, Greece",
      stops: "1 Stop",
      website: "https://www.airindia.in",
    },
    {
      id: 19,
      flightNumber: "G8-906",
      airline: "Go First",
      departure: "14:30",
      arrival: "16:30",
      duration: "2h",
      cost: 7700,
      from: "Maldives, Indian Ocean",
      to: "Bora Bora, French Polynesia",
      stops: "Non-Stop",
      website: "https://www.flygofirst.com",
    },
    {
      id: 20,
      flightNumber: "UK-307",
      airline: "Vistara",
      departure: "15:30",
      arrival: "19:30",
      duration: "4h",
      cost: 11000,
      from: "Machu Picchu, Peru",
      to: "Grand Canyon, USA",
      stops: "1 Stop",
      website: "https://www.airvistara.com",
    },
    {
      id: 21,
      flightNumber: "AI123",
      airline: "Air India",
      departure: "07:45",
      arrival: "10:30",
      duration: "2h 45m",
      cost: 9500,
      from: "Chennai, Tamil Nadu (MAA)",
      to: "Maldives, Indian Ocean (MLE)",
      stops: "Non-Stop",
      website: "https://www.airindia.in",
    },
    {
      id: 22,
      flightNumber: "6E456",
      airline: "IndiGo",
      departure: "09:00",
      arrival: "11:45",
      duration: "2h 45m",
      cost: 8800,
      from: "Chennai, Tamil Nadu (MAA)",
      to: "Maldives, Indian Ocean (MLE)",
      stops: "Non-Stop",
      website: "https://www.goindigo.in",
    },
    {
      id: 23,
      flightNumber: "SG789",
      airline: "SpiceJet",
      departure: "14:15",
      arrival: "17:00",
      duration: "2h 45m",
      cost: 10200,
      from: "Chennai, Tamil Nadu (MAA)",
      to: "Maldives, Indian Ocean (MLE)",
      stops: "Non-Stop",
      website: "https://www.spicejet.com",
    },
    {
      id: 24,
      flightNumber: "UK567",
      airline: "Vistara",
      departure: "18:30",
      arrival: "21:15",
      duration: "2h 45m",
      cost: 12000,
      from: "Chennai, Tamil Nadu (MAA)",
      to: "Maldives, Indian Ocean (MLE)",
      stops: "Non-Stop",
      website: "https://www.airvistara.com",
    },
    {
      id: 25,
      flightNumber: "G8102",
      airline: "Go First",
      departure: "20:45",
      arrival: "23:30",
      duration: "2h 45m",
      cost: 9400,
      from: "Chennai, Tamil Nadu (MAA)",
      to: "Maldives, Indian Ocean (MLE)",
      stops: "Non-Stop",
      website: "https://www.flygofirst.com",
    },
  ];

  useEffect(() => {
    const matches = flightData.filter(
      (flight) =>
        flight.from.toLowerCase().includes(from.toLowerCase()) &&
        flight.to.toLowerCase().includes(to.toLowerCase()) &&
        (!stopsFilter || flight.stops === stopsFilter) &&
        flight.cost >= priceRange[0] &&
        flight.cost <= priceRange[1] &&
        (airlinesFilter.length === 0 || airlinesFilter.includes(flight.airline))
    );
    setFilteredFlights(matches);
  }, [from, to, stopsFilter, priceRange, airlinesFilter]);

  const handleDragStart = (e, flight) => {
    e.dataTransfer.setData("flight", JSON.stringify(flight));
    setDraggedFlight(flight); // Set dragged flight details
    localStorage.setItem("draggedFlight", JSON.stringify(flight)); // Store dragged flight in localStorage
  };

  const handleAddToItinerary = () => {
    const itinerary = JSON.parse(localStorage.getItem("itinerary")) || [];
    const selectedFlights = filteredFlights.filter((flight) =>
      document.querySelector(`#flight-card-${flight.id}`).classList.contains("selected")
    );
    
    // Add selected flights to the itinerary
    selectedFlights.forEach(flight => {
      if (!itinerary.some(item => item.id === flight.id)) {
        itinerary.push(flight);
      }
    });
  
    // Save updated itinerary in localStorage
    localStorage.setItem("itinerary", JSON.stringify(itinerary));
    alert("Flights added to itinerary!");
  };
  

  const toggleSelection = (id) => {
    const card = document.querySelector(`#flight-card-${id}`);
    card.classList.toggle("selected");
  };

  return (
    <>
    <ListHeader/>
    <div className="input-section cena">
        <label>
          From:
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter departure city"
          />
        </label>
        <label>
          To:
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter destination city"
          />
        </label>
        <div className="date-details">
          <p>
            <strong>Start Date:</strong> {startDate ? format(new Date(startDate), "dd/MM/yyyy") : "Not selected"}
          </p>
          <p>
            <strong>End Date:</strong> {endDate ? format(new Date(endDate), "dd/MM/yyyy") : "Not selected"}
          </p>
        </div>
      </div>
    <div className="flight-time-container">
   

      <div className="filter-section">
        <h4>Filters : </h4>
        <label>
          Stops:
          <select value={stopsFilter} onChange={(e) => setStopsFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Non-Stop">Non-Stop</option>
            <option value="1 Stop">1 Stop</option>
          </select>
        </label>
        <label>
          Price Range:
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>
        <label>
          Airlines:
          <div>
            <label>
              <input
                type="checkbox"
                value="IndiGo"
                onChange={(e) => {
                  if (e.target.checked) {
                    setAirlinesFilter([...airlinesFilter, e.target.value]);
                  } else {
                    setAirlinesFilter(airlinesFilter.filter((airline) => airline !== e.target.value));
                  }
                }}
              />
              IndiGo
              
            </label>
            <label>
              <input
                type="checkbox"
                value="Go First"
                onChange={(e) => {
                  if (e.target.checked) {
                    setAirlinesFilter([...airlinesFilter, e.target.value]);
                  } else {
                    setAirlinesFilter(airlinesFilter.filter((airline) => airline !== e.target.value));
                  }
                }}
              />
              Go First
              
            </label>
            <label>
              <input
                type="checkbox"
                value="Vistara"
                onChange={(e) => {
                  if (e.target.checked) {
                    setAirlinesFilter([...airlinesFilter, e.target.value]);
                  } else {
                    setAirlinesFilter(airlinesFilter.filter((airline) => airline !== e.target.value));
                  }
                }}
              />
              Vistara
              
            </label>
            <label>
              <input
                type="checkbox"
                value="SpiceJet"
                onChange={(e) => {
                  if (e.target.checked) {
                    setAirlinesFilter([...airlinesFilter, e.target.value]);
                  } else {
                    setAirlinesFilter(airlinesFilter.filter((airline) => airline !== e.target.value));
                  }
                }}
              />
              SpiceJet
              
            </label>
            <label>
              <input
                type="checkbox"
                value="Air India"
                onChange={(e) => {
                  if (e.target.checked) {
                    setAirlinesFilter([...airlinesFilter, e.target.value]);
                  } else {
                    setAirlinesFilter(airlinesFilter.filter((airline) => airline !== e.target.value));
                  }
                }}
              />
              Air India
              
            </label>
          </div>
        </label>
      </div>

      <div className="drag-section">
        <div className="drag-box">
          {draggedFlight ? (
            <div>
              <h3>{draggedFlight.airline} ({draggedFlight.flightNumber})</h3>
              <p><strong>From:</strong> {draggedFlight.from}</p>
              <p><strong>To:</strong> {draggedFlight.to}</p>
              <p><strong >Departure:</strong> {draggedFlight.departure}</p>
              <p><strong>Arrival:</strong> {draggedFlight.arrival}</p>
              <p><strong>Duration:</strong> {draggedFlight.duration}</p>
              <p><strong>Cost:</strong> ₹{draggedFlight.cost}</p>
              <p><strong>Stops:</strong> {draggedFlight.stops}</p>
              <a href={draggedFlight.website} target="_blank" rel="noopener noreferrer">Book Now</a>
            </div>
          ) : (
            <p>Drag a flight here to see details</p>
          )}
        </div>
        <button onClick={handleAddToItinerary}>Add to Itinerary</button>
      </div>

      <div className="flight-list">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <div
      key={flight.id}
      id={`flight-card-${flight.id}`}
      className="flight-card-bordered"
      draggable
      onDragStart={(e) => handleDragStart(e, flight)}
      onClick={() => toggleSelection(flight.id)}
    >
      <header>
        <div className="logo">
          {/* You can place a logo here */}
        </div>
        <div className="flight">
          <small>{flight.airline}</small>
          <strong>{flight.flightNumber}</strong>
        </div>
      </header>

      {/* Cities */}
      <div className="cities">
        <div className="city">
          <strong>{flight.from}</strong>
          <small>From</small>
        </div>
        <div className="city">
          <strong>{flight.to}</strong>
          <small>To</small>
        </div>
        <div className="airplane">
          {/* You can add an airplane icon or animation here */}
        </div>
      </div>

      {/* Infos */}
      <div className="infos">
        <div className="places">
          <div className="box">
            <small>Departure</small>
            <strong>{flight.departure}</strong>
          </div>
          <div className="box">
            <small>Arrival</small>
            <strong>{flight.arrival}</strong>
          </div>
        </div>
        <div className="times">
          <div className="box">
            <small>Duration</small>
            <strong>{flight.duration}</strong>
          </div>
          <div className="box">
            <small>Cost</small>
            <strong>₹{flight.cost}</strong>
          </div>
        </div>
      </div>

      {/* Strap Section */}
      <div className="strap">
        <div className="box">
          <div>
            <small>Stops</small>
            <strong>{flight.stops}</strong>
          </div>
          <div>
            <small>Book Now</small>
            <a href={flight.website} target="_blank" rel="noopener noreferrer">
              <strong>Book Now</strong>
            </a>
          </div>
        </div>
       
      </div>
    </div>
          ))
        ) : (
          <p>No matching flights found.</p>
        )}
      </div>
    </div>
    <Button onClick={handleNextPage} className="dashboard-next-button" size="lg">
        Next page
      </Button>
    </>
  );
};

export default FlightTime;
