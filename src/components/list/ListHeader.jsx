import React ,{useState}from 'react'
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
    faLocationDot
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { NavLink } from 'react-router-dom';
  import "./listheader.css"
  import { useSelector } from 'react-redux';

const ListHeader = () => {
      const [dropdownVisible, setDropdownVisible] = useState(false);
       const { name } = useSelector((state) => state.user);  
    
      const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
      };
  return (
    <div className="header">
        <div className="headerList">
        <div className="headerListItem active">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <NavLink to="/hotelList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          </NavLink>
          <NavLink to="/placevisit">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Place Visit</span>
          </div>
          </NavLink>
          <div className="unique-header-profile" onClick={toggleDropdown}>
      <img
        src="https://via.placeholder.com/40"
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
            <li>Logout</li>
          </ul>
        </div>
      )}
    </div>
        </div>
        
        
      </div>
  )
}

export default ListHeader