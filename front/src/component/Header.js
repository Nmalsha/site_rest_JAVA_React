import React from "react";

const Header = () => (
  <header
    className="hero-section text-center text-white d-flex justify-content-center align-items-center"
    style={{ marginTop: "150px" }}
  >
    <div className="container">
      <h1 className="display-4" style={{ color: "black" }}>
        Welcome to My Restaurant
      </h1>
      <p className="lead" style={{ color: "black" }}>
        Experience the best food and atmosphere
      </p>
      <a href="#menu" className="btn btn-secondary btn-lg">
        Explore Our Menu
      </a>
    </div>
  </header>
);

export default Header;
