import React,{useState} from 'react'
import "./heade.css"
import { Button } from 'react-bootstrap'

const Heade = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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
        src="https://via.placeholder.com/40"
        alt="profile"
        className="unique-header-profile-image"
      />
      <div className="unique-header-profile-text">
        <h4 className="unique-header-profile-name">Gopi</h4>
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
  )
}

export default Heade