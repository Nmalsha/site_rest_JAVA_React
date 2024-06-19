import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [connectedUserId, setConnectedUserId] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      // localStorage.setItem("User-Signup-Data", response.data.nickname);
      localStorage.setItem("jwtToken", response.data.token);
      localStorage.setItem("userId", response.data.id); // Store user ID
      localStorage.setItem("nickname", response.data.nickname);
      setNickname(response.data.nickname);
      setConnectedUserId(response.data.id);
      onLogin(response.data.nickname);
      // console.log("User logged in", response.data);
      // console.log("User nickname", response.data.nickname);
      // console.log("Connected user Id ", response.data.id);

      handleClose();
    } catch (error) {
      console.error(
        "EInvalid email or password. Please try again.rror during login:",
        error
      );
    }
  };
  useEffect(() => {
    console.log("User nickname", nickname);
    console.log("Connected user Id ", connectedUserId);
  }, []);

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
