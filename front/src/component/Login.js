import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/user/login",
        {
          email,
          password,
        }
      );
      onLogin(response.data.token);
      const catchedToken = response.data.token;
      const decodedToken = jwtDecode(catchedToken);
      localStorage.setItem("jwtToken", catchedToken);
      localStorage.setItem("userId", decodedToken.id); // Store user ID
      localStorage.setItem("nickname", decodedToken.nickname);
      localStorage.setItem("roles", decodedToken.roles.join(","));

      handleClose();
      navigate("/diches");
    } catch (error) {
      console.error(
        "EInvalid email or password. Please try again.rror during login:",
        error
      );
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={handleShow}
        style={{ fontSize: "24px" }}
      >
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="secondary" type="submit" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
