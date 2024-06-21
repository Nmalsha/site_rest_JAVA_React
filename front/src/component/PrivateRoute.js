import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const rolesString = localStorage.getItem("roles");
  // Directly split roles string
  const rolesArray = rolesString ? rolesString.split(",") : [];

  const isAdmin = rolesArray.includes("ROLE_ADMIN");

  return isAdmin ? children : <Navigate to="/error" />;
};

export default PrivateRoute;
