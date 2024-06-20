import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const AddDish = ({ onDishAdded }) => {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    const token = localStorage.getItem("jwtToken");

    try {
      const formData = new FormData();
      formData.append("dishName", dishName);
      formData.append("description", description);
      formData.append("price", price);
      if (image) formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8081/api/menus",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setDishName("");
        setDescription("");
        setPrice("");
        setImage(null);
        onDishAdded(response.data);
      } else {
        setError("Failed to add dish");
      }
    } catch (err) {
      setError("An error occurred while adding the dish");
    }
  };

  return (
    <div className="container my-5">
      <h2>Add New Dish</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Dish added successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDishName" className="mb-3">
          <Form.Label>Dish Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter dish name"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Dish
        </Button>
      </Form>
    </div>
  );
};

export default AddDish;
