import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer
    className="footer text-center bg-dark text-white py-4"
    style={{ position: "sticky" }}
  >
    <div className="container">
      <p>&copy; DORANCO 2024 My Restaurant. All rights reserved.</p>
      <ul className="list-inline">
        <Link to="/mentions-legales">Mentions Légales</Link>
      </ul>
    </div>
  </footer>
);

export default Footer;
