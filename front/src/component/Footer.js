import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer text-center bg-dark text-white py-4">
    <div className="container">
      <p>&copy; DORANCO 2024 My Restaurant. All rights reserved.</p>
      <ul className="list-inline">
        <Link to="/mentions-legales">Mentions Légales</Link>
        {/* <li className="list-inline-item">
          <a href="#" className="text-white">
            Terms of Service
          </a>
        </li> */}
      </ul>
    </div>
  </footer>
);

export default Footer;
