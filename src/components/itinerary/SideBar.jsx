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
        <Nav.Link href="#" className="nav-item">Dashboard</Nav.Link>
        <Nav.Link href="#" className="nav-item">My Tickets</Nav.Link>
        <Nav.Link href="#" className="nav-item">Favourite</Nav.Link>
        <Nav.Link href="#" className="nav-item">Share & Collaborate</Nav.Link>
        <Nav.Link href="#" className="nav-item">Transaction</Nav.Link>
        <Nav.Link href="#" className="nav-item">Settings</Nav.Link>
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