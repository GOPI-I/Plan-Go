import React, { useEffect, useState } from 'react';
import {
  Container,
  Navbar,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import "./header.css"

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  // Sticky Header 
  const isSticky = (e) => {
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 120 ? header.classList.add('is-sticky') :
      header.classList.remove('is-sticky');
  };

  return (
    <header className="header-section">
      <Container>
        <Navbar expand="lg" className="p-0">
          {/* Logo Section */}
          <Navbar.Brand>
            <NavLink to="/"><div className="logo mb-4">plan<span>go</span></div></NavLink>
          </Navbar.Brand>

          {/* Offcanvas Menu */}
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
            show={open}
          >
            {/* Mobile Logo Section */}
            <Offcanvas.Header>
              <h1 className="logo">Plan Go</h1>
              <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
                <i className="bi bi-x-lg"></i>
              </span>
            </Offcanvas.Header>

            {/* Navigation Links */}
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/">
                  ABOUT US
                </NavLink>
                <NavLink className="nav-link" to="/">
                  ITINERARY BUILDERS
                </NavLink>
                <NavLink className="nav-link" to="/">
                  BUDGET TRACKER
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          {/* Right Section with Buttons */}
          <div className="ms-md-4 ms-2">
            <NavLink to="/login" className="primaryBtn d-none d-sm-inline-block">
              Login
            </NavLink>
            <NavLink to="/register" className="primaryBtn d-none d-sm-inline-block">
              Register
            </NavLink>
            <li className="d-inline-block d-lg-none ms-3 toggle_btn">
              <i className={open ? "bi bi-x-lg" : "bi bi-list"} onClick={toggleMenu}></i>
            </li>
          </div>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
