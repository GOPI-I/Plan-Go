import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import OfferImg from "../../assets/images/slider/offer.png";
import { useSelector } from "react-redux"; // To fetch user data
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { name } = useSelector((state) => state.user); // Access the user's name from Redux
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <div
        className={`hamburger-menu ${isSidebarOpen ? "d-none" : ""}`}
        onClick={toggleSidebar}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div
        className={`sidebar d-flex flex-column ${isSidebarOpen ? "open" : ""}`}
      >
        <div className="logo mb-4">
          <span>plan</span>go
        </div>

        <div
          className={`close-menu ${isSidebarOpen ? "" : "d-none"}`}
          onClick={toggleSidebar}
        >
          <div></div>
          <div></div>
        </div>

        <Nav className="flex-column">
          <NavLink to="/" className="nav-item">
            Dashboard
          </NavLink>
          <NavLink to="/airporttaxi" className="nav-item">
            AirPort Taxi
          </NavLink>
          <NavLink to="/myitineraries" className="nav-item">
            My Itineraries
          </NavLink>
        </Nav>

        <NavLink to="/membership">
          <img src={OfferImg} alt="Discount Offer" className="discount" />
        </NavLink>
        {/* Profile Section in Sidebar */}
        <div className="unique-header-profile" onClick={toggleDropdown}>
          <img
            src={`https://picsum.photos/40?random=${Math.floor(Math.random())}`}
            alt="profile"
            className="unique-header-profile-image"
          />
          <div className="unique-header-profile-text">
            <h4 className="unique-header-profile-name">{name || "Guest"}</h4>
            <p className="unique-header-profile-role">Traveler Pro</p>
          </div>
          <i className="fa fa-caret-down unique-header-profile-caret"></i>
          {dropdownVisible && (
            <div className="unique-header-dropdown">
              <ul>
                <li>Profile</li>
                {/* <li onClick={handleLogout}>Logout</li> */}
              </ul>
            </div>
          )}
        </div>

        <button
          className="logout-btn btn btn-outline-light"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
