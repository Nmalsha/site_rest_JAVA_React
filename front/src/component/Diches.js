import React, { useState } from "react";

import dish1 from "../image/image1.jpg";
import dish2 from "../image/image2.jpg";
import dish3 from "../image/image3.jpg";
import dish4 from "../image/image4.jpg";

const Diches = ({ handleAddToCart }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (dishIndex) => {
    const selectedDish = {
      id: dishIndex,
      dishName: `Dish Name ${dishIndex + 1}`,
      price: (dishIndex + 1) * 10.99,
    };
    // setCart((prevCart) => [...prevCart, selectedDish]);
    setCart([...cart, selectedDish]);
    handleAddToCart(selectedDish);
    console.log("check addcart click", selectedDish);
  };

  const dishes = [dish1, dish2, dish3, dish4];

  return (
    <section id="menu" className="menu-section bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5">Our Menu</h2>
          <p className="lead">Delicious dishes to satisfy your cravings</p>
        </div>
        <div className="row">
          {dishes.map((dish, index) => (
            //   console.log(index),
            <div className="col-md-4 mb-4" key={index}>
              <div className="card">
                <img
                  src={dish}
                  className="card-img-top"
                  alt={`Dish ${index + 1}`}
                />
                <div className="card-body">
                  <h5 className="card-title">Dish Name {index + 1}</h5>
                  <p className="card-text">
                    Description of the dish. Ingredients and flavors.
                  </p>
                  <p className="card-text">
                    <strong>${10.99}</strong>
                  </p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => addToCart(index)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Diches;
