import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const DishDetail = () => {
  const { dishId } = useParams();
  const [dish, setDish] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dish details using dishId
    axios
      .get(`http://localhost:8081/api/menus/${dishId}`)
      .then((response) => {
        setDish(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dish details:", error);
      });
  }, [dishId]);

  if (!dish) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ marginTop: "180px" }}>
      <span
        variant="secondary"
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer", display: "flex" }}
      >
        {" "}
        <FontAwesomeIcon icon={faArrowLeft} />
      </span>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={dish.image} alt={dish.name} style={{ width: "60%" }} />
        <div style={{ display: "grid", justifyContent: "flex-start" }}>
          <h2>{dish.dishName}</h2>
          <p>Price: ${dish.price}</p>
        </div>
        <p>{dish.description}</p>
      </div>

      <div className="mt-3">
        <ul className="list-group mt-2">
          {dish.comments?.map((comment, index) => (
            <li className="list-group-item" key={index}>
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DishDetail;
