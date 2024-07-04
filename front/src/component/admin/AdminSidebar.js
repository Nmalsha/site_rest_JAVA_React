import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUtensils,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  return (
    <div
      className="admin-sidebar"
      style={{
        width: "250px",
        position: "fixed",
        top: "150px",
        left: "0",
        background: "#637591",
        height: "100vh",
        padding: "20px",
        marginTop: "-25px",
      }}
    >
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="menu-details"
            className="nav-link"
            style={{ color: "black" }}
          >
            <FontAwesomeIcon icon={faUtensils} /> Menu Details
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="user-details"
            className="nav-link"
            style={{ color: "black", marginTop: "15px" }}
          >
            <FontAwesomeIcon icon={faUsers} /> User Details
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="order-details"
            className="nav-link"
            style={{ color: "black", marginTop: "15px" }}
          >
            <FontAwesomeIcon icon={faClipboardList} /> Orders Details
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
