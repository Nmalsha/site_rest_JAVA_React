import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Diches = ({ handleAddToCart }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  // console.log("Selected dish added to cart:", cart);
  const [isauthenticate, setIsauthenticate] = useState(false);
  const [likes, setLikes] = useState(Array(4).fill(0));
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentDishIndex, setCurrentDishIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [dishes, setDishes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [commentCounts, setCommentCounts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  //getting all the menus from DB
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/menus");
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        const data = await response.json();
        setDishes(data);
        setLikes(data.map(() => 0));

        const token = localStorage.getItem("jwtToken");
        if (token) {
          const commentCounts = await Promise.all(
            data.map(async (dish) => {
              const commentResponse = await axios.get(
                `http://localhost:8081/api/comment/by-dish/${dish.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return { dishId: dish.id, count: commentResponse.data.length };
            })
          );
          setCommentCounts(commentCounts);
        }
        navigate("/diches");
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenus();
  }, [navigate]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);

    const loggedUserRoles = localStorage.getItem("roles");
    const rolesArray = loggedUserRoles ? loggedUserRoles.split(",") : [];

    if (rolesArray.includes("ROLE_ADMIN")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    // localStorage.setItem("cartItems", JSON.stringify(cart));
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(storedCartItems);
  }, [cart]);

  //add to cart
  // const addToCart = (dish) => {
  //   console.log("diche", dish);
  //   if (dish && dish.id) {
  //     const selectedDish = {
  //       id: dish.id,
  //       dishName: dish.dishName,
  //       price: dish.price,
  //       quantity: 1,
  //     };

  //     setCart((prevCart) => {
  //       const updatedCart = [...prevCart, selectedDish];
  //       handleAddToCart(selectedDish);
  //       return updatedCart;
  //     });
  //   } else {
  //     console.error("Menu object or its id property is undefined");
  //   }
  // };

  const addToCart = async (dish) => {
    console.log("Selected dish:", dish);
    if (dish && dish.id) {
      const selectedDish = {
        menuId: dish.id,
        dishName: dish.dishName,
        price: dish.price,
        quantity: 1,
        userId: localStorage.getItem("userId"),
      };

      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("jwtToken");
        if (!userId) {
          alert("You need to be logged in to add items to your cart.");
          return;
        }

        // Add the cart item to the backend
        const response = await axios.post(
          `http://localhost:8081/api/cart/add`,
          { ...selectedDish, user: { id: userId } },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("CartItem response:", response.data);
        // Update local cart state
        if (response.status === 201) {
          console.log("Item added to cart:", response.data);

          // Update local cart state
          setCart((prevCart) => [...prevCart, selectedDish]);
          localStorage.setItem(
            "cartItems",
            JSON.stringify([...cart, selectedDish])
          );
        }
        // setCart((prevCart) => [...prevCart, selectedDish]);
        // localStorage.setItem(
        //   "cartItems",
        //   JSON.stringify([...cart, selectedDish])
        // );

        // console.log("Selected dish added to cart:", selectedDish);
      } catch (error) {
        console.error("Error adding dish to cart:", error);
      }
    } else {
      console.error("Menu object or its id property is undefined");
    }
  };

  const handleLike = (dishIndex) => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[dishIndex]++;
      return newLikes;
    });
  };

  const handleAddComment = async () => {
    console.log("clicked dish index", dishes[currentDishIndex].id);
    console.log("connected user  id", localStorage.getItem("userId"));
    if (
      newComment.trim() === "" ||
      currentDishIndex === null ||
      currentDishIndex === undefined
    ) {
      return "no dish id ";
    }

    try {
      const userId = localStorage.getItem("userId");
      const dishId = dishes[currentDishIndex].id;

      const commentData = {
        content: newComment,
        user: {
          id: userId,
        },
        menu: {
          id: dishId,
        },
      };
      const token = localStorage.getItem("jwtToken");
      console.log("comments data :", JSON.stringify(commentData));
      const response = await fetch(
        `http://localhost:8081/api/comment/${dishes[currentDishIndex].id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // Update local state to include the new comment for the specific dish
      const newCommentData = await response.json();
      const updatedDishes = [...dishes];
      const dishIndex = updatedDishes.findIndex((dish) => dish.id === dishId);
      updatedDishes[dishIndex].comments.push(newCommentData);
      setDishes(updatedDishes);

      // Update comment count after adding comment
      const updatedCommentCounts = [...commentCounts];
      const countIndex = updatedCommentCounts.findIndex(
        (count) => count.dishId === dishId
      );
      if (countIndex !== -1) {
        updatedCommentCounts[countIndex].count++;
      } else {
        updatedCommentCounts.push({ dishId, count: 1 });
      }
      setCommentCounts(updatedCommentCounts);

      setNewComment("");
      setShowCommentModal(false);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const openCommentModal = (index) => {
    setCurrentDishIndex(index);
    setShowCommentModal(true);
  };

  // delete menu if - action allowed only for admin
  const deleteMenuItem = async (menuId) => {
    alert("I clicked in delete");
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.delete(
        `http://localhost:8081/api/menus/${menuId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        // Menu item deleted successfully, update state or fetch menus again
        const updatedDishes = dishes.filter((dish) => dish.id !== menuId);
        setDishes(updatedDishes);
        alert("Menu item deleted successfully!");
      } else {
        throw new Error("Failed to delete menu item");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Failed to delete menu item");
    }
  };

  useEffect(() => {
    const userLogged = localStorage.getItem("jwtToken");
    if (userLogged) {
      setIsauthenticate(true);
    }
  }, []);

  return (
    <section
      id="menu"
      className="menu-section bg-light py-5"
      // style={{ marginTop: "100px" }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5">Livraison ou click and collect </h2>
          <p className="lead">Delicious dishes to satisfy your cravings</p>
        </div>
        <div className="row">
          {dishes.map((dish, index) => (
            <div className="col-md-4 mb-4" key={index}>
              {isAdmin && (
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    color: "637591",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                  onClick={() => deleteMenuItem(dish.id)}
                />
              )}
              <div
                className="card menu-card box-hover rounded-5"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={dish.image}
                  className="card-img-top"
                  alt={`Dish ${index + 1}`}
                  onClick={() => navigate(`/dish/${dish.id}`)}
                />
                <div className="card-body">
                  <h5 className="card-title">{dish.dishName}</h5>
                  <p className="card-text">{dish.description}</p>
                  <p className="card-text">
                    <strong>${dish.price}</strong>
                  </p>
                  {isauthenticate && (
                    <button
                      className="btn btn-secondary btn_houver"
                      onClick={() => addToCart(dish)}
                      style={{
                        fontSize: "20px",
                        background: "#5c460b",
                        borderRadius: "20px",
                      }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div>
                    <span
                      role="img"
                      aria-label="thumbs up"
                      onClick={() => handleLike(index)}
                      style={{ cursor: "pointer", marginRight: "8px" }}
                    >
                      👍
                    </span>
                    {likes[index]}
                  </div>
                  <div>
                    {isLoggedIn && (
                      <FontAwesomeIcon
                        icon={faComment}
                        style={{ color: "#637591", cursor: "pointer" }}
                        onClick={() => openCommentModal(index)}
                      />
                    )}
                    {/* Display comment count badge */}
                    {commentCounts[index]?.count > 0 && (
                      <span
                        className="badge bg-light ms-2"
                        style={{ color: "red" }}
                      >
                        {commentCounts[index].count}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <ul className="list-group mt-2">
                    {dish.comments?.map((comment, commentIndex) => (
                      <li className="list-group-item" key={commentIndex}>
                        {comment.content}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Modal */}
      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCommentModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddComment()}>
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Diches;
