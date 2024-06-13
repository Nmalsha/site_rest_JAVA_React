import React from "react";
import logo from "../image/logo.jpeg";

const About = () => (
  <section id="about" className="py-5">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 mb-4">
          <h2>About Us</h2>
          <p>
            We are a family-owned restaurant offering the best culinary
            experience in the city. Our chefs use the freshest ingredients to
            create delightful dishes.
          </p>
        </div>
        <div className="col-lg-6">
          <img src={logo} className="img-fluid" alt="Restaurant" />
        </div>
      </div>
    </div>
  </section>
);

export default About;
