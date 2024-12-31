import React from 'react'
import { Nav } from 'react-bootstrap'
import "./sidebar.css"
import { NavLink } from 'react-router-dom'
import OfferImg from "../../assets/images/slider/offer.png"

const SideBar = () => {
  return (
    <div className="sidebar d-flex flex-column">
      <div className="logo mb-4">plan<span>go</span></div>
      <Nav className="flex-column">
        <NavLink to="/itinearydashboard" className="nav-item">Dashboard</NavLink>
        <NavLink to="/airporttaxi" className="nav-item">AirPort Taxi</NavLink>
        <NavLink to="/share" className="nav-item">Share & Collaborate</NavLink>
      </Nav>
      <NavLink to="/membership" >
        <img
          src={OfferImg}
          alt="Discount Offer"
          className="discount-image"
        />
      </NavLink>
      <button className="logout-btn btn btn-outline-light mt-3">Logout</button>
    </div>
  )
}

export default SideBar