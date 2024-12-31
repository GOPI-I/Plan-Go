import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../redux/userSlice'; // Assuming clearUser action exists
import './heade.css';

const ItineraryHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { name } = useSelector((state) => state.user);  // Only get 'name' from Redux

  // Access user data from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    dispatch(clearUser()); // Clear user data from Redux
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="unique-header">
      <div className="unique-header-notification">
        <div className="unique-header-bell">
          <i className="fa fa-bell"></i>
        </div>
        <span className="unique-header-notification-dot"></span>
      </div>
      <div className="unique-header-profile" onClick={toggleDropdown}>
      <img
          src={`https://picsum.photos/40?random=${Math.floor(Math.random() * 1000)}`}
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
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryHeader;
