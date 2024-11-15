import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const Cart = ({ cart, setCart, setCartItemsCount }) => {
  // const [cart, setCart] = useState(() => {

  //   const savedCart = localStorage.getItem("cartItems");
  //   return savedCart ? JSON.parse(savedCart) : [];
  // });
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(localCart));
    // setCartItemsCount(localCart.length);
  }, [localCart, setCartItemsCount]);

  // const [dishes, setDishes] = useState([]);
  // const [cartCount, setCartCount] = useState(dishes.length);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/api/cart/user/${userId}`
        );
        const data = await response.json();
        setLocalCart(data);
        setCart(data);
        if (data !== null) {
          localStorage.setItem("cartItems", JSON.stringify(data));
        } else {
          throw new Error("The cart is empty");
        }

        console.log("cart items:", data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCart();
  }, [userId]);

  // useEffect(() => {
  //   const savedCart = localStorage.getItem("cartItems");
  //   if (savedCart) {
  //     setCart(JSON.parse(savedCart));
  //   }
  // }, []);

  const handleRemoveFromCart = async (id) => {
    console.error("item idex:", id);
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.delete(
        `http://localhost:8081/api/cart/item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCart = localCart.filter((item) => item.id !== id);
      setLocalCart(updatedCart);
      setCart(updatedCart);
      alert("Menu item deleted successfully!");
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Failed to delete menu item");
    }
    // console.log("Removing item at index:", index);
    // const newCartItems = cart.filter((_, i) => i !== index);
    // setCart(newCartItems);
    // onDeleteItem(index);
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
                        handleRemoveFromCart(item.id);
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
