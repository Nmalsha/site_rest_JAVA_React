import React, { useState, useEffect } from "react";
import logo from "../image/logo.jpeg";
import LoginModal from "./Login";
import SignupModel from "./Signup";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ cart, onDeleteItem }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Check local storage for session
    const session = localStorage.getItem("session");
    if (session) {
      setIsAuthenticated(true);
      setUserEmail(session);
    }

    const userData = localStorage.getItem("User-Signup-Data");
    if (userData) {
      setIsSignup(userData);
    }
  }, []);

  // const handleSignup = (signupData) => {

  // };

  const handleLogout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("User-Signup-Data");
    setIsAuthenticated(false);
    setUserEmail("");
    setIsSignup(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      style={{ backgroundColor: "#637591" }}
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            className="card-img-top"
            alt="Dish"
            style={{ width: "100px" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#"
                style={{ fontSize: "24px" }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#diches"
                style={{ fontSize: "24px" }}
              >
                Diches
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#about"
                style={{ fontSize: "24px" }}
              >
                About Us
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#contact"
                style={{ fontSize: "24px" }}
              >
                Contact
              </a>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link" style={{ fontSize: "24px" }}>
                    Hello, {userEmail}
                  </span>
                </li>
                <li className="nav-item">
                  <Button
                    variant="secondary"
                    onClick={handleLogout}
                    style={{ fontSize: "24px" }}
                  >
                    Log out
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <LoginModal
                    onLogin={(email) => {
                      setIsAuthenticated(true);
                      setUserEmail(email);
                    }}
                  />
                </li>
              </>
            )}
            {!isSignup && (
              <li className="nav-item">
                <SignupModel
                  onSignup={() => {
                    setIsSignup(true);
                  }}
                />
              </li>
            )}
            <li className="nav-item">
              <div className="dropdown">
                <button
                  // className={`btn btn-secondary dropdown-toggle ${
                  //   isDropdownOpen ? "show" : ""
                  // }`}
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={dropdownOpen}
                  onClick={toggleDropdown}
                >
                  Cart ({cart.length})
                </button>

                <ul
                  className={`dropdown-menu${
                    dropdownOpen ? " show" : ""
                  } box-hover`}
                  aria-labelledby="dropdownMenuButton"
                >
                  {cart.length > 0 ? (
                    cart.map((item, index) => (
                      <li
                        key={index}
                        className="dropdown-item mt-3 item-hover"
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {item.dishName} - ${item.price.toFixed(2)}
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon-hover"
                          style={{ color: "#637591" }}
                          onClick={() => onDeleteItem(index)}
                        />
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item">Cart is empty</li>
                  )}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
