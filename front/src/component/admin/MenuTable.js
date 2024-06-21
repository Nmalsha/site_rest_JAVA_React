import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const MenuTable = ({ dishes, setDishes }) => {
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/menus");
        setDishes(response.data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, [setDishes]);

  const handleDelete = async (dishId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:8081/api/menus/${dishId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDishes(dishes.filter((dish) => dish.id !== dishId));
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  return (
    <div>
      <h2>Dish List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id}>
              <td>{dish.id}</td>
              <td>{dish.dishName}</td>
              <td>{dish.description}</td>
              <td>${dish.price}</td>
              <td>
                <img
                  src={dish.image}
                  alt={dish.dishName}
                  style={{ width: "100px" }}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(dish.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MenuTable;
