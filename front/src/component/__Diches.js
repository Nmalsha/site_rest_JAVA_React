import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenus, deleteMenu } from "../redux/slices/menuSlice";
import {
  fetchCommentsByDishId,
  postComment,
} from "../redux/slices/commentSlice";

const Diches = ({ handleAddToCart }) => {
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.menus.items);
  const commentCounts = useSelector((state) => {
    const counts = {};
    for (let dishId in state.comments.commentsByDish) {
      counts[dishId] = state.comments.commentsByDish[dishId].length;
    }
    return counts;
  });

  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentDishIndex, setCurrentDishIndex] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  // Fetch menus from the server
  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  // Check login status and roles
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);

    const loggedUserRoles = localStorage.getItem("roles");
    const rolesArray = loggedUserRoles ? loggedUserRoles.split(",") : [];

    setIsAdmin(rolesArray.includes("ROLE_ADMIN"));
  }, []);

  // Initialize likes array based on fetched dishes
  useEffect(() => {
    setLikes(dishes.map(() => 0));
  }, [dishes]);

  // Add to cart function
  const addToCart = (dish) => {
    if (dish && dish.id) {
      const selectedDish = {
        id: dish.id,
        dishName: dish.dishName,
        price: dish.price,
      };
      setCart([...cart, selectedDish]);
      handleAddToCart(selectedDish);
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
    if (!newComment.trim() || currentDishIndex === null) return;

    const dishId = dishes[currentDishIndex].id;
    const userId = localStorage.getItem("userId");
    const commentData = {
      content: newComment,
      user: { id: userId },
      menu: { id: dishId },
    };

    await dispatch(postComment({ dishId, commentData }));
    setNewComment("");
    setShowCommentModal(false);
  };

  const openCommentModal = (index) => {
    setCurrentDishIndex(index);
    const dishId = dishes[index].id;
    dispatch(fetchCommentsByDishId(dishId));
    setShowCommentModal(true);
  };

  const deleteMenuItem = async (menuId) => {
    await dispatch(deleteMenu(menuId));
    alert("Menu item deleted successfully!");
  };
  console.log("comments to display", commentCounts);
  return (
    <section
      id="menu"
      className="menu-section bg-light py-5"
      style={{ marginTop: "100px" }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5">Our Menu</h2>
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
                  <div>
                    {isLoggedIn && (
                      <FontAwesomeIcon
                        icon={faComment}
                        style={{ color: "#637591", cursor: "pointer" }}
                        onClick={() => openCommentModal(index)}
                      />
                    )}
                    {/* Display comment count badge */}
                    {commentCounts[dish.id] > 0 && (
                      <span
                        className="badge bg-light ms-2"
                        style={{ color: "red" }}
                      >
                        {commentCounts[dish.id]}
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
          <Button variant="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default Diches;
