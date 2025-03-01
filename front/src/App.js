import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Diches from "./component/Diches";
import DishesWithCarousel from "./component/DishesWithCarousel";
import DishDetail from "./component/DishDetail";
import About from "./component/About";
import { jwtDecode } from "jwt-decode";
import Footer from "./component/Footer";
import AdminDashboard from "./component/admin/AdminDashboard";
import PrivateRoute from "./component/PrivateRoute";
import MentionsLegales from "./component/MentionsLegales";
import Cart from "./component/Cart";
import ErrorPage from "./component/ErrorPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

function App() {
  const [userNickname, setUserNickname] = useState("");
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userName: "",
    isAdmin: false,
  });

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const cartItemsCount = cart.length;
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setAuthState({
        isAuthenticated: true,
        userName: decodedToken.nickname,
        isAdmin: decodedToken.roles.includes("ROLE_ADMIN"),
      });
    }
  }, []);

  // const handleAddToCart = (selectedDish) => {
  //   setCart((prevCart) => [...prevCart, selectedDish]);
  //   // setCart([...cart, selectedDish]);
  // };
  // const handleRemoveFromCart = (index) => {
  //   console.log("checking index", index);
  //   const newCart = cart.filter((_, i) => i !== index);
  //   setCart(newCart);
  //   // localStorage.setItem("cartItems", JSON.stringify(newCart));
  // };
  const handleAddToCart = (selectedDish) => {
    const updatedCart = [...cart, selectedDish];
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };
  const handleLogin = (nickname) => {
    setUserNickname(nickname);
  };
  const handleLogout = () => {
    localStorage.clear();
    setAuthState({
      isAuthenticated: false,
      userName: "",
      isAdmin: false,
    });
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          cart={cart}
          onDeleteItem={handleRemoveFromCart}
          isAuthenticated={authState.isAuthenticated}
          userName={authState.userName}
          isAdmin={authState.isAdmin}
          onLogout={handleLogout}
          userNickname={userNickname}
          cartItemsCount={cartItemsCount}
        />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* <Route path="/signup" element={<Signup onLogin={handleLogin} />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={<DishesWithCarousel handleAddToCart={handleAddToCart} />}
          />
          <Route
            path="/diches"
            element={<DishesWithCarousel handleAddToCart={handleAddToCart} />}
          />
          <Route path="/dish/:dishId" element={<DishDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onDeleteItem={handleRemoveFromCart}
                setCart={setCart}
                cartItemsCount={cartItemsCount}
              />
            }
          />
          <Route
            path="/error"
            element={
              <ErrorPage message="You are not allowed to access this page." />
            }
          />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        {/* </div> */}
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
