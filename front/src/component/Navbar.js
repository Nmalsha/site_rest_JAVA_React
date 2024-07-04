import React, { useState, useEffect } from "react";
import logo from "../image/logo.jpeg";
import LoginModal from "./Login";
import SignupModel from "./Signup";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogin, onLogout, cart }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();

  // const [cart, setCart] = useState(() => {
  //   const savedCart = localStorage.getItem("cartItems");
  //   return savedCart ? JSON.parse(savedCart) : [];
  // });

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItemsCount(JSON.parse(savedCart).length);
    }
  }, [cart]);

  // useEffect(() => {
  //   // Check local storage for session
  //   const session = localStorage.getItem("jwtToken");
  //   if (session) {
  //     setIsAuthenticated(true);
  //     setIsSignup(true);
  //   }
  // }, []);
  const userName = localStorage.getItem("nickname");

  useEffect(() => {
    // Check local storage for session
    const cartItem = localStorage.getItem("cartItems");
    if (cartItem) {
      setCartItem(cartItem);
    }
  }, []);
  //check if the logged user is admin
  useEffect(() => {
    // Check if user is admin
    const loggedUserRoles = localStorage.getItem("roles");
    const rolesArray = loggedUserRoles ? loggedUserRoles.split(",") : [];
    setIsAdmin(rolesArray.includes("ROLE_ADMIN"));
    // setUserName(localStorage.getItem("nickname") || "");
  }, [isAuthenticated]);
  // useEffect(() => {
  //   const loggedUserRoles = localStorage.getItem("roles");
  //   const rolesArray = loggedUserRoles ? loggedUserRoles.split(",") : [];

  //   const isAdmin = rolesArray.includes("ROLE_ADMIN");
  //   if (isAdmin) {
  //     // setIsAuthenticated(true);
  //     isAuthenticated(false);
  //     setIsAdmin(true);
  //   }
  // }, []);
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles");
    localStorage.removeItem("cartItems");
    // setIsAuthenticated(false);
    onLogout();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      style={{ backgroundColor: "#82620a", height: "15vh" }}
    >
      <div className="container">
        <a className="navbar-brand" href="/home">
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
            <li className="nav-item active">
              <a
                href="/diches"
                className="nav-link "
                style={{ fontSize: "24px" }}
              >
                Home
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link "
                href="/about"
                style={{ fontSize: "24px" }}
              >
                About Us
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link nav_link"
                href="#contact"
                style={{ fontSize: "24px" }}
              >
                Contact
              </a>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/admin"
                  style={{ fontSize: "24px" }}
                >
                  Administration
                </a>
              </li>
            )}

            {/* {!isAuthenticated && (
              <li className="nav-item">
                <SignupModel />
              </li>
            )} */}
            {!isAuthenticated && (
              <li className="nav-item">
                <a
                  className="nav-link "
                  href="/signup"
                  style={{ fontSize: "24px" }}
                >
                  Signup
                </a>
              </li>
            )}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{
                      fontSize: "24px",
                      color: "#fc9403",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {isAdmin ? `Hello Admin ${userName}` : `Hello ${userName}`}
                  </span>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link "
                    href="/"
                    onClick={handleLogout}
                    style={{ fontSize: "24px" }}
                  >
                    Log out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link "
                    href="/login"
                    style={{ fontSize: "24px" }}
                    onLogin={(token) => {
                      isAuthenticated(true);
                    }}
                  >
                    Login
                  </a>
                  {/* <LoginModal
                    onLogin={(token) => {
                      setIsAuthenticated(true);
                    }}
                  /> */}
                </li>
              </>
            )}
            <li className="nav-item">
              <Button
                variant="secondary"
                onClick={() => navigate("/cart")}
                style={{
                  fontSize: "20px",
                  background: "#5c460b",
                  borderRadius: "20px",
                }}
              >
                Cart ({cartItemsCount})
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
