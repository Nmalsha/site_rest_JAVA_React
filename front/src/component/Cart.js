import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = ({ onDeleteItem }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  //  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // const handlePayment = async () => {
  //   // Implement payment processing here
  //   try {
  //     const token = localStorage.getItem("jwtToken");
  //     const response = await axios.post(
  //       "http://localhost:8081/api/payment",
  //       { cart },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       alert("Payment successful!");
  //       navigate("/success"); // Navigate to success page
  //     } else {
  //       alert("Payment failed");
  //     }
  //   } catch (error) {
  //     console.error("Error processing payment:", error);
  //     alert("An error occurred while processing payment");
  //   }
  // };
  const handleRemoveFromCart = (index) => {
    console.log("Removing item at index:", index);
    const newCartItems = cart.filter((_, i) => i !== index);
    setCart(newCartItems);
    onDeleteItem(index);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div className="container " style={{ marginTop: "180px" }}>
      <h2>Shopping Cart</h2>
      {cart.length == 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.dishName}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        console.log("Removing item at index:", index);
                        handleRemoveFromCart(index);
                      }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <h4>Total: ${totalPrice}</h4>
            <Button variant="primary">Proceed to Payment</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
