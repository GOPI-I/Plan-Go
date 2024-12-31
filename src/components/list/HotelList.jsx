import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "./hotellist.css";
import ListHeader from "./ListHeader";
import { Navigate, useLocation ,useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";
// Redux action

const HotelList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState("");
  const { from, to } = location.state || {};
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
    minPrice: 0,
    maxPrice: Infinity,
  });
  const [expenses, setExpenses] = useState(0);
  const [expenseCard, setExpenseCard] = useState(null);
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Hotel Sunshine",
      address: "123 Main Street, Sunshine City",
      phone: "123456789",
      price_per_day: 5000,
      total_stay_price: 10000,
      image: "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1",
      distance: "500m from center",
      destination: "Sunshine City",
      rating: 8.9,
    },
    {
      id: 2,
      name: "Ocean View Hotel",
      address: "456 Beach Road, Ocean City",
      phone: "987654321",
      price_per_day: 6000,
      total_stay_price: 12000,
      image: "https://cf.bstatic.com/xdata/images/hotel/square600/240219056.webp?k=3f0836880176ee6f070b547b43a50b6c4ffae84d545c3d990b53d72dcdfd808d&o=&s=1",
      distance: "1.2km from center",
      destination: "Ocean City",
      rating: 8.5,
    },
    {
      id: 3,
      name: "Mountain Retreat",
      address: "789 Hilltop Drive, Mountain City",
      phone: "456789123",
      price_per_day: 4500,
      total_stay_price: 9000,
      image: "https://cf.bstatic.com/xdata/images/hotel/square600/263681381.webp?k=d4a50376c2de658b2bc4b5a4c1bce3cd296bdc84fbdc3d4238c4ac5d28a7d750&o=&s=1",
      distance: "3km from center",
      destination: "Mountain City",
      rating: 9.2,
    },
  ]);
  const [filteredHotels, setFilteredHotels] = useState(hotels);

  const dispatch = useDispatch();

  const handleSearch = () => {
    const minPrice = options.minPrice || 0;
    const maxPrice = options.maxPrice || Infinity;

    const filtered = hotels.filter(
      (hotel) =>
        hotel.destination.toLowerCase().includes(destination.toLowerCase()) &&
        hotel.price_per_day >= minPrice &&
        hotel.price_per_day <= maxPrice
    );
    setFilteredHotels(filtered);
  };

  const onDragStart = (e, hotel) => {
    e.dataTransfer.setData("hotel", JSON.stringify(hotel));
  };

  const onDrop = (e) => {
    const hotel = JSON.parse(e.dataTransfer.getData("hotel"));
    setExpenseCard(hotel);
  };

  const handleOptionChange = (e, optionType) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [optionType]: parseInt(e.target.value, 10) || 0,
    }));
  };

  const handleAddToLocalStorage = () => {
    if (expenseCard) {
      const itineraryData = {
        hotel: expenseCard,
        checkInDate: format(date[0].startDate, "MM/dd/yyyy"),
        checkOutDate: format(date[0].endDate, "MM/dd/yyyy"),
        rooms: options.room,
      };
      localStorage.setItem("selectedHotel", JSON.stringify(itineraryData));
      alert(`${expenseCard.name} has been added to your itinerary!`);
    }
  };
  const navigate = useNavigate(); // Initialize the navigate function

  const handleToPlace = () => {
    navigate("/placevisit"); // Navigate to the "/placevisit" route
  }
  return (
    <>
      <ListHeader />
      <div className="hotelListContainer">
        <div className="listSearch">
          <h1 className="lsTitle">Search</h1>
          <div className="lsItem">
            <label>Destination</label>
            <input
              value={to}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
            />
          </div>
          <div className="lsItem">
            <label>Check-in  && Check-out</label>
            <span
              className="checkInSpan"
              onClick={() => setOpenDate(!openDate)}
            >
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </span>
            {openDate && (
              <DateRange
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
              />
            )}
          </div>
          <div className="lsItem">
            <label>Options</label>
            <div className="lsOptions">
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min price <small>per night</small>
                </span>
                <input
                  type="number"
                  value={options.minPrice || ""}
                  onChange={(e) => handleOptionChange(e, "minPrice")}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max price <small>per night</small>
                </span>
                <input
                  type="number"
                  value={options.maxPrice || ""}
                  onChange={(e) => handleOptionChange(e, "maxPrice")}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Adult</span>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  value={options.adult}
                  onChange={(e) => handleOptionChange(e, "adult")}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Children</span>
                <input
                  type="number"
                  min={0}
                  className="lsOptionInput"
                  value={options.children}
                  onChange={(e) => handleOptionChange(e, "children")}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Room</span>
                <input
                  type="number"
                  min={1}
                  className="lsOptionInput"
                  value={options.room}
                  onChange={(e) => handleOptionChange(e, "room")}
                />
              </div>
            </div>
          </div>
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="hotelList">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="searchItem"
              draggable
              onDragStart={(e) => onDragStart(e, hotel)}
            >
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
                alt={hotel.name}
                className="siImg"
              />
              <div className="siDesc">
                <h1 className="siTitle">{hotel.name}</h1>
                <span className="siDistance">{hotel.distance}</span>
                <span className="siPrice">₹{hotel.price_per_day}</span>
                <span className="isaddres">{hotel.address}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="hotelTracker"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <h3>Hotel Tracker</h3>
          {expenseCard ? (
            <div className="hotelCard">
              <p>Hotel: {expenseCard.name}</p>
              <p>Address:{expenseCard.address}</p>
              <p>Price per day: ₹{expenseCard.price_per_day}</p>
              <p>Total stay price: ₹{expenseCard.total_stay_price}</p>
              
            </div>
          ) : (
            <p>Drag a hotel card here</p>
          )}
          <button className="addButton" onClick={handleAddToLocalStorage}>
            Add to Itinerary
          </button>
        </div>
      </div>
      <Button className="dashboard-next-button" onClick={handleToPlace}>
      Next page
    </Button>
    </>
  );
};

export default HotelList;
