import React, { useState } from "react";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Header from "./component/Header";
import Diches from "./component/Diches";
import About from "./component/About";
import Footer from "./component/Footer";
import AdminDashboard from "./component/admin/AdminDashboard";
import PrivateRoute from "./component/PrivateRoute";
import MentionsLegales from "./component/MentionsLegales";
import ErrorPage from "./component/ErrorPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
    <Router>
      <div className="App">
        <Navbar
          cart={cart}
          onDeleteItem={handleRemoveFromCart}
          // userNickname={userNickname}
        />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={<Diches handleAddToCart={handleAddToCart} />}
          />
          <Route
            path="/diches"
            element={<Diches handleAddToCart={handleAddToCart} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/error"
            element={
              <ErrorPage message="You are not allowed to access this page." />
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
  // <div className="App">
  //   <Login onLogin={handleLogin} />
  //   <Navbar
  //     cart={cart}
  //     onDeleteItem={handleRemoveFromCart}
  //     userNickname={userNickname}
  //   />
  //   <Header />
  //   <Diches handleAddToCart={handleAddToCart} />
  //   <About />
  //   <Footer />
  // </div>
  // );
}

export default App;
