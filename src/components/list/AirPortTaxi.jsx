import React, { useState } from 'react';
import "./airporttaxi.css";
import taxImg from "../../assets/images/about/tax.png"
import ListHeader from './ListHeader';

// Fake data for locations and taxi options
const locations = ["Chennai", "Bangalore", "Mumbai", "Delhi", "Kolkata"];
const airportNames = [
  "Chennai International Airport (Meenambakkam)",
  "Chennai Kamaraj Domestic Terminal",
  "Chennai Anna International Airport"
];
const carTypes = ["Premium", "Luxury", "Economy"];

const taxiOptions = [
  {
    id: 1,
    price: "₹1000",
    carModel: "Toyota Prius",
    serviceLink: "https://www.ola.in",
    platform: "Ola",
    type: "Economy",
  },
  {
    id: 2,
    price: "₹1500",
    carModel: "Mercedes-Benz S-Class",
    serviceLink: "https://www.uber.com",
    platform: "Uber",
    type: "Luxury",
  },
  {
    id: 3,
    price: "₹800",
    carModel: "Honda Accord",
    serviceLink: "https://www.ola.in",
    platform: "Ola",
    type: "Economy",
  },
  {
    id: 4,
    price: "₹1200",
    carModel: "BMW X5",
    serviceLink: "https://www.uber.com",
    platform: "Uber",
    type: "Luxury",
  },
  {
    id: 5,
    price: "₹600",
    carModel: "Suzuki Swift",
    serviceLink: "https://www.ola.in",
    platform: "Ola",
    type: "Economy",
  },
  {
    id: 6,
    price: "₹2000",
    carModel: "Audi A6",
    serviceLink: "https://www.uber.com",
    platform: "Uber",
    type: "Premium",
  },
  {
    id: 7,
    price: "₹2500",
    carModel: "Rolls Royce Phantom",
    serviceLink: "https://www.ola.in",
    platform: "Ola",
    type: "Premium",
  },
  {
    id: 8,
    price: "₹1100",
    carModel: "Hyundai Elantra",
    serviceLink: "https://www.uber.com",
    platform: "Uber",
    type: "Economy",
  },
  {
    id: 9,
    price: "₹1800",
    carModel: "Jaguar XF",
    serviceLink: "https://www.ola.in",
    platform: "Ola",
    type: "Luxury",
  },
  {
    id: 10,
    price: "₹1300",
    carModel: "BMW 3 Series",
    serviceLink: "https://www.uber.com",
    platform: "Uber",
    type: "Premium",
  },
];

const AirPortTaxi = () => {
  const [fromLocation, setFromLocation] = useState(locations[0]);
  const [toLocation, setToLocation] = useState(airportNames[0]);
  const [carType, setCarType] = useState(carTypes[0]);
  const [showCars, setShowCars] = useState(false); // State to show car list

  // Function to handle search button click
  const handleSearchClick = () => {
    setShowCars(true);
  };

  // Filter taxi options based on selected car type
  const filteredTaxiOptions = taxiOptions.filter(taxi => taxi.type === carType);

  return (
    <>
    <ListHeader/>
    
    <div className="airport-taxi-page">
      <h1>Airport Taxi Booking</h1>

      {/* Location Dropdowns */}
      <div className="location-select">
        <label htmlFor="from-location">From:</label>
        <select
          id="from-location"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="location-select">
        <label htmlFor="to-location">To:</label>
        <select
          id="to-location"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
        >
          {airportNames.map((airport) => (
            <option key={airport} value={airport}>
              {airport}
            </option>
          ))}
        </select>
      </div>

      {/* Car Type Dropdown */}
      <div className="car-type-select">
        <label htmlFor="car-type">Car Type:</label>
        <select
          id="car-type"
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
        >
          {carTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <div className="search-button">
        <button onClick={handleSearchClick}>Search</button>
      </div>

      {/* Car List Section */}
      {showCars && (
        <div className="taxi-options">
          {filteredTaxiOptions.length === 0 ? (
            <p>No taxis available for the selected car type.</p>
          ) : (
            filteredTaxiOptions.map((taxi) => (
              <div className="taxi-item" key={taxi.id}>
                <img src={taxImg} alt={taxi.carModel} />
                <h3>{taxi.carModel}</h3>
                <p>{taxi.price}</p>
                <p><strong>Platform:</strong> {taxi.platform}</p>
                <a href={taxi.serviceLink} target="_blank" rel="noopener noreferrer">
                  <button>Visit</button>
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default AirPortTaxi;
