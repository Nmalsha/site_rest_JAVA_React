import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ message }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "170px" }}>
      <h1>Access Denied</h1>
      <p>{message}</p>
      <Link to="/diches">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
