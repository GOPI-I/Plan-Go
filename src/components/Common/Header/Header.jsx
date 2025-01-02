import React, { useEffect, useState } from "react";
import { Container, Navbar, Offcanvas, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../../redux/userSlice";
import "./header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { name } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [backgroundWhite, setBackgroundWhite] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    setBackgroundWhite(scrollTop >= 120);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className={`header-section ${backgroundWhite ? "is-sticky" : ""}`}>
      <Container>
        <Navbar expand="lg" className="p-0">
          <Navbar.Brand>
            <NavLink to="/">
              <div
                className={`logo mb-4 ${
                  backgroundWhite ? "text-black" : "text-white"
                }`}
              >
                plan<span>go</span>
              </div>
            </NavLink>
          </Navbar.Brand>

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
            show={open}
          >
            <Offcanvas.Header>
              <h1
                className={`logo ${
                  backgroundWhite ? "text-black" : "text-white"
                }`}
              >
                Plan Go
              </h1>
              <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
                <i className="bi bi-x-lg"></i>
              </span>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/about">
                  About Us
                </NavLink>
                <NavLink className="nav-link" to="/contact">
                  Contact Us
                </NavLink>
                {name && (
                  <NavLink className="nav-link" to="/myitineraries">
                    My Itineraries
                  </NavLink>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          <div className="ms-md-4 ms-2">
            {name ? (
              <>
                <span
                  className={`user-name ${
                    backgroundWhite ? "text-black" : "text-white"
                  }`}
                >
                  Welcome, {name}
                </span>
                <button className="primaryBtn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="primaryBtn">
                  Login
                </NavLink>
                <NavLink to="/register" className="primaryBtn">
                  Register
                </NavLink>
              </>
            )}
            <li className="d-inline-block d-lg-none ms-3 toggle_btn">
              <i
                className={open ? "bi bi-x-lg" : "bi bi-list"}
                onClick={toggleMenu}
              ></i>
            </li>
          </div>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
