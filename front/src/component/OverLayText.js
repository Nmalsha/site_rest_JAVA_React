import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const OverlayText = () => {
  return (
    <div className="overlay-content">
      <h1>Our Restaurant</h1>
      <p>1234 Street Name, City, Country</p>
      <Link to="/signup">
        <button
          style={{
            fontSize: "20px",
            background: "#5c460b",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </Link>
    </div>
  );
};

export default OverlayText;
