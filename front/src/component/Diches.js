import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import dish1 from "../image/image1.jpg";
import dish2 from "../image/image2.jpg";
import dish3 from "../image/image3.jpg";
import dish4 from "../image/image4.jpg";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Diches = ({ handleAddToCart }) => {
  const [cart, setCart] = useState([]);
  const [comments, setComments] = useState(Array(4).fill([]));
  const [likes, setLikes] = useState(Array(4).fill(0));
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentDishIndex, setCurrentDishIndex] = useState(null);
  const [newComment, setNewComment] = useState("");

  const addToCart = (dishIndex) => {
    const selectedDish = {
      id: dishIndex,
      dishName: `Dish Name ${dishIndex + 1}`,
      price: (dishIndex + 1) * 10.99,
    };

    setCart([...cart, selectedDish]);
    handleAddToCart(selectedDish);
    console.log("check addcart click", selectedDish);
  };

  // const handleLike = (dishIndex) => {
  //   setLikes((prevLikes) => {
  //     const newLikes = [...prevLikes];
  //     newLikes[dishIndex]++;
  //     return newLikes;
  //   });
  // };

  // const addComment = (dishIndex, comment) => {
  //   setComments((prevComments) => {
  //     const newComments = [...prevComments];
  //     newComments[dishIndex] = [...newComments[dishIndex], comment];
  //     return newComments;
  //   });
  // };
  const handleLike = (dishIndex) => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[dishIndex]++;
      return newLikes;
    });
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const commentData = {
      dishId: currentDishIndex,
      comment: newComment,
    };

    try {
      const response = await fetch(`/api/comment/${currentDishIndex}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // If the comment is successfully posted, update the local state
      setComments((prevComments) => {
        const newComments = [...prevComments];
        newComments[currentDishIndex] = [
          ...newComments[currentDishIndex],
          newComment,
        ];
        return newComments;
      });

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

  const dishes = [dish1, dish2, dish3, dish4];

  return (
    // <section id="menu" className="menu-section bg-light py-5">
    //   <div className="container">
    //     <div className="text-center mb-5">
    //       <h2 className="display-5">Our Menu</h2>
    //       <p className="lead">Delicious dishes to satisfy your cravings</p>
    //     </div>
    //     <div className="row">
    //       {dishes.map((dish, index) => (
    //         //   console.log(index),
    //         <div className="col-md-4 mb-4" key={index}>
    //           <div className="card">
    //             <img
    //               src={dish}
    //               className="card-img-top"
    //               alt={`Dish ${index + 1}`}
    //             />
    //             <div className="card-body">
    //               <h5 className="card-title">Dish Name {index + 1}</h5>
    //               <p className="card-text">
    //                 Description of the dish. Ingredients and flavors.
    //               </p>
    //               <p className="card-text">
    //                 <strong>${10.99}</strong>
    //               </p>

    //               <button
    //                 className="btn btn-secondary"
    //                 onClick={() => addToCart(index)}
    //               >
    //                 Add to Cart
    //               </button>
    //             </div>
    //             <div className="card-footer text-end">
    //               <FontAwesomeIcon
    //                 icon={faComment}
    //                 style={{ color: "#637591" }}
    //                 onClick={() => addComment(index)}
    //               />
    //               {/* Comment section */}
    //               <div className="mt-3">
    //                 <ul className="list-group mt-2">
    //                   {comments[index].map((comment, commentIndex) => (
    //                     <li className="list-group-item" key={commentIndex}>
    //                       {comment}
    //                     </li>
    //                   ))}
    //                 </ul>
    //               </div>
    //               {/* Like button */}
    //               <div>
    //                 <span
    //                   role="img"
    //                   aria-label="thumbs up"
    //                   onClick={() => handleLike(index)}
    //                 >
    //                   👍
    //                 </span>
    //                 {likes[index]}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
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
                  src={dish}
                  className="card-img-top"
                  alt={`Dish ${index + 1}`}
                />
                <div className="card-body">
                  <h5 className="card-title">Dish Name {index + 1}</h5>
                  <p className="card-text">
                    Description of the dish. Ingredients and flavors.
                  </p>
                  <p className="card-text">
                    <strong>${10.99}</strong>
                  </p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => addToCart(index)}
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
                  <FontAwesomeIcon
                    icon={faComment}
                    style={{ color: "#637591", cursor: "pointer" }}
                    onClick={() => openCommentModal(index)}
                  />
                </div>
                <div className="mt-3">
                  <ul className="list-group mt-2">
                    {comments[index].map((comment, commentIndex) => (
                      <li className="list-group-item" key={commentIndex}>
                        {comment}
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
