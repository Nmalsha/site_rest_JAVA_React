import React, { useState } from "react";
import Navbar from "./component/Navbar";
import Header from "./component/Header";
import Diches from "./component/Diches";
import About from "./component/About";
import Footer from "./component/Footer";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (selectedDish) => {
    setCart([...cart, selectedDish]);
  };
  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  return (
    <div className="App">
      <Navbar cart={cart} onDeleteItem={handleRemoveFromCart} />
      <Header />
      <Diches handleAddToCart={handleAddToCart} />
      <About />
      <Footer />
    </div>
  );
}

export default App;
