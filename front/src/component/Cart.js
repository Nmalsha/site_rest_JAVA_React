import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const Cart = ({ onDeleteItem }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/cart/user/${userId}`
        );
        const data = await response.json();
        localStorage.setItem("cartItems", JSON.stringify(data));
        console.log("cart items:", data);
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        // localStorage.setItem("cartItems", JSON.stringify(cart));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCart();
  }, [cart]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleRemoveFromCart = (index) => {
    console.log("Removing item at index:", index);
    const newCartItems = cart.filter((_, i) => i !== index);
    setCart(newCartItems);
    onDeleteItem(index);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <div
      className="container d-flex justify-content-center align-items-center  "
      style={{
        height: "85vh",
        flexDirection: "column",
      }}
    >
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
