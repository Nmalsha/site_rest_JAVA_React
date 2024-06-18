import React, { useState } from "react";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Header from "./component/Header";
import Diches from "./component/Diches";
import About from "./component/About";
import Footer from "./component/Footer";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [userNickname, setUserNickname] = useState("");

  const handleAddToCart = (selectedDish) => {
    setCart([...cart, selectedDish]);
  };
  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handleLogin = (nickname) => {
    setUserNickname(nickname);
  };

  return (
    <div className="App">
      <Login onLogin={handleLogin} />
      <Navbar
        cart={cart}
        onDeleteItem={handleRemoveFromCart}
        userNickname={userNickname}
      />
      <Header />
      <Diches handleAddToCart={handleAddToCart} />
      <About />
      <Footer />
    </div>
  );
}

export default App;
