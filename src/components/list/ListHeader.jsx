import React, { useState } from 'react';
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
import { NavLink, useNavigate } from 'react-router-dom';
import "./listheader.css";
import { useSelector } from 'react-redux';

const ListHeader = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const { name } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleBackClick = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="list-header">
          <button className="list-header-back-button" onClick={handleBackClick}>Back</button>
            <div className="list-header-list">
            
                <NavLink to="">
                    <div className="list-header-item active">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                </NavLink>
                <NavLink to="/hotelList">
                    <div className="list-header-item active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                </NavLink>
                <NavLink to="/placevisit">
                    <div className="list-header-item active">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>Place Visit</span>
                    </div>
                </NavLink>
                <div className="list-header-profile-text">
                    <h4 className="list-header-profile-name">{name || "Guest"}</h4>
                    <p className="list-header-profile-role">Traveler Pro</p>
                </div>
                
            </div>
        </div>
    );
};

export default ListHeader;
