import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Diches = ({ handleAddToCart }) => {
  const [cart, setCart] = useState([]);
  const [comments, setComments] = useState(Array(4).fill([]));
  const [likes, setLikes] = useState(Array(4).fill(0));
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentDishIndex, setCurrentDishIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [dishes, setDishes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [commentCounts, setCommentCounts] = useState([]);

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
        // Initialize comments and likes state based on the fetched menu data
        setLikes(data.map(() => 0)); // Initialize likes
        // fetchCommentsForDishes(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenus();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // Set isLoggedIn to true if userId exists
  }, []);

  console.log(dishes);
  //add to cart
  const addToCart = (dish) => {
    console.log("diche", dish);
    if (dish && dish.id) {
      const selectedDish = {
        id: dish.id,
        dishName: dish.dishName,
        price: dish.price,
        // Add other properties as needed
      };

      setCart([...cart, selectedDish]);
      handleAddToCart(selectedDish);
      console.log("Selected dish added to cart:", selectedDish);
    } else {
      console.error("Menu object or its id property is undefined");
    }
  };

  let userId = localStorage.getItem("userId");
  console.log(userId);

  const handleLike = (dishIndex) => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[dishIndex]++;
      return newLikes;
    });
  };

  const handleAddComment = async () => {
    // if (newComment.trim() === "" || currentDishIndex === null) return;
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

      // const newCommentObject = {
      //   content: newComment,
      //   user: {
      //     id: userId,
      //   },
      // };
      // setComments((prevComments) => {
      //   const newComments = [...prevComments];
      //   newComments[currentDishIndex] = [
      //     ...(newComments[currentDishIndex] || []),
      //     newCommentObject,
      //   ];
      //   return newComments;
      // });
      const newCommentData = await response.json();

      // Update local state to include the new comment for the specific dish
      setComments((prevComments) => {
        const newComments = [...prevComments];
        const dishIndex = dishes.findIndex((dish) => dish.id === dishId);
        newComments[dishIndex] = [...newComments[dishIndex], newCommentData];
        return newComments;
      });

      setNewComment("");
      setShowCommentModal(false);
      // window.location.reload();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const openCommentModal = (index) => {
    setCurrentDishIndex(index);
    setShowCommentModal(true);
  };

  // const dishes = [dish1, dish2, dish3, dish4];

  return (
    <section id="menu" className="menu-section bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5">Our Menu</h2>
          <p className="lead">Delicious dishes to satisfy your cravings</p>
        </div>
        <div className="row">
          {dishes.map((dish, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card">
                <img
                  src={dish.image}
                  className="card-img-top"
                  alt={`Dish ${index + 1}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{dish.dishName}</h5>
                  <p className="card-text">{dish.description}</p>
                  <p className="card-text">
                    <strong>${dish.price}</strong>
                  </p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => addToCart(dish)}
                  >
                    Add to Cart
                  </button>
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
                  {isLoggedIn && (
                    <FontAwesomeIcon
                      icon={faComment}
                      style={{ color: "#637591", cursor: "pointer" }}
                      onClick={() => openCommentModal(index)}
                    />
                  )}
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
